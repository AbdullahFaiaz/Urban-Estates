import { NavLink } from "react-router-dom";
import useRole from "../../Hook/useRole";
import { useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";


const Dashboard = () => {
    
    const [toggle, setToggle] = useState(false)
    const handleToggle = () =>{
        setToggle(!toggle)
        console.log("toggle",toggle)
    }
    const [role] = useRole()
    return (

        <div className="h-full">
            <div className="drawer lg:drawer-open h-full">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex">

    {/* dashboard button */}
    <label onClick={handleToggle} htmlFor="my-drawer-2" className="btn drawer-button z-20 swap swap-rotate lg:hidden">
  {
      !toggle? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg> :
      <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>

  }
  


</label>
    {/* Page content here */}

  </div> 





  <div className="z-10 drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
      </label> 
    <ul className="menu p-4 pt-16 w-80 h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <div className="text-3xl flex font-bold">
        <div><BsBuildingsFill /></div>
        <div>Urban Estates</div>
      </div>
      <br />
    {role === 'admin' && 
    <>
    <li><NavLink to="userProfile">Admin Profile</NavLink></li>
    <li><NavLink to="manageProperties">Manage Properties</NavLink></li>
    <li><NavLink to="manageUsers">Manage Users</NavLink></li>
    <li><NavLink to="manageReviews">Manage reviews</NavLink></li>
    <li><NavLink to="advertiseProperty">Advertise Properties</NavLink></li>
    </>
    }
    {role === 'agent' && 
    <>
    <li><NavLink to="userProfile">Agent Profile</NavLink></li>
    <li><NavLink to="addProperty">Add Property</NavLink></li>
    <li><NavLink to="myAddedProperties">My added properties</NavLink></li>
    <li><NavLink to="mySoldProperties">My sold properties</NavLink></li>
    <li><NavLink to="requestedProperties">Requested properties</NavLink></li>
    </>
    }
    {role === 'user' && 
    <>
    <li><NavLink to="userProfile">My Profile</NavLink></li>
    <li><NavLink to="wishlist">Wishlist</NavLink></li>
    <li><NavLink to="propertyBought">Property bought</NavLink></li>
    <li><NavLink to="myReviews">My reviews</NavLink></li>
    </>
    }
    {role === 'fraud' && 
    <>
    You are marked as a Fraud. No dashboard menu for you.
    </>
    }
                        <div className="divider"></div>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allProperties">All Properties</NavLink></li>

    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;