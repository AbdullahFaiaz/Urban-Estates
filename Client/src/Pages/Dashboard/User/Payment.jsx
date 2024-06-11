import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/ContextComponent";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const { user } = useContext(AuthContext);
    const { data: property, refetch, isLoading } = useQuery({
        queryKey: ['boughtPropertiesPaymentInfoUserQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getInfoForPayment?id=${params.id}`);
            return res.data;
        },
        enabled: !!localStorage.getItem('access-token')
    });

    if (isLoading) {
        return (
            <div className='flex flex-col h-screen w-full justify-center items-center'>
                <span className="size-80 loading loading-ball loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm property={property} />
            </Elements>
        </div>
    );
};

export default Payment;



// import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../../Context/ContextComponent";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";

// const Payment = () => {
//     const axiosSecure = useAxiosSecure()
//     const params = useParams()
//     const {user} = useContext(AuthContext)
//     const {data: property, refetch, isLoading} = useQuery({
//         queryKey: ['boughtPropertiesPaymentInfoUserQuery'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/getInfoForPayment?id=${params.id}`)
//             return res.data
//         }, enabled: !! localStorage.getItem('access-token')
//     })










//     if(isLoading){
//         return(

//             <div className='flex flex-col h-screen w-full justify-center items-center'>
//             <span className="size-80 loading loading-ball loading-lg"></span> 
//             </div>

//         )
//     }










// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    
//     return (
//         // <div>
//         //     Payment {property?.OfferedAmount}
//         // </div>
//         <div>
//         <div>
//             <Elements stripe={stripePromise}>
//                 <CheckoutForm></CheckoutForm>
//             </Elements>
//         </div>
//     </div>
//     );
// };

// export default Payment;