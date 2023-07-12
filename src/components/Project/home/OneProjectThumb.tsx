"use client";
import React, { useState, useEffect } from "react";
import "./ProjectThumbStyles.css";
import Link from "next/link";
import { OneTicket } from "@/domain/OneTicket";
import { getWholeTicketNum } from "@/utils/web3/web3_v2";

interface OneProjectThumbProps {
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  tickets: OneTicket[];
}

function OneProjectThumb({
  contract,
  description,
  title,
  imgUrl,
  tickets,
}: OneProjectThumbProps) {
  const [remainTicketNum, setRemainTicketNum] = useState<number>(0);
  const [totalTicketNum, setTotalTicketNum] = useState<number>(0);

  const initFunc = async () => {
    const { whole, remain } = await getWholeTicketNum(contract);
    setRemainTicketNum(remain ?? 0);
    setTotalTicketNum(whole ?? 0);
  };
  useEffect(() => {
    initFunc();
  }, []);
  return (
    <Link
      href={`/project/${contract}`}
      className="thumb-card hover:cursor-pointer"
    >
      <div className="extraExternalCard">
        <div className="externalCard">
          <div className="image-cover">
            <img className="thumb-card-img" src={imgUrl} alt="" />
          </div>
          <div className=" p-3">
            <div className="thumb-card-title pb-2 ">{title}</div>
            <div className="thumb-card-description">{description}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-2xl font-medium p-4">
              총 티켓 : {totalTicketNum}
            </div>
            <div className="text-white text-2xl font-medium p-4">
              남은 티켓 : {remainTicketNum}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OneProjectThumb;
