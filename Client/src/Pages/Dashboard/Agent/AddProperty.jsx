import { useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import useRole from './../../../Hook/useRole';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../Context/ContextComponent';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddProperty = () => {
    const formRef = useRef()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [role] = useRole()
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    
  //react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {user} = useContext(AuthContext)



    const addPropertyMutation = useMutation({

        mutationFn: async (newProperty) => {
          const response = await axiosSecure.post("/addProperty", newProperty);
          return response.data;
        },
        onError: (error) => {
          console.error("Error adding property:", error.message);
          setIsSubmitting(false)
        },
        onSuccess: (data) => {
        //   console.log("from client", data);
        setIsSubmitting(false)
          if (data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Property added successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
            formRef.current.reset()
        }
        }
      });





    const onSubmit = async (data) => {
        
        const imageFile = {image: data.image[0]}
        setIsSubmitting(true)
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const { Title,Location,AgentName,email,minPrice,maxPrice,Description } = data;
    

        console.log(imageFile)


        const newProperty = {
            Title,
            Location,
            Image: res.data.data.display_url,
            AgentName,
            email,
            Description,
            minPrice,
            maxPrice,
            Status: "pending",
            role: role,
            AgentImage:user.photoURL
        };
    
        console.log(newProperty);
        
    
        addPropertyMutation.mutate(newProperty);




    }



    return (
         
        <div className="w-full bg-cover bg-center p-4 sm:p-24">
    <Helmet>
        <title>Urban Estates | Add Estates</title>
    </Helmet>
        <h2 className="text-3xl text-gray-700 font-extrabold">Add a Property</h2>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          
            
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>

            {/* Property Title */}
           <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Property Title</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" {...register("Title")} placeholder="Property Title" className="input input-bordered w-full" />
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
                        <input required type="text" {...register("Location")} placeholder="Location" className="input input-bordered w-full" />
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
                        <input required type="text" {...register("Description")} placeholder="Description" className="input input-bordered w-full" />
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
                        <input required type="file" {...register("image")} placeholder="Image" className="" />
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
                        <input required readOnly type="text" defaultValue={user.displayName} {...register("AgentName")} placeholder="Agent Name" className="input input-bordered w-full" />
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
                        <input required type="number" {...register("minPrice")} placeholder="Minimum Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Maximum Price</span>
                    </label>
                    <label className="input-group">
                        <input required type="number" {...register("maxPrice")} placeholder="Maximum Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>
          


            </div>  



        </div>


            {/* Add Button */}
            {/* <input type="submit" value="Add Property" className="btn text-white btn-block bg-[#D4AF37]" /> */}
            {isSubmitting? (
          <div className='flex flex-col justify-center items-center'>
            <span className="loading loading-spinner loading-sm"></span> 
            </div>
        ): (role !== 'fraud' && <input type="submit" value="Add Property" className="btn text-white btn-block bg-black" />)
    }
        </form>
    </div>
    
    );
};

export default AddProperty;