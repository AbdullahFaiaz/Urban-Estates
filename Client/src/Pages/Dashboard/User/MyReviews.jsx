import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Context/ContextComponent";


const MyReviews = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: myReviews, refetch:refetchMyReviews} = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myReviews?email=${user.email}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })


    const deleteReviewMutation = useMutation({
        mutationFn: async (id) => {
          try {
            const response = await axiosSecure.delete(`/myReviews/delete/${id}`);
            return response.data;
          } catch (error) {
            throw new Error(`Error deleting review: ${error.message}`);
          }
        },
        onError: (error) => {
          console.error(error.message);
        },
        onSuccess: () => {
          console.log('Review deleted successfully');
          refetchMyReviews();
        },
      });



    const handleDelete = (id) =>{
        deleteReviewMutation.mutate(id)
    }



    return (
        <div className="flex flex-col items-center  w-full">
    
    <div className="text-center w-full py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
          Properties Bought
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>
    
    {myReviews?.length>0? 
    
    <div className="w-full flex flex-col items-center">{
        myReviews.map(review => <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl p-6 m-2" key={review._id}>
            <div className="">
            <p className="text-gray-800">Property Title: {review.Title}</p>
            <p className="text-gray-800">Agent Name: {review.AgentName}</p>
            <p className="text-gray-800">Review Time: {review.Time}</p>
            <p className="text-gray-800">Review Description: {review.Review}</p>
            <button className="btn btn-sm bg-black text-white" onClick={()=>{handleDelete(review._id)}}>Delete</button>
            </div>
        </div>)
    }
    </div>
    :
    <div>No review found</div>
    }






        </div>
    );
};

export default MyReviews;