'use client';
import React, { useContext, useState } from 'react';
import './ProjectStyles.css';
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialogname from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AppContext } from '@/app/layout';
import { redirect } from 'next/navigation';

function ProjectCreateButton() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const [count, setCount] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const { account } = useContext(AppContext);
  if (!account) {
    return (
      <Dialog open={openDialog} onClose={handleClose}>
        <Dialogname>NFT 구매</Dialogname>
        <DialogContent>
          <DialogContentText>
            <span style={{ color: 'red' }}>
              지갑 로그인후 사용하실수 있습니다.
            </span>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          {/* <Button onClick={addNewProject}>확인</Button> */}
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <Link href="project/create">
      <div className="project-create-button">Project 생성</div>
    </Link>
  );
}

export default ProjectCreateButton;
