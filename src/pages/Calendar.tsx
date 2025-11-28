import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Paper } from '@mui/material';
import type { CalendarEvent } from '../types';

const ACTIVITY_COLORS: { [key: string]: string } = {
    'Spinning': '#36b1f8ff',
    'Gym training': '#388e3c',
    'Fitness': '#cb9c1aff',
    'Jogging': '#ae39fcff',
    'Zumba': '#9812a7ff',
};

const getActivityColor = (activity: string): string => {
    return ACTIVITY_COLORS[activity] || '#757575';
};

const formatTrainingsToEvents = (trainings: any[]): CalendarEvent[] => {
    return trainings.map((training) => {
        const startDate = new Date(training.date);
        const endDate = new Date(startDate.getTime() + training.duration * 60000);
        
        return {
            title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            backgroundColor: getActivityColor(training.activity),
        };
    });
};

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const getTrainings = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch trainings: ${response.statusText}`);
            }
            
            const data = await response.json();
            const calendarEvents = formatTrainingsToEvents(data);
            setEvents(calendarEvents);
        } catch (error) {
            console.error('Error fetching trainings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrainings();
    }, []);

    if (loading) {
        return <Box sx={{ p: 3 }}>Loading calendar...</Box>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                    height="auto"
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                    allDaySlot={false}
                    nowIndicator={true}
                    eventClick={(info) => {
                        alert(`Training: ${info.event.title} ${info.event.start}`);
                    }}
                />
            </Paper>
        </Box>
    );
}
