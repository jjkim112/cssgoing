'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import './ProjectStyles.css';
import OneQuestPart, { Quest } from './OneQuestPart';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import OneTicketThumb from './OneTicketThumb';

// export interface ProjectData {
//   id: number;
//   contract: string;
//   title: string;
//   description: string;
//   imgUrl: string;
//   quests: Quest[];
// }
export interface ProjectData {
  id: number;
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  tickets: TicketType[];
}

export type TicketType = {
  id: number; // tokenId
  seat: string;
  price: string;
  minimum_attendance: number;
  ticket_is_used: boolean;
};

interface OneProjectPartProps {
  projectData: ProjectData | null;
}

function OneProjectPart({ projectData, ...restProps }: OneProjectPartProps) {
  const [lastCheckTime, setLastCheckTime] = useState<number>(0);
  const [nowTime, setNowTime] = useState<number>(Date.now());
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const [count, setCount] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setInterval(() => {
      setNowTime(Date.now());
    }, 100);
  }, []);

  if (projectData) {
    return (
      <div className="w-full flex justify-center">
        <div className="inner">
          <div className="project-title">{projectData.title}</div>
          <div className="project-description">{projectData.description}</div>
          <img className="project-img" src={projectData.imgUrl} alt="" />
          <div className="text-center">티켓 목록</div>
          <div className="mx-auto flex flex-wrap w-1/2">
            {projectData &&
              projectData.tickets.map((v, i) => {
                return <OneTicketThumb value={v} />;
              })}
          </div>
          {/*체인저 버전 */}
          {/* <div className="flex flex-wrap justify-center my-3 w-[80%] mx-auto text-[]">
           
            {count.map((v, i) => {
              return (
                <div className="border-[1px] mx-2 my-1 border-black w-10 text-center px-4 py-2">
                  {v}
                </div>
              );
            })}
          </div> */}
          {/* <div className="project-quest">
            {projectData.quests.map((v, i) => {
              return <OneQuestPart quest={v} key={i} />;
            })}
          </div> */}
          {/* <div
            className="mx-auto hover:cursor-pointer border-[1px] border-black rounded-3xl w-40 py-2 text-center"
            onClick={() => {
              if (nowTime > lastCheckTime + 10000) {
                setCount((prev) => [0, ...prev]);
                setLastCheckTime(Date.now());
              }
            }}
          >
            {nowTime > lastCheckTime + 10000
              ? '출석하기'
              : `남은 시간 : ${(
                  (lastCheckTime + 10000 - nowTime) /
                  1000
                ).toFixed(1)} s`}
          </div> */}

          <div className="flex flex-wrap justify-center my-3 w-[80%] mx-auto text-[20px]">
            출석일 수 : {count}
          </div>
          {/* <div className="project-quest">
            {projectData.quests.map((v, i) => {
              return <OneQuestPart quest={v} key={i} />;
            })}
          </div> */}
          <div
            className="mx-auto hover:cursor-pointer border-[1px] border-black rounded-3xl w-40 py-2 text-center"
            onClick={() => {
              if (nowTime > lastCheckTime + 10000) {
                setCount(count + 1);
                setLastCheckTime(Date.now());
              }
            }}
          >
            {nowTime > lastCheckTime + 10000
              ? '출석하기'
              : `남은 시간 : ${(
                  (lastCheckTime + 10000 - nowTime) /
                  1000
                ).toFixed(1)} s`}
          </div>

          <div
            className="project-minting my-4"
            onClick={() => {
              handleClickOpen();
            }}
          >
            티켓 구매하기
          </div>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>NFT 구매</DialogTitle>
            <DialogContent>
              <DialogContentText>
                당신은 n개의 퀘스트를 완료하였으므로, 00% 할인된 00 가격에 NFT
                구매가 가능합니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleClose}>민팅</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
  return (
    <div className="ml-2 text-black" {...restProps}>
      onC ... 로딩중 ...
    </div>
  );
}

export default OneProjectPart;
