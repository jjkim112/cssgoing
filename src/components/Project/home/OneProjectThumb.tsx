import React from "react";
import "./ProjectThumbStyles.css";
import Link from "next/link";
import { TicketType } from "../main/OneProjectPart";

interface OneProjectThumbProps {
  id: number;
  contract: string;
  title: string;
  imgUrl: string;
  tickets: TicketType[];
}

function OneProjectThumb({
  id,
  contract,
  title,
  imgUrl,
  tickets,
}: OneProjectThumbProps) {
  return (
    <Link href={`/project/${id}`} className="thumb-card hover:cursor-pointer">
      <img className="thumb-card-img" src={imgUrl} alt="" />
      <div className="thumb-card-title">{title}</div>
      <div className="text-black">티켓 수 : {tickets.length}</div>
    </Link>
  );
}

export default OneProjectThumb;
