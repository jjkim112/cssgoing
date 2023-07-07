import axios from "axios";
import { OneTicket } from "./OneTicket";

export type OneProject = {
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  date: string;
  location: string;
  runningTime: string;
  tickets: OneTicket[];
};

/*
 * input data 형태 : 티켓 address 들 목록.
 * => 1번 토큰의 정보를 들고와서 데이터 변환
 */
export async function getProjectsFromTicketAddresses(
  data: any[]
): Promise<OneProject[]> {
  let tempList: OneProject[] = [];

  const getVFromAttr: (keyValue: string, attributes: any[]) => string = (
    keyValue,
    attributes
  ) => {
    return (
      attributes.find((v: any) => {
        return v.trait_type === keyValue;
      })?.value ?? ""
    );
  };

  for (let index = 0; index < data.length; index++) {
    const ticketContractAddress = data[index];
    // TODO web3 function get TokenURL from Ticket Address
    const tokenUrl =
      "https://gold-alleged-yak-272.mypinata.cloud/ipfs/Qmem34fLt8v3poDJDqQ4Qu3mjroPa2Hmr9xwhVidgWRtYn/1.json";
    const jsonData = await axios.get(tokenUrl);
    tempList.push({
      contract: ticketContractAddress,
      title: jsonData.data.name ?? "",
      description: jsonData.data.description ?? "",
      imgUrl:
        jsonData.data.image ??
        "https://cdn-icons-png.flaticon.com/512/7693/7693271.png",
      date: getVFromAttr("Date", jsonData.data.attributes ?? []),
      location: getVFromAttr("Location", jsonData.data.attributes ?? []),
      runningTime: getVFromAttr("RunningTime", jsonData.data.attributes ?? []),
      tickets: [],
    });
  }
  console.log(tempList);
  return tempList;
}
