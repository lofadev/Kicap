import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './ModalConfirm.scss';

export default function ModalConfirm({
  open,
  handleClose,
  handleDelete,
  desc,
  textOk,
  textCancel,
}) {
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
          <Button onClick={handleClose} style={{ color: 'var(--red)' }}>
            {textCancel ?? 'Huỷ'}
          </Button>
          <Button onClick={handleDelete} autoFocus style={{ color: 'var(--blue)' }}>
            {textOk ?? 'Xoá'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
