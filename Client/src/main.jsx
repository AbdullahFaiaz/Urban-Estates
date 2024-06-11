import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/Home';

import Root from './Pages/Root/Root';

import { HelmetProvider } from 'react-helmet-async';
import Login from './Pages/Login & Register/Login';
import Register from './Pages/Login & Register/Register';
import ContextComponent from './Context/ContextComponent';
import ErrorPage from './Pages/Shared/ErrorPage';
import PrivateRoute from './Pages/Private/PrivateRoute';
import UserProfile from './Pages/Private/UserProfile';

//tan stack query_____________________________________
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import DashboardRoot from './Pages/Root/DashboardRoot';
import AddProperty from './Pages/Dashboard/Agent/AddProperty';
import MyAddedProperties from './Pages/Dashboard/Agent/MyAddedProperties';
import UpdateProperty from './Pages/Dashboard/Agent/UpdateProperty';
import ManageUsers from './Pages/Dashboard/Admin/ManageUsers';
import ManageProperties from './Pages/Dashboard/Admin/ManageProperties';
import AdminRoute from './Pages/Private/AdminRoute';
import AllProperties from './Pages/Private/AllProperties';
import Details from './Pages/Private/Details';
import MyReviews from './Pages/Dashboard/User/MyReviews';
import ManageReviews from './Pages/Dashboard/Admin/ManageReviews';
import Wishlist from './Pages/Dashboard/User/Wishlist';
import MakeOffer from './Pages/Dashboard/User/MakeOffer';
import PropertyBought from './Pages/Dashboard/User/PropertyBought';
import RequestedProperties from './Pages/Dashboard/Agent/RequestedProperties';
import Payment from './Pages/Dashboard/User/Payment';
import CheckoutForm from './Pages/Dashboard/User/CheckoutForm';
import MySoldProperties from './Pages/Dashboard/Agent/MySoldProperties';
import AdvertiseProperty from './Pages/Dashboard/Admin/AdvertiseProperty';



const queryClient = new QueryClient()
//tan stack query ______________________________


const router = createBrowserRouter([
  {
    //https://server-fbz4si1aj-abdullah-faiazs-projects.vercel.app
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage/>,
    children:[
    {
      index: true,
      element: <Home></Home>
    },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path: "/allProperties",
        element: <PrivateRoute><AllProperties/></PrivateRoute>
      },
      {
        path: "/propertyDetails/:id",
        element: <PrivateRoute><Details/></PrivateRoute>
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardRoot/></PrivateRoute>,
    errorElement:<ErrorPage/>,
    children:[

      {
        path: "userProfile",
        element: <PrivateRoute><UserProfile/></PrivateRoute>
      },
      {
        path: "wishlist",
        element: <PrivateRoute><Wishlist/></PrivateRoute>
      },
      {
        path: "myReviews",
        element: <PrivateRoute><MyReviews/></PrivateRoute>
      },
      {
        path: "manageProperties",
        element: <AdminRoute><ManageProperties/></AdminRoute>
      },
      {
        path: "manageUsers",
        element: <AdminRoute><ManageUsers/></AdminRoute>
      },
      {
        path: "manageReviews",
        element: <AdminRoute><ManageReviews/></AdminRoute>
      },
      {
        path: "advertiseProperty",
        element: <AdminRoute><AdvertiseProperty/></AdminRoute>
      },
      {
        path: "addProperty",
        element: <PrivateRoute><AddProperty/></PrivateRoute>
      },
      {
        path: "myAddedProperties",
        element: <PrivateRoute><MyAddedProperties/></PrivateRoute>
      },
      {
        path: "requestedProperties",
        element: <PrivateRoute><RequestedProperties/></PrivateRoute>
      },
      {
        path: 'myAddedProperties/updateProperty/:id',
        element: <PrivateRoute><UpdateProperty/></PrivateRoute>
      },
      {
        path: 'wishlist/makeOffer/:id',
        element: <PrivateRoute><MakeOffer/></PrivateRoute>
      },
      {
        path: "propertyBought",
        element: <PrivateRoute> <PropertyBought/> </PrivateRoute>
      },
      {
        path: "propertyBought/payment/:id",
        element: <PrivateRoute> <Payment/> </PrivateRoute>
      },
      {
        path: "mySoldProperties",
        element: <PrivateRoute> <MySoldProperties/> </PrivateRoute>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
              <ContextComponent>
                <RouterProvider router={router} />
              </ContextComponent>
        </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
