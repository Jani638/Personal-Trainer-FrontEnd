import { useEffect, useState } from "react";
import type { Ttrainings } from "../types";
import type { GridColDef} from '@mui/x-data-grid';
import { DataGrid} from '@mui/x-data-grid';
import { format } from "date-fns";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format (date, 'dd.MM.yyyy HH:mm')
}

export default function TrainingsList(){

    const [trainings, setTrainings] = useState<Ttrainings[]>([]);

    const columns: GridColDef[] = [
            {field: 'firstname', 
            headerName: 'First Name', 
            flex: 1, 
            valueGetter: (_, row) => row.customer.firstname},

            {field: 'lastname', 
            headerName: 'Last Name', 
            flex: 1,
            valueGetter: (_, row) => row.customer.lastname},
            
            {field: 'activity', headerName: 'Activity', flex: 1},
            {field: 'duration', headerName: 'Duration', flex: 1},
            {field: 'date', 
            headerName: 'Date', 
            flex: 1, 
            valueFormatter: (value) => formatDate(value)}
        ];

    const getTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            if(!response.ok){
                throw new Error(`Failed to fetch trainings: ${response.statusText}`);
            }
            const data = await response.json();
            setTrainings(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {getTrainings(); }, []);

    return (
        <div>
            <DataGrid 
            
            rows={trainings}
            columns={columns} />
        </div>
    );
}