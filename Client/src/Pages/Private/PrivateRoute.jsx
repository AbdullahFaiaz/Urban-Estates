import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { PropTypes } from 'prop-types';
import { AuthContext } from "../../Context/ContextComponent";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    //location to tract where user wanted to go before log in. 
    //so that after login user can be redirected there
    const location = useLocation()
    // console.log(location.pathname)
    if(loading){
        return         <div className="border h-[100vh] flex flex-col items-center justify-center"> 
                            <span className="size-96 loading loading-bars loading-lg"></span>
                            <div className="text-5xl">Loading...</div>
                        </div>

    }
    if(user){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node,
}