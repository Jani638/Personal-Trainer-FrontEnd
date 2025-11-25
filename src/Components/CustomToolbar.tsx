import {
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  ExportCsv,
  QuickFilter,
  QuickFilterTrigger,
} from '@mui/x-data-grid';
import { Typography, Divider, Box } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import AddCustomer from './AddCustomer';
import type { CustomToolbarProps } from '../types';

export default function CustomToolbar({ 
    title, 
    handleAdd, 
    setSnackbarOpen, 
    setSnackbarMessage,
    exportFields = [],
    showAddButton = true
}: CustomToolbarProps) {
    return (
        <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
                {title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
                
                <ExportCsv 
                    render={<ToolbarButton />}
                    options={{
                        fields: exportFields.length > 0 ? exportFields : undefined,
                        includeHeaders: false
                    }}
                >
                    <FileDownloadIcon fontSize="small" />
                </ExportCsv>
                
                <QuickFilter>
                    <QuickFilterTrigger render={<ToolbarButton />}>
                        <SearchIcon fontSize="small" />
                    </QuickFilterTrigger>
                </QuickFilter>
                
                {showAddButton && handleAdd && setSnackbarOpen && setSnackbarMessage && (
                    <>
                        <Divider orientation="vertical" flexItem />
                        <AddCustomer 
                            handleAdd={handleAdd} 
                            setSnackbarOpen={setSnackbarOpen} 
                            setSnackbarMessage={setSnackbarMessage} 
                        />
                    </>
                )}
            </Box>
        </Toolbar>
    );
}
