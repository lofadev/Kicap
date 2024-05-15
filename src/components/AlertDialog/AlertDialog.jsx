import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, title, desc, handleOk }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleOk}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} autoFocus>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
