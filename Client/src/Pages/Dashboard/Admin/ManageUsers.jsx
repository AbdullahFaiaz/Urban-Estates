import { useQuery,useMutation } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/ContextComponent";



const ManageUsers = () => {
  // const {user} = useContext(AuthContext)
  // const [fraud,setFraud] =useState(null)
  const [Id,setId] =useState(null)

    const axiosSecure = useAxiosSecure()
    const {data: allUsers=[], refetch, isLoading} = useQuery({
        queryKey: ['allUserAdminQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    
  //   const {data: fraudQuery, refetch: refetchFraud} = useQuery({
  //     queryKey: ['getTheFraud'],
  //     queryFn: async () => {
  //         const res = await axiosSecure.get(`/fraudUser?id=${Id}`)
  //         return res.data
  //     }, enabled: !! localStorage.getItem('access-token') && Id !== null
  // })
  const { data: fraudQuery, refetch: refetchFraud } = useQuery({
    queryKey: ['getTheFraud'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/fraudUser?id=${Id}`);
      return res.data;
    },
    enabled: !!localStorage.getItem('access-token') && Id !== null && /^[0-9a-fA-F]{24}$/.test(Id),
  });
  




    const mutationAdmin = useMutation({
        mutationFn: async (updatedUser) => {
          try {
            // Assuming '/users' is the endpoint for updating user roles
            const response = await axiosSecure.patch(`/users/admin/${updatedUser.id}`, updatedUser);
            return response.data; // You can adjust this based on your API response structure
          } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
          }
        },
        onError: (error) => {
          console.error(error.message);
          // Handle error (e.g., show a notification)
        },
        onSuccess: () => {
          console.log('User role updated successfully');
          refetch(); // Refetch data after a successful mutation
          // Handle success (e.g., show a success message)
        },
      });
    
      const handleAdmin = (id) => {
        setId(id)
        refetchFraud()
        mutationAdmin.mutate({ id, role: 'admin', email: fraudQuery?.email  });
      };



    const mutationAgent = useMutation({
        mutationFn: async (updatedUser) => {
          try {

            const response = await axiosSecure.patch(`/users/agent/${updatedUser.id}`, updatedUser);
            return response.data;
          } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
          }
        },
        onError: (error) => {
          console.error(error.message);
        },
        onSuccess: () => {
          console.log('User role updated successfully');
          refetch(); 
        },
      });
    
      const handleAgent = (id) => {
        setId(id)
        refetchFraud()
        mutationAgent.mutate({ id, role: 'agent' , email: fraudQuery?.email });
      };



    // const mutationFraud = useMutation({
    //     mutationFn: async (updatedUser) => {
    //       try {

    //         const response = await axiosSecure.patch(`/users/fraud/${updatedUser.id}&${user.email}`, updatedUser);
    //         return response.data;
    //       } catch (error) {
    //         throw new Error(`Error updating user: ${error.message}`);
    //       }
    //     },
    //     onError: (error) => {
    //       console.error(error.message);
    //     },
    //     onSuccess: () => {
    //       console.log('User role updated successfully');
    //       refetch(); 
    //     },
    //   });
    
    //   const handleFraud = (id) => {
    //     mutationFraud.mutate({ id, role: 'fraud' });
    //   };


    const mutationFraud = useMutation({
      mutationFn: async (updatedUser) => {
        const response = await axiosSecure.patch(`/users/fraud/${updatedUser.id}`, updatedUser);
        return response.data;
      },
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Error updating user role to fraud:', error.message);
        // You can handle the error here, e.g., show a notification to the user
      },
    });
  
    const handleFraud = (id) => {
      setId(id)
      refetchFraud()

      mutationFraud.mutate({ id, role: 'fraud', email: fraudQuery?.email });
    };





        const mutationUser = useMutation({
            mutationFn: async (updatedUser) => {
              try {
    
                const response = await axiosSecure.patch(`/users/user/${updatedUser.id}`, updatedUser);
                return response.data;
              } catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
              }
            },
            onError: (error) => {
              console.error(error.message);
            },
            onSuccess: () => {
              console.log('User role updated successfully');
              refetch(); 
            },
          });
        
          const handleUser = (id) => {
            setId(id)
            refetchFraud()
            mutationUser.mutate({ id, role: 'user', email: fraudQuery?.email  });
          };
    



        const deleteUserMutation = useMutation({
            mutationFn: async (id) => {
              try {
                const response = await axiosSecure.delete(`/users/delete/${id}`);
                return response.data;
              } catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
              }
            },
            onError: (error) => {
              console.error(error.message);
            },
            onSuccess: () => {
              console.log('User deleted successfully');
              refetch();
            },
          });
          
  const handleDelete = (id) => {
    deleteUserMutation.mutate(id);
  };

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
      Manage Users
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
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map(user => 
          <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {user.name}
            </td>
            <td className="px-6 py-4">
              {user.email}
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-center">
                {user?.role === "fraud" ? "Fraud" : user?.role === "admin" ? "Admin" : (
                  <button onClick={() => handleAdmin(user._id)} className="btn btn-sm bg-black text-white">Make Admin</button>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-center">
                {user?.role === "fraud" ? "Fraud" : user?.role === "agent" ? "Agent" : (
                  <button onClick={() => handleAgent(user._id)} className="btn btn-sm bg-black text-white">Make Agent</button>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-center">
                {user?.role === "user" ? "User" : (
                  <button onClick={() => handleUser(user._id)} className="btn btn-sm bg-black text-white">Make User</button>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-center">
                {user?.role === "fraud" ? "Fraud" : (
                  <button onClick={() => handleFraud(user._id)} className="btn btn-sm bg-black text-white">Mark Fraud</button>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-center">
                <button onClick={() => handleDelete(user._id)} className="btn btn-sm bg-black text-white">Delete User</button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    );
};       

export default ManageUsers;
