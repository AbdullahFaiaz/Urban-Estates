import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useRole = () => {
    const axiosSecure = useAxiosSecure()
const {user} = useContext(AuthContext)
const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, 'role'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/user-role/${user.email}`);
        console.log("role is : ",res.data.role);
        return res.data?.role;
    }, enabled: !! localStorage.getItem('access-token')
})
return [role, isRoleLoading]
};

export default useRole;