import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://urban-estate-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;