'use client';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import './HeaderStyles.css';
import Image from 'next/image';
import { ethereum } from '@/lib/web3.config';
import { useContext } from 'react';
import { AppContext } from '@/app/layout';
import useSWR from 'swr';
interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const HeaderCompound: FC<HeaderProps> = () => {
  const { account, setAccount } = useContext(AppContext);
  const onClickLogIn = async () => {
    try {
      const accounts = await ethereum?.request({
        method: 'eth_requestAccounts',
        params: [],
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header_inner">
      <header className="header-wrapper-home">
        <nav className="navbar-home">
          <Link href="/">
            <Image
              className="logo"
              src={`/images/misc/logo.png`}
              width={100}
              height={50}
              alt=""
            />
          </Link>

          <Link href="/project">
            <div className="header-menu-item">Project </div>
          </Link>
          <Link href="/profile">
            <div className="header-menu-item">Profile </div>
          </Link>
        </nav>
        {account ? (
          <div className="connect-wallet-button">
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
          </div>
        ) : (
          <button className="connect-wallet-button" onClick={onClickLogIn}>
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  );
};

export default HeaderCompound;
