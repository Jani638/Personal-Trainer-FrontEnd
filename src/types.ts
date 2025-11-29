export type Tcustomer = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    streetaddress: string;
    postcode: string;
    city: string;
}

export type Ttrainings = {
    date: string;
    duration: number;
    activity: string;
}

export type AddCustomerProps = {
    handleAdd: (customer: Tcustomer) => void;
    setSnackbarOpen: (open: boolean) => void;
    setSnackbarMessage: (message: string) => void;
}

export type EditCustomerProps = {
    url: string;
    currentCustomer: Tcustomer;
    handleUpdate: (url: string, customer: Tcustomer) => void;
    setSnackbarOpen: (open: boolean) => void;
    setSnackbarMessage: (message: string) => void;
}

export type AddTrainingProps = {
    customerLink: string;
    firstname: string;
    lastname: string;
    handleAdd: (training: Ttrainings & { customer: string }) => void;
    setSnackbarOpen: (open: boolean) => void;
    setSnackbarMessage: (message: string) => void;
}

export type CustomToolbarProps = {
    title: string;
    handleAdd?: (customer: Tcustomer) => void;
    setSnackbarOpen?: (open: boolean) => void;
    setSnackbarMessage?: (message: string) => void;
    exportFields?: string[];
    showAddButton?: boolean;
}

export type CalendarEvent = {
    title: string;
    start: string;
    end: string;
    backgroundColor?: string;
}

export type TrainingWithCustomer = 
Ttrainings & { customer: { firstname: string; lastname: string } };

export type ActivityStats = {
    activity: string;
    totalDuration: number;
}