'use client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialogname from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
interface DialogState {
  title: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginDialog({
  title,
  openDialog,
  setOpenDialog,
}: DialogState) {
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <Dialogname>{title} 로그인 후 이용 하실수 있습니다.</Dialogname>
        <DialogContent>
          <DialogContentText>
            <span style={{ color: 'red' }}>
              지갑 로그인후 사용하실수 있습니다.
            </span>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
