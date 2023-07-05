"use client";
import React, { ReactNode, useEffect, useState } from "react";
import "./ProjectStyles.css";
import OneQuestPart, { Quest } from "./OneQuestPart";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import OneTicketThumb from "./OneTicketThumb";
import {
  dateToStr,
  dateToStrEng,
  msToPeriodStrEng,
  oneDayDateNumber,
} from "@/utils/date_util";

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
  minCount: number;
  saleRate: number;
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

  const getUserAttendance = async () => {
    //
    //const response = await contract....;
    setCount((prev) => prev);
  };

  useEffect(() => {
    setInterval(() => {
      setNowTime(Date.now());
    }, 100);
  }, []);

  const clickAttendance = async () => {
    if (nowTime >= lastCheckTime) {
      // TODO await attendance 함수 실행
      // TODO await get User Attendance 함수 호출
      setCount((v) => v);
      // TODO await get Last Check Time 함수 호출
      setLastCheckTime((v) => v);
    }
  };

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

          <div className="flex flex-wrap justify-center my-3 w-[80%] mx-auto text-[20px]">
            출석일 수 : {count}
          </div>
          {nowTime > lastCheckTime ? (
            <div
              className="flex flex-col justify-center items-center mx-auto hover:cursor-pointer border-[1px] border-black rounded-3xl w-[300px] py-2 text-center"
              onClick={clickAttendance}
            >
              <div className="text-[18px] font-bold mb-1">출석하기</div>
              {lastCheckTime !== 0 ? (
                <div className="text-[12px] text-gray-300">{`최근 출석 : ${dateToStrEng(
                  new Date(lastCheckTime)
                )}`}</div>
              ) : null}
              {/* <div className="text-[12px] text-gray-300">{`최근 출석 : ${dateToStrEng(
                new Date(lastCheckTime)
              )}`}</div> */}
            </div>
          ) : (
            <div className="flex justify-center mx-auto hover:cursor-pointer border-[1px] border-black rounded-3xl w-[300px] py-2 text-center">
              <div className="mr-[4px]">남은 시간 : </div>
              <div className="text-red-500">
                {msToPeriodStrEng(lastCheckTime - nowTime)}
              </div>
            </div>
          )}

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
