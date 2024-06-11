import { useContext } from "react";
import { AuthContext } from "../../../Context/ContextComponent";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MySoldProperties = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();


    const {data: properties, refetch, isLoading} = useQuery({
        queryKey: ['mySoldProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mySoldProperties?email=${user.email}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    const totalAmount = properties?.reduce((acc,property)=> acc+ parseInt(property.Price), 0)
    console.log("first ", properties)
    return (
        <div>

<div className="text-center py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
          My Added Properties
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>
           

        {properties?.length>0? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties?.map(property=>       <div key={property._id} className="mb-[1vw] rounded overflow-hidden shadow-lg">
            <div className="px-[2vw]">
                <div className="font-bold text-[10px] md:text-[25px]">{property.Title}</div>
                <p className="text-[8px] md:text-[15px]">
                    <span className="font-semibold">Location:</span> ${property.Location}
                </p>
                <p className="text-[8px] md:text-[15px]">
                    <span className="font-semibold">Buyer Name:</span> {property.BuyerName}
                </p>
                <p className="text-[8px] md:text-[15px]">
                    <span className="font-semibold">Buyer Email:</span> {property.BuyerEmail}
                </p>

                <p className="text-[8px] md:text-[15px]">
                    <span className="font-semibold">Sold Price:</span> {property.Price}
                </p>                
            </div>
        </div>
)} 
        </div>) : <div className=" flex flex-col items-center w-full">No Propeties Found</div>
        
    }
        
{/* show the total amount here */}
<div className="text-center py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
        Total Value of Properties Sold: ${totalAmount}
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>
<div></div> 

        </div>
    );
};

export default MySoldProperties;