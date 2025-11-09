import { useEffect, useState } from "react";
import type { Ttrainings } from "../types";

export default function TrainingsList(){
    const [trainings, setTrainings] = useState<Ttrainings[]>([]);

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
            <h2>Trainings</h2>
        </div>
    );
}