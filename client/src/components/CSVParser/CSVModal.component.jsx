import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CSVParser from './CSVParser';
import palette from '../../theme/palette';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  border: `2px solid ${palette.primary}`,
};

export default function CSVModal({ open, setOpen, handleOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ margin: '1rem', fontWeight: 600, fontSize: '1.4rem' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Excel sheet to add all the books
          </Typography>
          <CSVParser handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
