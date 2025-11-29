import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { AddTrainingProps } from '../types';

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trainingData = Object.fromEntries(formData.entries());

    const trainingWithCustomer = {
      date: String(trainingData.date),
      duration: Number(trainingData.duration),
      activity: String(trainingData.activity),
      customer: props.customerLink,
    };
    props.handleAdd(trainingWithCustomer);
    handleClose();
    props.setSnackbarMessage('Training added successfully!');
    props.setSnackbarOpen(true);
  };

  return (
    <>
      <Button size="small" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add Training for {props.firstname} {props.lastname}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="training-form">
            <TextField
              required
              margin="dense"
              id="date"
              name="date"
              label="Date"
              type="datetime-local"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="duration"
              name="duration"
              label="Duration (minutes)"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="activity"
              name="activity"
              label="Activity"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="training-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
