import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import Customers from './pages/Customers.tsx'
import Trainings from './pages/Trainings.tsx'
import Home from './pages/Home.tsx';

fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset', 
  {method: 'POST'}
);


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'customers', element: <Customers/>},
      {path: 'trainings', element: <Trainings/>},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
