'use client';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import './HeaderStyles.css';
import Image from 'next/image';
import { GOERLI_CHAIN_ID, ethereum, web3 } from '@/lib/web3.config';
import { useContext } from 'react';
import { AppContext } from '@/app/layout';
import useSWR from 'swr';
interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const HeaderCustom: FC<HeaderProps> = () => {
  const { account, setAccount } = useContext(AppContext);
  const onClickLogIn = async () => {
    try {
      const accounts = await ethereum?.request({
        method: 'eth_requestAccounts',
      });

      if (parseInt(ethereum?.networkVersion) !== GOERLI_CHAIN_ID) {
        await ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(GOERLI_CHAIN_ID) }],
        });
        setAccount(accounts[0]);
      } else {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          <button className="connect-wallet-button" onClick={onClickLogIn}>
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  );
};

export default HeaderCustom;
