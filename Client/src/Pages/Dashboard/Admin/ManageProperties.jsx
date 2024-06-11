import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProperties = () => {

    const axiosSecure = useAxiosSecure()
    const {data: allProperties=[], refetch: refetchAllProperties, isLoading} = useQuery({
        queryKey: ['allPropertiesAdminQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const verifyPropertyMutation = useMutation({
        mutationFn: async (verifiedProperty) => {
          const response = await axiosSecure.patch(`/verifyProperty?id=${verifiedProperty.id}`, verifiedProperty);
          return response.data;
        },
        onError: (error) => {
          console.error("Error updating property:", error.message);
        },
        onSuccess: (data) => {
          console.log("from client", data);
          if (data.modifiedCount>0) {
            refetchAllProperties()
            // Swal.fire({
            //   title: 'Success!',
            //   text: 'Property verified successfully',
            //   icon: 'success',
            //   confirmButtonText: 'Okay'
            // });
          }
        }
      });

    const handleVerify = (id) =>{
        verifyPropertyMutation.mutate({ id, Status: 'verified' })
    }

    const handleReject = (id) =>{
        verifyPropertyMutation.mutate({ id, Status: 'rejected' })
    }






    if(isLoading){
        return(

            <div className='flex flex-col h-screen w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }




    return (
        <div className="flex h-full flex-col items-center px-4 lg:px-8">
        <div className="text-center w-full py-8">
          <h2 className="text-2xl lg:text-3xl text-gray-800 font-bold">
            Manage Properties
          </h2>
          <div className="w-full lg:w-2/5 pb-8 mx-auto mb-4">
            <hr />
          </div>
        </div>
      
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search" className="block w-full sm:w-80 pl-10 pt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
            </div>
          </div>
      
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Property Title</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Agent Name</th>
                <th scope="col" className="px-6 py-3">Agent Email</th>
                <th scope="col" className="px-6 py-3">Price Range</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProperties.map(property => (
                <tr key={property._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{property.Title}</th>
                  <td className="px-6 py-4">{property.Location}</td>
                  <td className="px-6 py-4">{property.AgentName}</td>
                  <td className="px-6 py-4">{property.email}</td>
                  <td className="px-6 py-4">{property.minPrice} to {property.maxPrice}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    {property.Status === 'pending' ? (
                      <>
                        <button className="btn btn-xs bg-black text-white" onClick={() => handleVerify(property._id)}>Verify</button>
                        <button className="btn btn-xs bg-black text-white" onClick={() => handleReject(property._id)}>Reject</button>
                      </>
                    ) : (
                      <span className="font-bold">{property.Status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    );
};

export default ManageProperties;

{/* 
                <td className="px-6 py-4">
                    <button onClick={()=>handleVerify(property._id)}>Verify ({property?.Status})</button>
                </td>
                <td className="px-6 py-4">
                    <button onClick={()=>handleReject(property._id)}>Reject ({property?.Status})</button>
                </td> */}