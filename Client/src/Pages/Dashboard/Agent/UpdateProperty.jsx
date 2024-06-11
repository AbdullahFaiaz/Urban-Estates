
import { useParams } from 'react-router-dom';
import useRole from '../../../Hook/useRole';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/ContextComponent';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';







const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateProperty = () => {
    const params = useParams()
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const {data: updateProperty, refetch} = useQuery({
        queryKey: ['updatePropertyAgentQuery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/updateProperty?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    // console.log(updateProperty)
    // const [role] = useRole()
  //react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {user} = useContext(AuthContext)



    const updatePropertyMutation = useMutation({
        mutationFn: async (updatedProperty) => {
          const response = await axiosSecure.patch(`/updateProperty?id=${params.id}`, updatedProperty);
          return response.data;
        },
        onError: (error) => {
          console.error("Error updating property:", error.message);
        },
        onSuccess: (data) => {
          console.log("from client", data);
          if (data.modifiedCount>0) {
            refetch()
            Swal.fire({
              title: 'Success!',
              text: 'Property updated successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
          }
        }
      });





    const onSubmit = async (data) => {
        const imageFile = {image: data?.image[0]}
        let res;
        if(data?.image[0]){
                res = await axiosPublic.post(image_hosting_api, imageFile,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }

        const { Title,Location,maxPrice,minPrice } = data;
    

        console.log(imageFile)


        const updatedProperty = {
            Title,
            Location,
            Image: res?.data.data.display_url || updateProperty.Image,
            minPrice,
            maxPrice,
            AgentImage:user.photoURL
        };
    
        console.log("updated Property",updatedProperty);
    
    
        updatePropertyMutation.mutate(updatedProperty);




    }


    return (
        <div className="bg-cover bg-center p-10 sm:p-24">
        <Helmet>
            <title>Urban Estates | Update Estate</title>
        </Helmet>
            <h2 className="text-3xl text-gray-700 font-extrabold">Update a Property</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              
                
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='w-full'>
    
                {/* Property Title */}
               <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Property Title</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" defaultValue={updateProperty?.Title} {...register("Title")} placeholder="Property Title" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
    
                {/* Location */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" defaultValue={updateProperty?.Location} {...register("Location")} placeholder="Location" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
    

            {/* Description */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Description</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" defaultValue={updateProperty?.Description} {...register("Description")} placeholder="Description" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>



                {/* Image */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Image</span>
                        </label>
                        <label className="input-group">
                            <input type="file" {...register("image")} placeholder="Image" className="" />
                        </label>
                    </div>
                </div>
    
    
                </div>
    
    
    
    
                <div className='w-full'>
    
                {/* Agent Name */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Agent Name</span>
                        </label>
                        <label className="input-group">
                            <input required readOnly type="text" defaultValue={user?.displayName} {...register("AgentName")} placeholder="Agent Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Agent Email */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-gray-700 label-text">Agent Email</span>
                        </label>
                        <label className="input-group">
                            <input required readOnly type="email" {...register("email")} placeholder="Agent Email" defaultValue={user.email} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                            {/* Price Range*/}
            <div className='border box-border p-2'>Price Range
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Minimum Price</span>
                    </label>
                    <label className="input-group">
                        <input required type="number" defaultValue={updateProperty?.minPrice} {...register("minPrice")} placeholder="Minimum Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Maximum Price</span>
                    </label>
                    <label className="input-group">
                        <input required type="number" defaultValue={updateProperty?.maxPrice} {...register("maxPrice")} placeholder="Maximum Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>
              
    
    
                </div>  
    
    
    
            </div>
    
    
                {/* Update Button */}
                <input type="submit" value="Update Property" className="btn text-white btn-block bg-black" />
            </form>
        </div>
    );
};

export default UpdateProperty;