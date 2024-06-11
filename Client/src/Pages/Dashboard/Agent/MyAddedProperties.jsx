import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Context/ContextComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import useRole from "../../../Hook/useRole";

const MyAddedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: myAddedProperties = [],
    refetch: myAddedPropertyRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["myAddedPropertiesAgentQuery"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myAddedProperties?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!localStorage.getItem("access-token"),
  });

  const deleteMyAddedProperty = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosSecure.delete(`/myAddedProperties/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error deleting my added property: ${error.message}`);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: () => {
      console.log("My added property deleted successfully");
      myAddedPropertyRefetch();
    },
  });

  const handleDelete = (id) => {
    deleteMyAddedProperty.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center w-full">
        <span className="size-80 loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-center py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
          My Added Properties
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>
      
      
       
       {myAddedProperties?.length>0? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:pl-50 items-center m-10">{myAddedProperties.map((property) => (
          <div key={property._id} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
<div className="h-[200px]">
    <img className="h-[200px] w-[400px]" src={property.Image} alt="Property" />
</div>
  
  <div title="Agent Profile" className="avatar pl-2 pt-1">
  <div className="w-20 mask mask-circle">
    <img src={property.AgentImage}/>
  </div>

</div>
<div className="pl-2 text-gray-400">Agent Image</div>

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
    <span className="font-semibold">Status: </span>{property.Status}
    </p>
    <p className="text-gray-700 text-[9px] md:text-[16px]">
    <span className="font-semibold">Price Range: </span>
      {property.minPrice} to {property.maxPrice}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    {property.Status !== "rejected" && (
      <Link to={`updateProperty/${property._id}`}>
        <button className="btn btn-sm bg-black text-white">Update</button>
      </Link>
    )}
    <button
      className="btn btn-sm bg-black text-white"
      onClick={() => handleDelete(property._id)}
    >
      Delete
    </button>
  </div>
</div>

        ))
      }</div>: <div className=" flex flex-col items-center w-full">No Propeties Found</div>}











    </div>
  );
};

export default MyAddedProperties;
