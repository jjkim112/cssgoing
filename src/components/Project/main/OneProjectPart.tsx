'use client';
import React, { ReactNode, useState } from 'react';
import './ProjectStyles.css';
import OneQuestPart, { Quest } from './OneQuestPart';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';

export interface ProjectData {
  id: number;
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  quests: Quest[];
}
interface OneProjectPartProps {
  projectData: ProjectData | null;
}

function OneProjectPart({ projectData, ...restProps }: OneProjectPartProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (projectData) {
    return (
      <div className="w-full flex  justify-center">
        <div className="max-w-[1850px] ">
          <img className="project-img" src={projectData.imgUrl} alt="" />
          <div className="project-title">{projectData.title}</div>
          <div className="project-description">{projectData.description}</div>
          <div className="project-quest">
            {projectData.quests.map((v, i) => {
              return <OneQuestPart quest={v} key={i} />;
            })}
          </div>
          <div
            className="project-minting"
            onClick={() => {
              handleClickOpen();
            }}
          >
            프로젝트 민팅하기
          </div>
          {/* <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>NFT 구매</DialogTitle>
          <DialogContent>
            <DialogContentText>
              당신은 n개의 퀘스트를 완료하였으므로, 00% 할인된 00 가격에 NFT
              구매가 가능합니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Buttonlick={handleClose}>민팅</Buttonlick=>
          </DialogActions>
        </Dialog> */}
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
