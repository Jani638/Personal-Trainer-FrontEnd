import { useEffect, useState } from "react";
import type { Tcustomer } from "../types";



export default function CustomerList(){
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

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
            <h2>Customers</h2>
        </div>
    );
}