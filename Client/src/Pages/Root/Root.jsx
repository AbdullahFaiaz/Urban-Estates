import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";

import { AuthContext } from "../../Context/ContextComponent";
import { Audio } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import NavbarTwo from "../Shared/NavbarTwo";




const Root = () => {
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
        <div>
             <NavbarTwo/>
            {/* className="min-h-[calc(100vh-288px)]" */}
            <div className="min-h-[calc(100vh-300px)]">
                <Outlet></Outlet>
                </div>
            <Footer/>
        </div>
    );
};

export default Root;



// const Root = () => {
//     const {loading} = useContext(AuthContext)
//     const location = useLocation();
//     const [isDashboard, setIsDashboard] = useState(false);
  
//     useEffect(() => {
//       if (location.pathname === "/dashboard") {
//         setIsDashboard(true);
//       } else {
//         setIsDashboard(false);
//       }
//     }, [location.pathname]);

//     if(loading){
//         return (
//         <>
//         <div className="border h-[100vh] flex flex-col items-center justify-center"> 
//         <Audio
//   height={500}
//   width={500}
//   radius={2}
//   color="#008ad3"
//   ariaLabel="ball-triangle-loading"
//   wrapperStyle={{}}
//   wrapperClass=""
//   visible={true}
//   />
//         <div className="text-5xl">Loading...</div>
//         </div>

//         </>
//     )
//     }
//     return (
//         <div>
//             {location.pathname === "/dashboard" || <NavbarTwo/>}
//             {/* className="min-h-[calc(100vh-288px)]" */}
//             <div className={`min-h-[calc(100vh-300px)] ${isDashboard ? "" : "pt-[100px]"}`}>
//                 <Outlet></Outlet>
//                 </div>
//                 {location.pathname === "/dashboard" || <Footer/>}
//         </div>
//     );
// };

// export default Root;