import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../Hook/useAxiosSecure"
import { Link } from "react-router-dom";
import { useState } from "react";


const AllProperties = () => {
    const [search, setSearch] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [sortedProperties, setSortedProperties] = useState(null)

    const axiosSecure = useAxiosSecure()
    const {data: allVerifiedProperties=[], refetch: refetchAllVerifiedProperties, isLoading} = useQuery({
        queryKey: ['allVerifiedPropertiesGeneralQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allVerifiedProperties`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })


    const filteredProperties = allVerifiedProperties.filter(property =>
        property.Location.toLowerCase().includes(search.toLowerCase())
    );

    const sortProperties = () => {
        const sortedProperties = [...filteredProperties].sort((a, b) => a.minPrice - b.minPrice);
        setSortedProperties(sortedProperties);
        setIsSorted(true);
    };
    


    if(isLoading){
        return(

            <div className='flex flex-col h-screen w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }

    return (
        <div className="pt-[70px]">
           
           <div className="text-center py-[35px]">
    <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold"> All Properties
</h2>
<div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>
</div>

<div className="flex justify-between mx-[5%]">


<div>
    <div className="font-bold">Sort by Price</div>
    <select className="border-2 border-solid border-black text-2xl my-3" onChange={(e) => {
        if (e.target.value === "price") {
            sortProperties();
        }
    }}>
        <option value="">Sort by...</option>
        <option value="price">Price</option>
    </select>
</div>






<div>
        <div className="font-bold">Search By Location</div>
    <input className="m-[20px] mt-2"
        type="text"
        placeholder="Search by location"
        onChange={(e) => setSearch(e.target.value)}
        style={{
            padding: "10px",
            fontSize: "17px",
            border: "2px solid black",
            width: "200px",
            outline: "none",
            borderRadius: "5px"
        }}
    />
    </div>
</div>



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">

    {isSorted ? sortedProperties?.map(property =>         <div key={property._id} className="relative mb-[1vw] w-full lg:w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg">
            <img src={property.Image} alt={property.Title} className="w-full h-[280px] md:h-[280px] lg:h-[300px] object-cover" />
            <div title="Agent Profile" className="px-[20px] avatar pt-1">
            <div className="w-20 mask mask-circle">
                <img src={property.AgentImage}/>
            </div>
            </div>
            <div className="px-[20px] text-gray-400">Agent Image</div>
            <div className="px-[20px]">
            <div className="font-bold text-2xl mb-2">
      <span className="font-semibold"></span>
      {property.Title}</div>
      <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Property Location: </span>{property.Location}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
                    <span className="font-semibold">Agent Name:</span> {property.AgentName}
                </p>

                <p className="text-gray-700 text-[9px] md:text-[16px]">
                    <span className="font-semibold">Status:</span> {property.Status}
                </p>                

                <p className="text-gray-700 text-[9px] md:text-[16px]">
                <span className="font-semibold">Price Range</span><br />
                    <span className="">Minimum Price: </span> {property.minPrice} <br />
                    <span className="">Maximum Price: </span> {property.maxPrice}
                </p>

            </div>
            <div className="px-[20px]">
                <Link to={`/propertyDetails/${property._id}`}>
                <button  className="text-[9px] md:text-[16px] bg-black text-white hover:text-black font-bold btn btn-sm rounded">
                    View Details
                </button>
                </Link>
            </div>
        </div>): filteredProperties.map(property =>         <div key={property._id} className="relative mb-[1vw] w-full lg:w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg">
            <img src={property.Image} alt={property.Title} className="w-full h-[280px] md:h-[280px] lg:h-[300px] object-cover" />
            <div title="Agent Profile" className="px-[20px] avatar pt-1">
            <div className="w-20 mask mask-circle">
                <img src={property.AgentImage}/>
            </div>
            </div>
            <div className="px-[20px] text-gray-400">Agent Image</div>
            <div className="px-[20px]">
            <div className="font-bold text-2xl mb-2">
      <span className="font-semibold"></span>
      {property.Title}</div>
      <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Property Location: </span>{property.Location}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
                    <span className="font-semibold">Agent Name:</span> {property.AgentName}
                </p>

                <p className="text-gray-700 text-[9px] md:text-[16px]">
                    <span className="font-semibold">Status:</span> {property.Status}
                </p>                

                <p className="text-gray-700 text-[9px] md:text-[16px]">
                <span className="font-semibold">Price Range</span><br />
                    <span className="">Minimum Price: </span> {property.minPrice} <br />
                    <span className="">Maximum Price: </span> {property.maxPrice}
                </p>

            </div>
            <div className="px-[20px]">
                <Link to={`/propertyDetails/${property._id}`}>
                <button  className="text-[9px] md:text-[16px] bg-black text-white hover:text-black font-bold btn btn-sm rounded">
                    View Details
                </button>
                </Link>
            </div>
        </div>)
}
</div>





        </div>
    );
};

export default AllProperties;