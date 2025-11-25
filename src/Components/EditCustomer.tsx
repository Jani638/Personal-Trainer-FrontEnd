import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { EditCustomerProps } from "../types"
import React from "react";
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer(props: EditCustomerProps) {
    const [open, setOpen] = React.useState(false);
    const [customerForm, setCustomerForm] = React.useState(props.currentCustomer);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerForm({...customerForm, [event.target.name]: event.target.value});
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
        props.handleUpdate(props.url, customer);
        handleClose();
        props.setSnackbarMessage('Customer edited successfully!');
        props.setSnackbarOpen(true);
    };

    return(
        <React.Fragment>
            <Button startIcon={<EditIcon/>} onClick={() => handleClickOpen()}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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
                            onChange={handleChange}
                            value={customerForm.firstname}
                        />
                        <TextField
                            required
                            id="lastname"
                            name="lastname"
                            label="Lastname"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.lastname}
                        />
                        <TextField
                            required
                            id="streetaddress"
                            name="streetaddress"
                            label="Streetaddress"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.streetaddress}
                        />
                        <TextField
                            required
                            id="postcode"
                            name="postcode"
                            label="Postcode"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.postcode}
                        />
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.city}
                        />
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.email}
                        />
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={customerForm.phone}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}