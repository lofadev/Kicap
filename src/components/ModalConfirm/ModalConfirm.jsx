import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './ModalConfirm.scss';

export default function ModalConfirm({ open, handleClose, handleDelete, desc }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Thông báo.</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleDelete} autoFocus>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
