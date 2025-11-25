import { useEffect, useState } from "react";
import type { Ttrainings } from "../types";
import type { GridColDef, GridRowParams} from '@mui/x-data-grid';
import { DataGrid} from '@mui/x-data-grid';
import { format } from "date-fns";
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomToolbar from "./CustomToolbar";


const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy HH:mm');
};

export default function TrainingsList() {
    const [trainings, setTrainings] = useState<Ttrainings[]>([]);

    const columns: GridColDef[] = [
        {
            field: 'firstname',
            headerName: 'First Name',
            flex: 1,
            valueGetter: (_, row) => row.customer.firstname
        },
        {
            field: 'lastname',
            headerName: 'Last Name',
            flex: 1,
            valueGetter: (_, row) => row.customer.lastname
        },
        {field: 'activity', headerName: 'Activity', flex: 1},
        {field: 'duration', headerName: 'Duration', flex: 1},
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            valueFormatter: (value) => formatDate(value)
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <Button size="small" startIcon={<DeleteForeverIcon/>} color="error" onClick={() => {handleDelete(params.row.id)}}/>
            ]
        }
    ];

    const getTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            if(!response.ok) {
                throw new Error(`Failed to fetch trainings: ${response.statusText}`);
            }
            const data = await response.json();
            setTrainings(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this training?')) {
            return;
        }
        try {
            const options = {
                method: 'DELETE'
            };
            const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, options);
            if(!response.ok) {
                throw new Error(`Failed to delete training: ${response.statusText}`);
            }
            getTrainings();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {getTrainings(); }, []);

    function Toolbar() {
        return (
            <CustomToolbar
                title="Trainings"
                exportFields={['firstname', 'lastname', 'activity', 'duration', 'date']}
                showAddButton={false}
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
                    getRowId={(row) => row.id}
                    rows={trainings}
                    columns={columns}
                />
            </div>
        </div>
    );
}