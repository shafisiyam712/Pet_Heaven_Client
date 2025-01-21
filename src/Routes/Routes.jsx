import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PetListing from "../Pages/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns";
import PrivateRoute from "./PrivateRoute";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                children:[
                    {
                       
                      },
                ]
            },
           
        
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/PetListing',
                element: <PetListing></PetListing>
            },
            {
                path: '/DonationCampaigns',
                element: <DonationCampaigns></DonationCampaigns>
               
            },
           
        ] 
    }
])
export {routes}