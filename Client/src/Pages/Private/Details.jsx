import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/ContextComponent";
import useTime from "../../Hook/useTime";
import useDate from "../../Hook/useDate";


const Details = () => {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const {user} = useContext(AuthContext)
    const params = useParams()
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null)
    const {data: property, refetch:refetchPropertyDetails} = useQuery({
        queryKey: ['propertyDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties/details?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const {data: reviews, refetch:refetchReviews} = useQuery({
        queryKey: ['propertyReview'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/propertyReview?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const modal = document.getElementById('my_modal_5');

    
    const addReviewMutation = useMutation({
        mutationFn: async (Review) => {
          const response = await axiosSecure.post("/review", Review);
          return response.data;
        },
        onError: (error) => {
          console.error("Error adding review:", error.message);
        },
        onSuccess: (data) => {
        //   console.log("from client", data);
          if (data.insertedId) {
            refetchReviews()
            Swal.fire({
              title: 'Success!',
              text: 'Review added successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
          }
        }
      });



      const time = useTime()
      const date = useDate()
  // Handle form submission
    const onSubmit = async (data) => {
        
        const Review = {
            propertyId:params?.id,
            Review: data.Review,
            ReviewerEmail: user?.email,
            ReviewerName: user?.displayName,
            AgentName: property.AgentName,
            Title: property.Title,
            Time: " "+time+',' +" "+ date,
            SortingTime: new Date(),
            PropertyTitle: property.Title,
            ReviewerImage: user?.photoURL
        }
        modal.close();
        addReviewMutation.mutate(Review)
        formRef.current.reset()


    };




   const addToWishListMutation = useMutation({
    mutationFn: async (wishedProperty) => {
      try {
        const response = await axiosSecure.post(`/wishlist?email=${user.email}`, wishedProperty);
        setIsSubmitting(false)
        return response.data;
      } catch (error) {
        console.error("Error in mutationFn:", error); // Log detailed error
        throw error; // Rethrow the error to be caught by onError
      }
    },
        onError: (error) => {
          console.error("Error adding to wishlist:", error.message);
          setIsSubmitting(false)
        },
        onSuccess: (data) => {
          setIsSubmitting(false)
        //   console.log("from client", data);
          if (data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Successfully added to wishlist',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
          }
          else{
            Swal.fire({
              title: 'Warning',
              text: 'Already added to wishlist',
              icon: 'warning',
              confirmButtonText: 'Okay'
            });
          }
        }
      });



    const handleWishList = (id) => {
      setIsSubmitting(true)
      const wishedProperty = {
        Title:property?.Title,
        Location:property?.Location,
        Image: property?.Image,
        AgentName:property?.AgentName,
        AgentEmail:property?.email,
        AgentImage: property?.AgentImage,
        Description:property?.Description,
        minPrice:property?.minPrice,
        maxPrice:property?.maxPrice,
        propertyId: id,//property._id
        VerificationStatus: property?.Status,
        WisherEmail: user?.email,
        WisherName: user?.displayName,
    };
      addToWishListMutation.mutate(wishedProperty)
    }

    return (
        <div>

            <div className="relative pt-[80px] mb-[1vw] w-full lg:w-[60%] mx-auto rounded overflow-hidden shadow-lg">
            <img src={property?.Image} alt={property?.Title} className="m-4 w-[500px] mx-auto h-[500px] object-cover" />
            <hr />
            <div className="flex justify-between mt-4">
            {/* <img src={property?.AgentImage} alt={property?.Title} className="w-full h-[30vw] md:h-[22vw] lg:h-[16vw] object-cover" /> */}

            <div className="px-[25px]">
                <div className="font-bold text-[15px] md:text-[28px]">{property?.Title}</div>
                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Location:</span> ${property?.Location}
                </p>
                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Agent Name:</span> {property?.AgentName}
                </p>

                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Property Status:</span> {property?.Status}
                </p>                
                <p className="text-[12px] md:text-[20px]">
                <p className="font-semibold">Price Range</p>
                    <span className="">Minimum Price:</span> {property?.minPrice} <br />
                    <span className="">Maximum Price:</span> {property?.maxPrice}
                </p>


                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Property Description:</span> {property?.Description}
                </p>
            </div>

<div>
  <div className="avatar m-4">  
    <div className="w-20 mask mask-squire">
      <img src={property?.AgentImage} />
    </div>
  </div>
  <div className="flex flex-col items-center justify-center text-[8px] md:text-[15px] text-slate-400 font-light">Agent Image</div> 
</div>

            </div>
            <div className="px-[25px] py-[10px]">

              {isSubmitting? <div className="flex flex-col items-center justify-center"><div className="loading loading-spinner loading-sm"></div></div>:<button onClick={()=> handleWishList(property._id)} className="text-[12px] md:text-[20px] bg-black text-white hover:text-black hover:bg-white font-bold btn btn-md rounded">
                    Add to wishlist
                </button>}  

            </div>
        </div>



{/* Review */}

<div className="py-[100px] text-center">


<button className="btn btn-lg bg-black text-white hover:text-black hover:bg-white font-bold rounded text-center" onClick={() => document.getElementById('my_modal_5').showModal()}>
  Add a review
</button>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div className="flex flex-col items-center my-20">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <textarea
          required
          {...register("Review")}
          placeholder="Write Your Review Here"
          className="textarea textarea-bordered textarea-lg w-full"
        ></textarea>
        <input type="submit" className="btn btn-md bg-black text-white hover:text-black hover:bg-white font-bold mt-2 rounded" />
      </form>
    </div>
  </div>
</dialog>










        <div className="flex flex-col items-center">
    <div className="text-3xl mt-6">All Reviews to This Property</div>
    
        {reviews?.length>0? 
        
        <div className="w-full flex flex-col items-center">{
            reviews.map(review => <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl p-6 m-2" key={review._id}>
                <div className="">
                <p className="text-gray-800 text-left">{review.Review}</p>
                <br />
                <p className="text-gray-500 text-right">{review.ReviewerName} ({review.ReviewerEmail})</p>
                
                </div>
            </div>)
        }
        </div>
        :
        <div>No review found</div>
        }
        </div>

        </div>







        </div>
    );
};

export default Details;