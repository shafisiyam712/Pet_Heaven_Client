import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            
        </div>
    );
};

// export default ErrorPage;
// export const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <MainLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           path: '/',
//           element: <Home />,
//         },
//         {
//           path: '/plant/:id',
//           element: <PlantDetails />,
//         },
//       ],
//     },
//     { path: '/login', element: <Login /> },
//     { path: '/signup', element: <SignUp /> },
//     {
//       path: '/dashboard',
//       element: (
//         <PrivateRoute>
//           <DashboardLayout />
//         </PrivateRoute>
//       ),
//       children: [
//         {
//           index: true,
//           element: (
//             <PrivateRoute>
//               <Statistics />
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'add-plant',
//           element: (
//             <PrivateRoute>
//               <SellerRoute>
//                 <AddPlant />
//               </SellerRoute>
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'my-inventory',
//           element: (
//             <PrivateRoute>
//               <SellerRoute>
//                 <MyInventory />
//               </SellerRoute>
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'manage-users',
//           element: (
//             <PrivateRoute>
//               <AdminRoute>
//                 <ManageUsers />
//               </AdminRoute>
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'profile',
//           element: (
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'my-orders',
//           element: (
//             <PrivateRoute>
//               <MyOrders />
//             </PrivateRoute>
//           ),
//         },
//         {
//           path: 'manage-orders',
//           element: (
//             <PrivateRoute>
//               <SellerRoute>
//                 <ManageOrders />
//               </SellerRoute>
//             </PrivateRoute>
//           ),
//         },
//       ],
//     },
//   ])