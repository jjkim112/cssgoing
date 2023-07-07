import React from "react";
import "./ProjectThumbStyles.css";
import Link from "next/link";
import { TicketType } from "../main/OneProjectPart";
import { OneProject } from "@/domain/OneProject";

interface OneProjectThumbProps {
  value: OneProject;
}

function OneProjectThumb({ value }: OneProjectThumbProps) {
  return (
    <Link
      href={`/project/${value.contract}`}
      className="thumb-card hover:cursor-pointer"
    >
      <img className="thumb-card-img" src={value.imgUrl} alt="" />
      <div className="thumb-card-title">{value.title}</div>
      <div className="text-black">티켓 수 : {value.tickets.length}</div>
    </Link>
  );
}

export default OneProjectThumb;
