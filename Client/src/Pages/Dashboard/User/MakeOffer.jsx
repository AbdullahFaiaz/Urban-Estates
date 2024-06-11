import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/ContextComponent";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useDate from "../../../Hook/useDate";
import Swal from "sweetalert2";


const MakeOffer = () => {

    const [showErr, setShowErr] = useState(false)
    const formRef = useRef()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {user} = useContext(AuthContext)
    const params = useParams()
    const axiosSecure = useAxiosSecure()
    const {data: wishedProperty, refetch:refetchWishlist, isLoading} = useQuery({
        queryKey: ['wishlistOneUserQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlistOne?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    formRef?.current?.reset()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();





    const makeOfferMutation = useMutation({
        
        mutationFn: async (newProperty) => {
          const response = await axiosSecure.post(`/makeOffer?email=${user.email}`, newProperty);
          return response.data;
        },
        onError: (error) => {
          console.error("Error making an offer:", error.message);
          setIsSubmitting(false)
        },
        onSuccess: (data) => {
        //   console.log("from client", data);
        setIsSubmitting(false)
          if (data.insertedId) {

            Swal.fire({
              title: 'Success!',
              text: 'Offer made successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
            formRef.current.reset()
        }
        else{

            Swal.fire({
              title: 'Warning',
              text: 'You already made an offer to this property',
              icon: 'warning',
              confirmButtonText: 'Okay'
            });
          }
        }
      });












const date = useDate()


    const onSubmit = async (data) => {
        setShowErr(false)

        setIsSubmitting(true)
    
        const { OfferedAmount,BuyerName,BuyerEmail } = data;
    

        const minPrice = parseInt(wishedProperty?.minPrice);
        const maxPrice = parseInt(wishedProperty?.maxPrice);
        
        if (parseInt(OfferedAmount) < minPrice || parseInt(OfferedAmount) > maxPrice) {

            setShowErr(true)
            setIsSubmitting(false)
            return; // Don't proceed with making the offer
        }


        const offeredProperty = {
            Title: wishedProperty?.Title,
            Location: wishedProperty?.Location,
            propertyId: wishedProperty?.propertyId,
            Image: wishedProperty?.Image,
            AgentImage: wishedProperty?.AgentImage,
            AgentName: wishedProperty?.AgentName,
            AgentEmail: wishedProperty?.AgentEmail,
            Description: wishedProperty?.Description,
            minPrice: wishedProperty?.minPrice,
            maxPrice: wishedProperty?.maxPrice,
            BuyingDate: date,
            BuyerName,
            BuyerEmail,
            OfferedAmount,
            VerificationStatus: wishedProperty?.VerificationStatus,
            Status: 'pending'
        };
    
        console.log(offeredProperty);
        
    
        makeOfferMutation.mutate(offeredProperty);



    }




      if(isLoading){
        return(

            <div className='flex flex-col h-screen w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }


    return (
        <div className="bg-cover bg-center p-10 sm:p-24">
        <Helmet>
            <title>Urban Estates | Make Offer</title>
        </Helmet>
            <h2 className="text-3xl text-gray-700 font-extrabold">Make an Offer</h2>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              
                
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='w-full'>
    
                {/* Property Title */}
               <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Property Title</span>
                        </label>
                        <label className="input-group">
                            <input readOnly type="text" defaultValue={wishedProperty?.Title} {...register("Title")} placeholder="Property Title" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
    
                {/* Location */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input readOnly type="text" defaultValue={wishedProperty?.Location} {...register("Location")} placeholder="Location" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
    

    
                {/* Agent Name */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Agent Name</span>
                        </label>
                        <label className="input-group">
                            <input readOnly type="text" defaultValue={wishedProperty?.AgentName} {...register("AgentName")} placeholder="Agent Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>


    
    
                </div>
    
    
    
    
                <div className='w-full'>



                {/* Buyer Name */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Buyer Name</span>
                        </label>
                        <label className="input-group">
                            <input readOnly type="text" defaultValue={user?.displayName} {...register("BuyerName")} placeholder="Buyer Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>


                {/* Buyer Email */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Buyer Email</span>
                        </label>
                        <label className="input-group">
                            <input readOnly type="email" {...register("BuyerEmail")} placeholder="Buyer Email" defaultValue={user.email} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                            {/* Offered Amount*/}

            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Offered Amount</span>
                    </label>
                    <label className="input-group">
                        <input required type="number" {...register("OfferedAmount")} placeholder={`Between ${wishedProperty?.minPrice} to ${wishedProperty?.maxPrice}`} className="input input-bordered w-full" />
                    </label>
                    {showErr && <div className="text-red-700">Please Enter an amount within the range</div>}
                </div>
            </div>
   {/* Offered Amount */}

              
    
    
                </div>  
    
    
    
            </div>
    {/* Offer btn */}
            {isSubmitting? (
          <div className='flex flex-col justify-center items-center'>
            <span className="loading loading-spinner loading-sm"></span> 
            </div>
        ): <input type="submit" value="Offer" className="btn text-white btn-block bg-black" />
    }
         
                
            </form>
        </div>
    );
};

export default MakeOffer;