import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";


const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {data: forAd=[], refetch, isLoading} = useQuery({
        queryKey: ['allVerifiedPropertiesForAdAdminQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allVerifiedPropertiesForAd`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    // const {data: checkIfAdGiven=[], refetch, isLoading} = useQuery({
    //     queryKey: ['checkIfAdGiven'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/checkIfAdGiven`)
    //         return res.data
    //     }, enabled: !! localStorage.getItem('access-token')
    // })

    const addAdMutation = useMutation({
        mutationFn: async (newProperty) => {
          const response = await axiosSecure.post("/advertise", newProperty);
          return response.data;
        },
        onError: (error) => {
          console.error("Error adding property:", error);
          setIsSubmitting(false);
          let errorMessage = "An unknown error occurred.";
          
          if (error.response) {
            // Server responded with a status code outside the 2xx range
            errorMessage = `Error: ${error.response.data.message || error.message}`;
          } else if (error.request) {
            // Request was made but no response was received
            errorMessage = "No response received from the server. Please try again.";
          } else {
            // Something happened in setting up the request
            errorMessage = error.message;
          }
      
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        },
        onSuccess: (data) => {
            setIsSubmitting(false);
            if (data && data.insertedId) {
              Swal.fire({
                title: 'Success!',
                text: 'Property advertised successfully',
                icon: 'success',
                confirmButtonText: 'Okay'
              });
            } else {
              Swal.fire({
                title: 'Warning!',
                text: 'Already advertised.',
                icon: 'warning',
                confirmButtonText: 'Okay'
              });
            }
          }
      });


const handleAd = (id) => {

    addAdMutation.mutate({propertyId: id});
}
    






if(isLoading){
    return(

        <div className='flex flex-col h-screen w-full justify-center items-center'>
        <span className="size-80 loading loading-ball loading-lg"></span> 
        </div>

    )
}





    return (
<div className="flex h-full flex-col items-center p-4 lg:p-8">
  <div className="text-center w-full py-[35px]">
    <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
      Advertise Properties
    </h2>
    <div className="w-[40%] pb-[30px] mx-auto mb-4">
      <hr />
    </div>
  </div>

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
    <div className="pb-4 bg-white dark:bg-gray-900">
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
      </div>
    </div>
    
    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Property Image
          </th>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Price Range
          </th>
          <th scope="col" className="px-6 py-3">
            Agent Name
          </th>
          <th scope="col" className="px-6 py-3">
            {/* ad btn */}
          </th>
        </tr>
      </thead>
      <tbody>
        {forAd.map(property => 
          <tr key={property._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
              <img className="w-24 h-16" src={property.Image} alt={property.Image} />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {property.Title}
            </td>
            <td className="px-6 py-4">
              {property.minPrice} to {property.maxPrice}
            </td>
            <td className="px-6 py-4">
              {property.AgentName}
            </td>
            <td className="px-6 py-4">
              <button className="btn btn-sm bg-black text-white" onClick={() => handleAd(property._id)}>Advertise</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


    );
};

export default AdvertiseProperty;