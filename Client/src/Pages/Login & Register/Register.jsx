import { useContext, useState } from "react";
import { Social } from '../../Components/Social';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
  

  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();



  const {setUser} = useContext(AuthContext)










  //auth context
  const authInfo = useContext(AuthContext);
  const { createUser, updateUserProfile, setLoading,googleLogIn, githubLogIn, } = authInfo;
  //show pass
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //on submit
  const onSubmit = async (data) => {
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log("image" ,res.data)
    const photoURL = res.data.data.display_url
    const { email, password, displayName } = data;
    console.log(data);
    //create user

    // Password validation
    const uppercaseRegex = /[A-Z]/;
    // const lowercaseRegex = /[a-z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;



    if (
      !uppercaseRegex.test(password) ||
      !specialCharacterRegex.test(password) ||
      password.length < 6
    ) {
      // Show error toast
      toast.error(
        "Password must contain at least one special character, one uppercase letter, and be at least 6 characters long"
      );
      return;
    }
  // If password is valid, proceed with registration
  createUser(email, password)
  .then((result) => {
    // Assuming updateUserProfile returns a promise
    return updateUserProfile(displayName, photoURL)
      .then(() => {

      // creating a user in database
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        Image:result.user?.photoURL,
        role: 'user'
      }
        axiosPublic.post('/users', userInfo)
        .then( res => {
          if(res.data.insertedId){
            setUser({ ...result?.user, displayName, photoURL });
            navigate("/");
            // Show toast notification after a slight delay
            setTimeout(() => {
              toast.success("Registered Successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 1000);

          }
        })


      })
      .catch((error) => {
        // Handle errors from updateUserProfile
        console.error('Error updating user profile:', error);
        toast(error.message);
        setLoading(false);
      });
  })
  .catch((error) => {
    // Handle errors from createUser
    console.error('Error creating user:', error);
    toast(error.message);
    setLoading(false);
  });

  };

    //google regis
    const handleGoogleLogIn = () => {
      googleLogIn()
      .then((result) => {
        setLoading(false)
        console.log(result.user);
      // creating a user in database
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        Image:result.user?.photoURL,
        role: 'user'
      }
        axiosPublic.post('/users', userInfo)
        .then(res=> {
          console.log(res?.data)
          navigate(location?.state ? location.state : "/");
          setTimeout(() => {
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 1000);
        })
        
        
      })
        .catch((error) => {
          toast(error.message);
          setLoading(false);
        });
    };
  
    //github log in
    const handleGithubLogIn = () => {
      githubLogIn()
      .then((result) => {
        setLoading(false)
        console.log(result.user);
      // creating a user in database
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        Image:result.user?.photoURL,
        role: 'user'
      }
        axiosPublic.post('/users', userInfo)
        .then(res=> {
          console.log(res?.data)
          navigate(location?.state ? location.state : "/");
          setTimeout(() => {
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 1000);
        
        })


      })
        .catch((error) => {
          toast(error.message);
          setLoading(false);
        });
    };

  return (
    <div className="flex flex-col md:flex-row gap-14 justify-center items-center py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Urban Estates | Register</title>
      </Helmet>
      {/* <ToastContainer /> */}
      <ToastContainer></ToastContainer>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full md:w-[80%] lg:w-[70%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control">
            <label className="label text-gray-800">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("displayName", { required: true })}
            />
            {errors.displayName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-8">
                <div className="form-control w-full">
                <label className="label">
                        <span className="text-gray-700 label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input required placeholder="Image Upload"  className="input input-bordered w-full" type="file" {...register("image", { required: true })} />
                    </label>
                </div>
                {errors.image && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            </div>

          {/* <div className="form-control">
            <label className="label text-gray-800">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("photoURL", { required: true })}
            />
            {errors.photoURL && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div> */}

   

          <div className="form-control">
            <label className="label text-gray-800">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label text-gray-800">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
                {...register("password", { required: true })}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 font-extrabold"
                onClick={handleShowPass}
              >
                {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
  
          </div>

          <div className="form-control mt-4">
            <button className="w-full h-11 rounded-lg hover:bg-slate-900 text-white bg-black transition duration-300">
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Log In
          </Link>
        </p>
      </div>
      <Social   handleGoogleLogIn={handleGoogleLogIn} handleGithubLogIn={handleGithubLogIn}  />
    </div>
  );
};

export default Register;
