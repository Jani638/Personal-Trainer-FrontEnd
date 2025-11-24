import { useEffect, useState } from "react";
import type { Tcustomer } from "../types";
import type { GridColDef, GridRowParams} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';







export default function CustomerList(){
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    const columns: GridColDef[] = [
        {field: 'firstname', headerName: 'First Name', flex: 1},
        {field: 'lastname', headerName: 'Last Name', flex: 1},
        {field: 'streetaddress', headerName: 'Street Address', flex: 1},
        {field: 'postcode', headerName: 'Postalcode', flex: 1},
        {field: 'city', headerName: 'City', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'phone', headerName: 'Phone', flex: 1},
        {field: 'actions', headerName: 'Actions', flex: 2,
            type: 'actions',
            
            getActions: (params: GridRowParams) => [
                <AddTraining handleAdd={handleAddTraining} customerLink={params.row._links.self.href} firstname={params.row.firstname} lastname={params.row.lastname}/>,
                <EditCustomer handleUpdate={handleUpdate} url={params.row._links.self.href}currentCustomer={params.row}/>,
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
                // Voit halutessasi päivittää treenilistat tässä
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

    return (
        <div>
            <AddCustomer handleAdd={handleAdd} />
        <div>
            <DataGrid 
            showToolbar
            getRowId={(row) => row._links.self.href} 
            rows={customers} 
            columns={columns} 
            />
        </div>
    </div>
    )
}