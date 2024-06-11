
import { BsBuildingsFill } from "react-icons/bs";


import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextComponent";
import 'react-tooltip/dist/react-tooltip.css'
import useAdmin from './../../Hook/useAdmin';

const NavbarTwo = () => {
    const [isAdmin] = useAdmin()
    // const isAdmin = true

// night mode starts
const [theme,setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
useEffect(()=>{
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem("theme");
    document.querySelector('html').setAttribute("data-theme", localTheme)
},[theme])
const handleTheme = (e) => {
    if(e.target.checked){
        setTheme("dark")
    } else{
        setTheme("light")
    }
}
//night mode ends
    const navigate = useNavigate()
    const {logOut,user} = useContext(AuthContext)
    const navLinks = <>
        <NavLink to="/"> <span>Home</span></NavLink>
        {user && <NavLink to="/allProperties"><span>All Properties</span></NavLink>}
        {user && <NavLink to="/dashboard/userProfile"><span>Dashboard</span></NavLink>}
        {!user && <><NavLink to="/login"><span>Log In</span></NavLink>
        <NavLink to="/register"><span>Register</span></NavLink></>}
    </>

    const handleLogOut=() =>{
        logOut()
        navigate("/login")
    }




    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen(false);
    };


  return (
    <div className="fixed w-full z-50 bg-cover bg-bottom text-[5px] sm:text-[6px] md:text-[5px] lg:text-[4px] bg-black" 
    // style={{ backgroundImage: `url(${footerImage})` }} 
    >
        <div className="navbar bg-[#0f020200] rounded-md text-white">
        <div className="navbar-start w-[68%] flex items-center">


<div className="dropdown z-40">
                        <div
                            tabIndex={0}
                            role="button"
                            className="flex flex-col justify-center items-center bg-slate-900 p-[4px] pr-[2vw] lg:hidden"
                            onClick={handleHamburgerClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 md:h-4 md:w-4"
                                fill="none"
                                viewBox="0 0 21 21"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        {isDropdownOpen && (
                            <ul
                                tabIndex={0}
                                className="menu menu-lg bg-[#dcdcdc] text-black dropdown-content mt-3 z-1 p-2 shadow rounded-box w-52"
                                onClick={handleDropdownClick}
                            >
                                {/* {navLinks} */}
                                <li><NavLink to="/">Home</NavLink></li>
                                {user && <li><NavLink to="/allProperties">All Properties</NavLink></li>}
                                {user && <li><NavLink to="/dashboard/userProfile">Dashboard</NavLink></li>}
                                {!user && (
                                    <>
                                        <li><NavLink to="/login">Log In</NavLink></li>
                                        <li><NavLink to="/register">Register</NavLink></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>



            <a className="text-[14px] sm:text-[16px] md:pl-[2vw] md:text-[20px] lg:text-[25px] w-full flex items-center">
                <div><BsBuildingsFill /></div>
                <div>Urban Estates</div></a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            {navLinks}
            </ul>
        </div>
        <div className="navbar-end w-[60%]">
        {/* <Tooltip id="my-tooltip" /> */}

        {/* night mode _________________________________________________________________________________________*/}
                    <label className="swap swap-rotate mr-2">
                    
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" checked={theme === "light"? false : true} onChange={handleTheme} className="theme-controller" value="synthwave" />
                    
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    
                    {/* moon icon */}
                    <svg className="swap-on fill-current w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    
                    </label>
                    
            {/* night mode ends ___________________________________________________________________________________*/}
                   {user ? (
                        <>
                            <button className="mr-[2vw] text-[10px] font-light sm:font-normal sm:text-[12px] md:text-[10px] lg:text-[14px]" onClick={handleLogOut}>
                                Log Out
                            </button>

                            <span
                               title={user?.displayName || "User name not found"}
                                className="rounded-full sm:mr-[8px] h-6 w-6 sm:h-[6vw] sm:w-[6vw] md:h-[2vw] md:w-[2vw] overflow-hidden border shadow-lg"
                            >
                                <Link to={"dashboard/userProfile"}>
                                {/* <a data-tooltip-id="my-tooltip"
                                data-tooltip-content={user?.displayName || "User name not found"}
                                data-tooltip-place="bottom-start"> */}
                                <img
                                    className="rounded-full h-full w-full object-cover"
                                    src={user?.photoURL || "https://i.ibb.co/sV6w5ct/Vecteezy-illustration-of-human-icon-vector-user-symbol-icon-modern-8442086.jpg"}
                                    alt="Profile Picture"
                                />
                            {/* </a> */}
                            </Link>
                            </span>
                                <div className="text-[8px] md:text-[11px]">{user?.displayName}</div>
                           
                        </>
                    ) : (
                        <Link className="mr-[2vw] text-[12px] md:text-[12px] lg:text-[18px] font-light sm:font-normal" to={"/login"}>
                            Log In
                        </Link>
                    )}
        </div>
        </div>
    </div>
  );
};

export default NavbarTwo;
