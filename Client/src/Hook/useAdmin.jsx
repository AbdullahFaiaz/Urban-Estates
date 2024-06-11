import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
const {user} = useContext(AuthContext)
const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'admin'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log(res.data);
        return res.data?.admin;
    }, enabled: !! localStorage.getItem('access-token')
})
return [isAdmin, isAdminLoading]
};

export default useAdmin;