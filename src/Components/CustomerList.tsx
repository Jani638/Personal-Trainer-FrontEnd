import { useEffect, useState } from "react";
import type { Tcustomer } from "../types";
import type { GridColDef, GridRowParams} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from "./CustomToolbar";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Snackbar, Alert } from "@mui/material";


export default function CustomerList(){
    const [customers, setCustomers] = useState<Tcustomer[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const columns: GridColDef[] = [
        {field: 'firstname', headerName: 'First Name', flex: 1},
        {field: 'lastname', headerName: 'Last Name', flex: 1},
        {field: 'streetaddress', headerName: 'Street Address', flex: 1},
        {field: 'postcode', headerName: 'Postalcode', flex: 1},
        {field: 'city', headerName: 'City', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'phone', headerName: 'Phone', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <AddTraining handleAdd={handleAddTraining} customerLink={params.row._links.self.href} firstname={params.row.firstname} lastname={params.row.lastname} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage}/>,
                <EditCustomer handleUpdate={handleUpdate} url={params.row._links.self.href} currentCustomer={params.row} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage}/>,
                <Button size="small" startIcon={<DeleteForeverIcon/>} color="error" onClick={() => {handleDelete(params.id as string)}}/>
            ]
        }
    ];

    const getCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
            if(!response.ok){
                throw new Error(`Failed to fetch customers: ${response.statusText}`);
            }
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdd = async(newCustomer: Tcustomer) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCustomer)
            }
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', options);
            if(!response.ok) {
                throw new Error(`Failed to add customer: ${response.statusText}`);
            }
            getCustomers();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddTraining = async(newTraining: any) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTraining)
            }
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', options);
            if(!response.ok) {
                throw new Error(`Failed to add training: ${response.statusText}`);
            }
            console.log('Training added successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (url: string , customer: Tcustomer) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
            const response = await fetch(url, options);
            if(!response.ok) {
                throw new Error(`Failed to edit customer: ${response.statusText}`);
            }
            getCustomers();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (url: string) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }
        try {
            const options = {
                method: 'DELETE'
            };

            const response = await fetch(url, options);
            if(!response.ok){
                throw new Error(`Failed to delete customer: ${response.statusText}`)
            }
            getCustomers();
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {getCustomers(); }, []);

    function Toolbar() {
        return (
            <CustomToolbar
                title="Customers"
                handleAdd={handleAdd}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
                exportFields={['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city']}
            />
        );
    }

    return (
        <div>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    slots={{
                        toolbar: Toolbar
                    }}
                    getRowId={(row) => row._links.self.href} 
                    rows={customers} 
                    columns={columns} 
                />
            </div>
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}