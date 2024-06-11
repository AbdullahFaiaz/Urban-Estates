import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";



// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import 'swiper/css/free-mode';
// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';





const Advertisement = () => {


    const axiosPublic = useAxiosPublic()
    const {data: advertised=[], refetch, isLoading} = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allAdvertisedProperties`)
            return res.data
        }
    })

    if(isLoading){
        return(

            <div className='flex flex-col w-full justify-center items-center'>
            <span className="size-80 loading loading-ball loading-lg"></span> 
            </div>

        )
    }


    return (
        <div className="py-[35px] pt-[70px] my-[30px]">

<div className="text-center py-[35px]">
    <h2 className="text-[37px] lg:text-[37px] text-[hsl(180,6%,15%)] font-bold">  A<Typewriter
words={['dvertised Properties']}
loop={50}
typeSpeed={100}
deleteSpeed={60}
delaySpeed={2000}
/></h2>
<div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>
</div>

            <div className="">
            <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        centeredSlides={false}
        autoplay={{
          delay: 2300,

          disableOnInteraction: false,
        }}
        breakpoints={
            {
                300: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  }, 900: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1550: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
            }
        }

        

        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode,Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

{
        advertised.map(property =>  <SwiperSlide key={property?._id} >       <div className="relative mb-[50px] w-[300px] mx-auto rounded overflow-hidden shadow-lg">
        <img src={property.Image} alt={property.Title} className="w-[300px] h-[180px] object-cover" />
        <div className="px-[10px]">
            {/* <div className="font-bold text-[3.5vw] md:text-[1.5vw]">{property.Title}</div> */}
            <p className="text-[8px] md:text-[15px]">
                <span className="font-semibold">Location:</span> ${property.Location}
            </p>
            <p className="text-[8px] md:text-[15px]">
            <span className="font-semibold">Price Range</span> <br />
                <span className="">Minimum Price: </span>${property.minPrice} <br />
                <span className="">Maximum Price: </span>${property.maxPrice}
            </p>
            <p className="text-[8px] md:text-[15px]">
                <span className="font-semibold">Status:</span> {property.Status}
            </p>                
        </div>
        <div className="p-[10px]">
            <Link to={`/propertyDetails/${property._id}`}>
            <button  className="text-[8px] md:text-[15px] bg-black btn btn-sm text-white hover:text-black rounded">
                View Details
            </button>
            </Link>
        </div>
    </div>
    </SwiperSlide>
    )
    }

            </Swiper>
            </div>

        </div>
    );
};

export default Advertisement;