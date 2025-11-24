import React from "react";
import type { AddCustomerProps } from "../types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const customerData = Object.fromEntries((formData as any).entries());
        const customer = { 
            id: customerData.id,
            firstname: customerData.firstname,
            lastname: customerData.lastname,
            streetaddress: customerData.streetaddress,
            postcode: customerData.postcode,
            city: customerData.city,
            email: customerData.email,
            phone: customerData.phone
        };
        props.handleAdd(customer)
        handleClose();
        setSnackbarOpen(true);
    };

    return(
        <React.Fragment>
            <Button startIcon={<AddCircleOutlineIcon/>} color="inherit" onClick={() => handleClickOpen()}>Add customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id='subscription-form'>
                        <TextField
                            required
                            id="firstname"
                            name="firstname"
                            label="Firstname"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="lastname"
                            name="lastname"
                            label="Lastname"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="streetaddress"
                            name="streetaddress"
                            label="Streetaddress"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="postcode"
                            name="postcode"
                            label="Postcode"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Customer added successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}