import { Web3 } from 'web3';
import abi from './abi.json';

export default async function connect(setAccount) {
  if (window.ethereum) {
    try {
      const res = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(res[0]);
      setAccount(res[0]);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('Install metamask');
  }
}

const web3_2 = new Web3(
  'https://goerli.infura.io/v3/88cd1369d4b0478b9b44c031a628b0bf'
);
// TODO abi code need
var account = '0x0b3e68b53445656a8f4cd3938D9E05Fc7c3e6545';
var c_addr = '0x89440842f7d0e3db9BCF7b874E5a5e93821f5863'; // 관리 컨트랙트 주소
var contract = new web3_2.eth.Contract(abi, c_addr); // 관리 컨트랙트
var projectContract = '0xD6A4132C783cc331a567062B5E257CF896bA1c67'; // 테스트용으로 하드코딩

export async function questAction(projectAddress, questNum) {
  await window.ethereum.request({
    method: 'eth_sendTransaction', // 메마 메소드
    params: [
      {
        from: account,
        to: c_addr,
        data: contract.methods.attendance(projectContract).encodeABI(),
      },
    ],
  });
  console.log('Attendance complete');
}
export async function getAttendancePoint() {
  if (account) {
    try {
      let a = await contract.methods
        .attendanceCheck(projectContract, account)
        .call();
      console.log('AttendancePoint : ', a);
      return Number(a);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('connect the wallet');
  }
  return null;
}
async function getTotalSupply() {
  if (account) {
    try {
      var a = await contract.methods.totalSupply().call();
      console.log('TotalSupply : ', a);
      return Number(a);
    } catch (err) {
      console.error(err);
    }
  }
  return 0;
}
export async function mintProject(projectAddress) {
  var totalSupply = await getTotalSupply();
  var a = web3_2.utils.numberToHex(totalSupply - 1); // 임시: totalSupply를 통해서 현재 민팅 된 총 갯수를 구하고 그 다음 번호가 민팅 되도록 설정
  var attendancePoint = await getAttendancePoint();
  // 현재 이 지갑이 들고 있는 출석포인트 읽어서 할인
  // 할인은 컨트랙트에서 일어나는게 안전해 보임.
  var b = web3_2.utils.numberToHex(100 - 10 * attendancePoint); // 리믹스에서 require로 설정한 1개당 가격

  await window.ethereum.request({
    method: 'eth_sendTransaction', // 메마 메소드
    params: [
      {
        from: account,
        to: c_addr,
        value: b,
        data: contract.methods.transfer(projectContract, a).encodeABI(),
      },
    ],
  });
}
