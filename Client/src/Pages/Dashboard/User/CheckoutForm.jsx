// /* eslint-disable react/prop-types */
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useContext, useEffect, useState } from "react";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { AuthContext } from "../../../Context/ContextComponent";
// import useDate from "../../../Hook/useDate";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ property }) => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useContext(AuthContext);
//     const date = useDate();

//     const totalPrice = property?.OfferedAmount;

//     useEffect(() => {
//         if (totalPrice && !isNaN(totalPrice)) {
//             axiosSecure.post('/create-payment-intent', { price: totalPrice })
//                 .then(res => {
//                     console.log("Client Secret:", res.data.clientSecret); // Log the client secret
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(error => {
//                     setError("Failed to initialize payment. Please try again.");
//                     console.error("Error creating payment intent:", error);
//                 });
//         } else {
//             console.error("Invalid price provided:", totalPrice); // Add a log to check invalid price
//             setError("Invalid price provided.");
//         }
//     }, [axiosSecure, totalPrice]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const card = elements.getElement(CardElement);

//         if (card === null) {
//             return;
//         }

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         });

//         if (error) {
//             setError(error.message);
//         } else {
//             setError('');
//         }

//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user?.email || 'anonymous',
//                     name: user?.displayName || 'anonymous'
//                 }
//             }
//         });

//         if (confirmError) {
//             setError(confirmError.message);
//         } else {
//             if (paymentIntent.status === 'succeeded') {
//                 setTransactionId(paymentIntent.id);

//                 const payment = {
//                     Price: totalPrice,
//                     transactionId: paymentIntent.id,
//                     date: date,
//                     propertyId: property.propertyId,
//                     AgentEmail: property.AgentEmail,
//                     BuyerEmail: property.BuyerEmail,
//                     status: 'pending'
//                 };

//                 const res = await axiosSecure.post('/payments', payment);
//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "Thank you for the payment",
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                 }
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
//                 Pay {property.OfferedAmount} TK
//             </button>
//             {error && <p className="text-red-600">{error}</p>}
//             {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
//         </form>
//     );
// };

// export default CheckoutForm;







/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../Context/ContextComponent";
import useDate from "../../../Hook/useDate";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ property }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const date = useDate();

    const totalPrice = property?.OfferedAmount;

    useEffect(() => {
        if (totalPrice && !isNaN(totalPrice)) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log("Client Secret:", res.data.clientSecret); // Log the client secret
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    setError("Failed to initialize payment. Please try again.");
                    console.error("Error creating payment intent:", error);
                });
        } else {
            console.error("Invalid price provided:", totalPrice); // Add a log to check invalid price
            setError("Invalid price provided.");
        }
    }, [axiosSecure, totalPrice]);

    const { mutate: processPayment, isLoading } = useMutation({
        mutationFn: async (payment) => {
            return await axiosSecure.post('/payments', payment);
        },
        onSuccess: (res) => {
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thank you for the payment",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        onError: (error) => {
            console.error("Error processing payment:", error);
            setError("Failed to process payment. Please try again.");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    Price: totalPrice,
                    Title: property.Title,
                    Location: property.Location,
                    transactionId: paymentIntent.id,
                    date: date,
                    propertyId: property.propertyId,
                    AgentEmail: property.AgentEmail,
                    AgentName: property.AgentName,
                    BuyerEmail: property.BuyerEmail,
                    BuyerName: property.BuyerName,
                    status: 'pending'
                };

                processPayment(payment);
            }
        }
    };

    return (
        <form className="px-10 py-10 border rounded-lg m-10 bg-slate-100" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {!isLoading?<button className="btn btn-sm bg-black text-white my-4" type="submit" disabled={!stripe || !clientSecret || isLoading}>
                Pay ${property.OfferedAmount} 
            </button>:<div className='flex flex-col justify-center items-left py-4 px-3'>
            <span className="loading loading-spinner loading-sm"></span> 
            </div>

}
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
