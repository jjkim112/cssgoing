"use client";
import { useContext } from "react";
import { AppContext } from "@/app/layout";
import {
  GOERLI_CHAIN_ID,
  QUEST_NFT_ADDRESS,
  ethereum,
  questContract,
  web3,
  TICKET_NFT_ADDRESS,
  ticketContract,
} from "@/lib/web3.config";

interface QuestContractProps {
  tokenId: number[];
  price: number[];
  minCount: number[];
  ticketNum: number;
  uri: string;
  name: string;
  symbol: string;
}

export const onClickLogin = async () => {
  try {
    const accounts = await ethereum?.request({
      method: "eth_requestAccounts",
    });

    if (parseInt(ethereum?.networkVersion) !== GOERLI_CHAIN_ID) {
      await ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(GOERLI_CHAIN_ID) }],
      });
    }

    return accounts[0];
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const attendance = async (t_addr: string, account: string) => {
  try {
    const response = await questContract.methods.attendance(t_addr).send({
      from: account,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const attendancePointCheck = async (t_addr: string, account: string) => {
  try {
    const response = await questContract.methods
      .attendancePointCheck(t_addr)
      .call({
        from: account,
      });
    return Number(response);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMyLastTimeOfAttendance = async (
  t_addr: string,
  account: string
) => {
  try {
    const response = await questContract.methods.lastCheckedTime(t_addr).call({
      from: account,
    });
    return Number(response);
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getWholeTicketContractList = async () => {
  try {
    const response = await questContract.methods
      .getWholeTicketContractsList()
      .call();
    return Array(response).map((v) => String(v));
    // console.log(ticketContractList);
    // console.log(ticketContractList[0]);
    //티컨만들어진 리스트중에 제일 첫번째꺼로 실험하기위해 유즈스테이트에 이렇게 등록해놧당
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const ticketBuying = async (
  tokenId: number,
  price: number,
  t_addr: string,
  account: string
) => {
  try {
    const response = await questContract.methods
      .ticketTransfer(t_addr, tokenId)
      .send({
        from: account,
        value: web3.utils.toWei(price, "wei"),
        //여기 10에 들어간 자리는 아래 내가 수동으로 프라이스 리스트 넣을때 1번토큰을 10wei로 했기때문이다
      });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const makeTicketContract = async (
  tokenIds: number[],
  prices: number[],
  minCounts: number[],
  ticketNum: number,
  uri: string,
  name: string,
  symbol: string,
  account: string
) => {
  try {
    const response = await questContract.methods
      .makeTicketContract(
        tokenIds,
        prices,
        minCounts,
        ticketNum,
        uri,
        name,
        symbol
      )
      .send({
        from: account,
      });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
