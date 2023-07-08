'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import './ProjectStyles.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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

function OneTicketCheckPart({
  projectData,
  ...restProps
}: OneProjectPartProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [ticketUse, setTicketUse] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (projectData) {
    return (
      <div className="w-full flex justify-center">
        <div className="inner">
          <img className="project-img" src={projectData.imgUrl} alt="" />
          <div className="project-title">{projectData.title}</div>
          <div className="project-description">{projectData.description}</div>
          <div className="project_ticket">
            첫 소유주 :
            <div
              className={
                ticketUse ? 'project_ticket_use' : 'project_ticket_nuUse'
              }
            >
              {ticketUse ? '본 인 증  명  됨' : '본인 소유 아님'}
            </div>
          </div>

          <div
            className="project-minting my-4"
            onClick={() => {
              handleClickOpen();
            }}
          >
            티켓 사용/입장 하기
          </div>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>티켓 사용/입장 하기</DialogTitle>
            <DialogContent>
              <DialogContentText>
                티켓 관리자외에 사용/입장하기 누를시 불이익이 있을 수 있습니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleClose}>사용/입장</Button>
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

export default OneTicketCheckPart;
