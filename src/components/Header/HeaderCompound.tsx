"use client";
import React, { FC, ReactNode, useEffect } from "react";
import Link from "next/link";
import "./HeaderStyles.css";
import Image from "next/image";
import { GOERLI_CHAIN_ID, ethereum, web3 } from "@/lib/web3.config";
import { useContext } from "react";
import { AppContext } from "@/app/layout";
import useSWR from "swr";
import { useTicketProjectList } from "@/context/contractContext";
import { OneProject } from "@/domain/OneProject";
import {
  getMyProjects,
  getMyTickets,
  getTicketContractUri,
  getWholeTicketContractList,
  getWholeTicketList,
  getWholeTicketNum,
  onClickLogin,
} from "@/utils/web3/web3_v2";
interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const HeaderCustom: FC<HeaderProps> = () => {
  const { account, setAccount } = useContext(AppContext);

  const clickWalletLogin = async () => {
    const walletAddr = await onClickLogin();

    if (walletAddr !== null) {
      setAccount(walletAddr);
    }
  };

  const { updateProjects, updateTickets, getProject, projects } =
    useTicketProjectList();

  const testFunc1 = async () => {
    const res = await getMyProjects(account);
    console.log("getMyProjects");
    console.log(res);
  };

  const testFunc2 = async () => {
    const res = await getTicketContractUri(
      "0xa77fe9Ce610137Ad382299eEb0528BAb55430128"
    );
    console.log("getTicketContractUri");
    console.log(res);
  };
  const testFunc3 = async () => {
    const res = await getMyTickets(
      "0xa77fe9Ce610137Ad382299eEb0528BAb55430128",
      account
    );
    console.log("getMyTickets");
    console.log(res);
  };
  const testFunc4 = async () => {
    const res = await getWholeTicketList(
      "0xa77fe9Ce610137Ad382299eEb0528BAb55430128"
    );
    console.log("getWholeTicketList");
    console.log(res);
  };
  const testFunc5 = async () => {
    const res = await getWholeTicketNum(
      "0xa77fe9Ce610137Ad382299eEb0528BAb55430128"
    );
    console.log("getWholeTicketNum");
    console.log(res);
  };
  useEffect(() => {
    const temp: OneProject | null = getProject("1234");
    console.log(temp);
  }, [projects]);

  return (
    <div className="header_inner  ">
      <header className="header-wrapper-home inner">
        <nav className="navbar-home">
          <Link href="/">
            <Image
              className="logo"
              src={`/images/logo.png`}
              width={100}
              height={50}
              alt=""
            />
          </Link>

          <Link href="/project">
            <div className="header-menu-item">프로젝트</div>
          </Link>
          <Link href="/profile">
            <div className="header-menu-item">프로필</div>
          </Link>
        </nav>
        {account ? (
          <div className="connect-wallet-button">
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
          </div>
        ) : (
          <button className="connect-wallet-button" onClick={clickWalletLogin}>
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  );
};

export default HeaderCustom;
