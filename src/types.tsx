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
    date: Date;
    duration: Number;
    activity: string;
    customer: string;

}