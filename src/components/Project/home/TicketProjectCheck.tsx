import React from 'react';
import './ProjectThumbStyles.css';
import Link from 'next/link';
import { TicketType } from '../main/OneProjectPart';

interface OneProjectThumbProps {
  id: number;
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  tickets: TicketType[];
}
function TicketProjectCheck({
  id,
  contract,
  description,
  title,
  imgUrl,
  tickets,
}: OneProjectThumbProps) {
  return (
    <Link
      href={`/profile/ticket-check?id=${id}&contract=${contract}`}
      className="thumb-card hover:cursor-pointer"
    >
      <div className="card-front">
        <img className="thumb-card-img" src={imgUrl} alt="" />
        <div className=" p-3">
          <div className="thumb-card-title pb-2  ">{title}</div>
          <div className="thumb-card-description">{description}</div>
        </div>
      </div>

      <div className="card-back">
        {tickets[0].ticket_is_used ? (
          <p className="use">사용 가능</p>
        ) : (
          <p className="unUse">사용 불가</p>
        )}
      </div>
    </Link>
  );
}

export default TicketProjectCheck;
