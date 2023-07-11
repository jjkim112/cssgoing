'use client';
import React, { useContext, useState } from 'react';
import './ProjectStyles.css';
import Link from 'next/link';
import { AppContext } from '@/app/layout';
import LoginDialog from '@/compounds/Redirect';

function ProjectCreateButton() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { account } = useContext(AppContext);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  if (!account) {
    return (
      <>
        <div className="project-create-button" onClick={handleClickOpen}>
          Project 생성
        </div>
        <LoginDialog
          title={' Project 생성 페이지는'}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        ></LoginDialog>
      </>
    );
  } else {
    return (
      <Link href="project/create">
        <div className="project-create-button">Project 생성</div>
      </Link>
    );
  }
}

export default ProjectCreateButton;
