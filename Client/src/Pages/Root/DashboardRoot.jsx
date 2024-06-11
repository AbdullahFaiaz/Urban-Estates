import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";

import { AuthContext } from "../../Context/ContextComponent";
import { Audio } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import NavbarTwo from "../Shared/NavbarTwo";
import Dashboard from "../Shared/Dashboard";




const DashboardRoot = () => {
    const {loading} = useContext(AuthContext)

    if(loading){
        return (
        <>
        <div className="border h-[100vh] flex flex-col items-center justify-center"> 
               <span className="size-96 loading loading-bars loading-lg"></span>
        <div className="text-5xl">Loading...</div>
        </div>

        </>
    )
    }
    return (
        <div className="flex w-full">
            <div className=""><Dashboard/></div>
            <div className="pt-16 w-full"><Outlet></Outlet></div>
        </div>
    );
};

export default DashboardRoot;
