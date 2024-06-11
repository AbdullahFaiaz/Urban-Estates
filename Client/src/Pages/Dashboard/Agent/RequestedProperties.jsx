import { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../Context/ContextComponent";
import { useMutation, useQuery } from "@tanstack/react-query";


const RequestedProperties = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();

    const {data: properties, refetch, isLoading} = useQuery({
        queryKey: ['requestedPropertiesAgentQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedProperties?email=${user.email}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })








const verifyPropertyMutation = useMutation({
    mutationFn: async (verifiedProperty) => {
        const response = await axiosSecure.patch(`/requestedProperty?id=${verifiedProperty.id}&propertyId=${verifiedProperty.propertyId}`, verifiedProperty);
        return response.data;
    },
    onError: (error) => {
        console.error("Error validating requested property:", error.message);
    },
    onSuccess: (data) => {
        console.log("from client", data);
        if (data.modifiedCount > 0) {
            refetch();
        }
    }
});

const handleVerify = (id, propertyId) => {
    verifyPropertyMutation.mutate({ id, propertyId, Status: 'accepted' });
}

const handleReject = (id, propertyId) => {
    verifyPropertyMutation.mutate({ id, propertyId, Status: 'rejected' });
}

















    if(isLoading){
        return(

            <div className='flex flex-col h-screen w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }
    return (
        <div className="flex h-full flex-col lg:flex-row">
      
          <div className="flex-1 flex flex-col items-center lg:ml-0 lg:w-3/4">
            <div className="text-center w-full py-[35px]">
              <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
                Requested Properties
              </h2>
              <div className="w-[40%] pb-[30px] mx-auto mb-4">
                <hr />
              </div>
            </div>
      
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
              <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
                      Property Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Buyer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Buyer Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Offered Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {/* accept btn */} Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {/* reject btn */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties?.map(property =>
                    <tr key={property._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {property.Title}
                      </th>
                      <td className="px-6 py-4">
                        {property?.Location}
                      </td>
                      <td className="px-6 py-4">
                        {property.BuyerName}
                      </td>
                      <td className="px-6 py-4">
                        {property.BuyerEmail}
                      </td>
                      <td className="px-6 py-4">
                        {property.OfferedAmount}
                      </td>
                      {property?.Status === 'pending' ?
                        <>
                          <td className="px-6 py-4">
                            <button className="btn btn-sm bg-black text-white" onClick={() => handleVerify(property?._id, property?.propertyId)}>Accept</button>
                          </td>
                          <td className="px-6 py-4">
                            <button className="btn btn-sm bg-black text-white" onClick={() => handleReject(property?._id, property?.propertyId)}>Reject</button>
                          </td>
                        </> :
                        <td className="px-6 py-4 flex-1" colSpan="2">
                          {property.Status}
                        </td>}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
};

export default RequestedProperties;


                {/* <td className="px-6 py-4">
                    <button className="btn btn-sm bg-black text-white" onClick={()=>handleVerify(property?._id, property?.propertyId)}>Accept ({property?.Status})</button>
                </td>
                <td className="px-6 py-4">
                    <button className="btn btn-sm bg-black text-white" onClick={()=>handleReject(property?._id, property?.propertyId)}>Reject ({property?.Status})</button>
                </td> */}