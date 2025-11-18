import { useEffect, useState } from "react";
import type { Tcustomer } from "../types";
import type { GridColDef} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';



export default function CustomerList(){
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    const columns: GridColDef[] = [
        {field: 'firstname', headerName: 'First Name', flex: 1},
        {field: 'lastname', headerName: 'Last Name', flex: 1},
        {field: 'streetaddress', headerName: 'Street Address', flex: 1},
        {field: 'postcode', headerName: 'Postalcode', flex: 1},
        {field: 'city', headerName: 'City', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'phone', headerName: 'Phone', flex: 1}
    ]

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
    useEffect(() => {getCustomers(); }, []);

    return (
        <div>
            <DataGrid 
            getRowId={(row) => row._links.self.href} 
            rows={customers} 
            columns={columns} 
            />
        </div>
    );
}