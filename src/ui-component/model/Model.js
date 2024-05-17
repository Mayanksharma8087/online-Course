import React from 'react';
import Modal from '@mui/material/Modal';

function Model({ children, open, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel}>
      {children}
    </Modal>
  );
}

export default Model;
