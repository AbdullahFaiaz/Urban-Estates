import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useUser = () => {
    const axiosSecure = useAxiosSecure()
const {user} = useContext(AuthContext)
const { data: isUser, isPending: isUserLoading } = useQuery({
    queryKey: [user?.email, 'user'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/user/${user.email}`);
        console.log(res.data);
        return res.data?.user;
    }, enabled: !! localStorage.getItem('access-token')
})
return [isUser, isUserLoading]
};

export default useUser;