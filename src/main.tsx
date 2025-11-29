import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Calendar from './pages/Calendar.tsx';
import Customers from './pages/Customers.tsx';
import Home from './pages/Home.tsx';
import Statistics from './pages/Statistics.tsx';
import Trainings from './pages/Trainings.tsx';

fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset', {
  method: 'POST',
});


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'customers', element: <Customers /> },
      { path: 'trainings', element: <Trainings /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'statistics', element: <Statistics /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
