"use client";
import React, { useState, useEffect, useContext } from "react";
import "./ProjectThumbStyles.css";
import Link from "next/link";
import { transactionTracking } from "@/utils/web3/web3_v2";
import { AppContext } from "@/app/layout";

interface OneProjectThumbProps {
  id: number;
  contract: string;
  imgUrl: string;
  isUsed: boolean;
}
function TicketProjectCheck({
  id,
  contract,
  imgUrl,
  isUsed,
}: OneProjectThumbProps) {
  const [validUse, setValidUse] = useState<boolean>(false);
  const { account } = useContext(AppContext);
  const checkValidTicket = async () => {
    const response: boolean = await transactionTracking(id, contract, account);
    setValidUse(response);
  };

  useEffect(() => {
    checkValidTicket();
  }, []);

  return (
    <Link
      href={`/profile/ticket-check?id=${id}${
        isUsed ? "_use" : ""
      }&contract=${contract}`}
      className="thumb-card hover:cursor-pointer"
    >
      <div className="card-front">
        <img className="thumb-card-img" src={imgUrl} alt="" />
        <div className=" p-3">
          <div className="thumb-card-title pb-2  ">{id}</div>
          <div className="thumb-card-description">{contract}</div>
        </div>
      </div>

      <div className="card-back">
        {validUse && !isUsed ? (
          <p className="use">사용 가능</p>
        ) : (
          <p className="unUse">사용 불가</p>
        )}
      </div>
    </Link>
  );
}

export default TicketProjectCheck;
