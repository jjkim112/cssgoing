import React from 'react';
import './ProjectThumbStyles.css';
import Link from 'next/link';

interface OneProjectThumbProps {
  id: number;
  contract: string;
  title: string;
  imgUrl: string;
  qeustsNum: number;
}

function OneProjectThumb({
  id,
  contract,
  title,
  imgUrl,
  qeustsNum,
}: OneProjectThumbProps) {
  return (
    <Link href={`/project/${id}`} className="thumb-card hover:cursor-pointer">
      <img className="thumb-card-img" src={imgUrl} alt="" />
      <div className="thumb-card-title">{title}</div>
      <div className="thumb-card-quest">퀘스트 수 : {qeustsNum}</div>
    </Link>
  );
}

export default OneProjectThumb;
