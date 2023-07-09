import React from "react";
import "./ProjectThumbStyles.css";
import Link from "next/link";
import { OneTicket } from "@/domain/OneTicket";

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
  return (
    <Link
      href={`/project/${contract}`}
      className="thumb-card hover:cursor-pointer"
    >
      <img className="thumb-card-img" src={imgUrl} alt="" />
      <div className=" p-3">
        <div className="thumb-card-title pb-2  ">{title}</div>
        <div className="thumb-card-description">{description}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-black text-2xl font-medium p-4">
          총 티켓 : {tickets.length}
        </div>
        <div className="text-black text-2xl font-medium p-4">
          남은 티켓 : {tickets.length}
        </div>
      </div>
    </Link>
  );
}

export default OneProjectThumb;
