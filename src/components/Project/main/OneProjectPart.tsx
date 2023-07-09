"use client";
import React, { ReactNode, useEffect, useState, useContext } from "react";
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
import {
  attendance,
  attendancePointCheck,
  getMyLastTimeOfAttendance,
  ticketBuying,
} from "@/utils/web3/web3_v2";
import { AppContext } from "@/app/layout";
import { OneTicket } from "@/domain/OneTicket";
import { OneProject } from "@/domain/OneProject";

// export interface ProjectData {
//   id: number;
//   contract: string;
//   title: string;
//   description: string;
//   imgUrl: string;
//   quests: Quest[];
// }

interface OneProjectPartProps {
  projectData: OneProject | null;
}

function OneProjectPart({ projectData, ...restProps }: OneProjectPartProps) {
  const [lastCheckTime, setLastCheckTime] = useState<number>(0);
  const [nowTime, setNowTime] = useState<number>(Date.now());
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pickTicket, setPickTicket] = useState<OneTicket | null>(null);

  // const [count, setCount] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  const { account } = useContext(AppContext);
  const clickPurchaseBtn = () => {
    if (pickTicket !== null) {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const purchaseTicket = async () => {
    if (pickTicket !== null) {
      const response = await ticketBuying(
        pickTicket.id,
        pickTicket.price,
        projectData!.contract,
        account
      );
      // TODO response 성공/실패 확인
    }

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
      const response = await attendance(projectData!.contract, account);
      // TODO await get User Attendance 함수 호출
      if (true) {
        // response 가 성공적일때
        const attendenceNum = await attendancePointCheck(
          projectData!.contract,
          account
        );
        if (attendenceNum !== null) {
          console.log("count set as " + attendenceNum);
          setCount(attendenceNum);
        }
        console.log(attendenceNum);
      }
      // setCount((v) => v + 1);
      // TODO await get Last Check Time 함수 호출
      const lastCheckTime = await getMyLastTimeOfAttendance(
        projectData!.contract,
        account
      );
      console.log("lastCheckTime");
      console.log(lastCheckTime);
      if (lastCheckTime !== null) {
        setLastCheckTime(blockTimeToNextJSTime(lastCheckTime));
        // setLastCheckTime((v) => Date.now() + 10000);
      }
    }
  };
  const blockTimeToNextJSTime = (value: number) => {
    return value;
  };

  if (projectData !== null) {
    return (
      <div className="w-full flex justify-center">
        <div className="inner">
          <img className="project-img" src={projectData.imgUrl} alt="" />
          <div className="project-title">{projectData.title}</div>
          <div className="project-description">{projectData.description}</div>
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
          {pickTicket === null ? (
            <div className="project-minting my-4">티켓 구매하기</div>
          ) : (
            <div
              className="project-minting-active my-4"
              onClick={clickPurchaseBtn}
            >
              티켓 구매하기{" "}
              {`가격 : ${pickTicket && pickTicket.price}, 좌석 : ${
                pickTicket && pickTicket.seat
              }`}
            </div>
          )}
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>NFT 구매</DialogTitle>
            <DialogContent>
              <DialogContentText>
                당신은 n번의 출석을 하였습니다. 지정하신 NFT는 구매가
                가능합니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={purchaseTicket}>{`구매(가격:${
                pickTicket && pickTicket.price
              })`}</Button>
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
