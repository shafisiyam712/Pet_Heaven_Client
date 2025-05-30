import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PetListing from "../Pages/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../MainLayout/DashBoardLayout";
import AddPet from "../Pages/Users/AddPet";
import CreateCampaign from "../Pages/Users/CreateCampaign";
import PetDetails from "../Pages/PetDetails";
import MyAddedPets from "../Pages/Users/MyAddedPets";


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
            // {
            //     path: '/PetListing',
            //     element: <PetListing></PetListing>,
            //     loader: ()=>fetch(`${import.meta.env.VITE_API_URL}/pets`),
            // },
            {
                path: '/PetListing',
                element: <PetListing></PetListing>,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/pets`)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Failed to fetch pets");
                        }
                        return res.json();
                    }),
            },
            {
                path: '/pets/:id',
                element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/pets/${params.id}`)
                
            },
            
            {
                path: '/DonationCampaigns',
                element: <DonationCampaigns></DonationCampaigns>
               
            },
            {
                path: '/addPet',
                element: <PrivateRoute><AddPet></AddPet></PrivateRoute>
               
            },
            {
                path: '/createCampaign',
                element: <CreateCampaign></CreateCampaign>
               
            },
            {
                path: '/myaddedpets',
                element: <MyAddedPets></MyAddedPets>
               
            },
           
        ] 
    },
    {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
        //   {
        //     index: true,
        //     element: (
        //       <PrivateRoute>
        //         <Statistics />
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'add-plant',
        //     element: (
        //       <PrivateRoute>
        //         <SellerRoute>
        //           <AddPlant />
        //         </SellerRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'my-inventory',
        //     element: (
        //       <PrivateRoute>
        //         <SellerRoute>
        //           <MyInventory />
        //         </SellerRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'manage-users',
        //     element: (
        //       <PrivateRoute>
        //         <AdminRoute>
        //           <ManageUsers />
        //         </AdminRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'profile',
        //     element: (
        //       <PrivateRoute>
        //         <Profile />
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'my-orders',
        //     element: (
        //       <PrivateRoute>
        //         <MyOrders />
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: 'manage-orders',
        //     element: (
        //       <PrivateRoute>
        //         <SellerRoute>
        //           <ManageOrders />
        //         </SellerRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        ],
      },
])
export {routes}