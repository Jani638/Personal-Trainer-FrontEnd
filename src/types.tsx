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
    id: Number;
    firstname: string;
    lastname: string;
    date: Date;
    duration: Number;
    activity: string;
}

export type AddCustomerProps = {
    handleAdd: (customer: Tcustomer) => void;
}

export type EditCustomerProps = {
    url: string;
    currentCustomer: Tcustomer;
    handleUpdate: (url: string, customer: Tcustomer) => void;
}