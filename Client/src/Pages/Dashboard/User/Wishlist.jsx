import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Context/ContextComponent";
import { Link} from "react-router-dom";


const Wishlist = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: wishlist, refetch:refetchWishlist, isLoading} = useQuery({
        queryKey: ['wishlistUserQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const removeWishMutation = useMutation({
        mutationFn: async (id) => {
          try {
            const response = await axiosSecure.delete(`/wishlist/delete/${id}`);
            return response.data;
          } catch (error) {
            throw new Error(`Error deleting wished property: ${error.message}`);
          }
        },
        onError: (error) => {
          console.error(error.message);
        },
        onSuccess: () => {
          console.log('Wished Property deleted successfully');
          refetchWishlist();
        },
      });




    const handleRemove = (id) =>{
        removeWishMutation.mutate(id)
    }


    if(isLoading){
        return(

            <div className='flex flex-col h-screen w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }

    return (

        <div className="w-full">
                  <div className="text-center w-full py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
          My WishList
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>


      {wishlist?.length>0? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:pl-50 items-center m-10">{wishlist.map(property  => 
          <div key={property._id} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
<div className="h-[200px]">
    <img className="h-[200px] w-[400px]" src={property.Image} alt="Property" />
</div>
  
  <div title="Agent Profile" className="avatar pl-6 pt-1">
  <div className="w-20 mask mask-circle">
    <img src={property.AgentImage}/>
  </div>

</div>
<div className="pl-6 text-gray-400">Agent Image</div>

  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">
      <span className="font-semibold">Property Title: </span>
      {property.Title}</div>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Property Location: </span>{property.Location}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Agent Name: </span>{property.AgentName}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Verification Status: </span>{property.VerificationStatus}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Price Range: </span>
      {property.minPrice} to {property.maxPrice}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
                      <Link to={`makeOffer/${property._id}`}>
                      <button className="text-[9px] md:text-[16px] btn btn-sm bg-black text-white">
                          Make an Offer
                      </button>
                      </Link>

                <button onClick={()=>handleRemove(property._id)} className="text-[9px] md:text-[16px] btn btn-sm bg-black text-white">
                    Remove
                </button>
  </div>
</div>

        )}
      </div>: <div className=" flex flex-col items-center w-full">No Propeties Found</div>}




        </div>
    );
};

export default Wishlist;