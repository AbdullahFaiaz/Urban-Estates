import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Context/ContextComponent";
import { Link } from "react-router-dom";

const PropertyBought = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();


    const {data: properties, refetch:refetchBoughtProperties, isLoading} = useQuery({
        queryKey: ['boughtPropertiesUserQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/boughtProperties?email=${user.email}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

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
          Properties Bought
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>


      {properties?.length>0? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:pl-50 items-center m-10">{properties.map(property  => 
          <div key={property._id} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
<div className="h-[200px]">
    <img className="h-[200px] w-[400px]" src={property.Image} alt="Property" />
</div>
  
  {/* <div title="Agent Profile" className="avatar pl-6 pt-1">
  <div className="w-20 mask mask-circle">
    <img src={property.AgentImage}/>
  </div>

</div>
<div className="pl-6 text-gray-400">Agent Image</div> */}

  <div className="px-6 py-2">
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
    <span className="font-semibold">Offered Amount: </span>{property.OfferedAmount}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Status: </span>{property.Status}
    </p>
  </div>
  <div className="px-6">
  {property.Status === 'accepted' && <div className="py-2 px-2">
                <Link to={`payment/${property._id}`}>
                <button  className="text-[9px] md:text-[16px] btn btn-sm bg-black text-white">
                    Pay
                </button>
                </Link>
                </div>}

                {property.Status === 'bought' && <div className="py-2 px-2 text-green-500">
                Transaction Id: <br /> {property.transactionId}
                </div>}
  </div>
</div>

        )}
      </div>: <div className=" flex flex-col items-center w-full">No Propeties Found</div>}



        </div>



    );
};

export default PropertyBought;