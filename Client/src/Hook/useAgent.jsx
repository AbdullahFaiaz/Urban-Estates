import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useAgent = () => {
    const axiosSecure = useAxiosSecure()
const {user} = useContext(AuthContext)
const { data: isAgent, isPending: isAgentLoading } = useQuery({
    queryKey: [user?.email, 'agent'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/agent/${user.email}`);
        console.log(res.data);
        return res.data?.agent;
    }, enabled: !! localStorage.getItem('access-token')
})
return [isAgent, isAgentLoading]
};

export default useAgent;