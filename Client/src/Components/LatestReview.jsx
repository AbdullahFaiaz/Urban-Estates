
import { useQuery } from "@tanstack/react-query";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import 'swiper/css/free-mode';
// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import useAxiosPublic from "../Hook/useAxiosPublic";
import { Typewriter } from "react-simple-typewriter";










const LatestReview = () => {



    const axiosPublicuseAxiosPublic =useAxiosPublic()
    const {data: reviews=[], refetch, isLoading} = useQuery({
        queryKey: ['latestUserReview'],
        queryFn: async () => {
            const res = await axiosPublicuseAxiosPublic.get(`/latestReview`)
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
        <div className="mb-[30px]">

            <div className="text-center py-[35px]">
    <h2 className="text-[37px] lg:text-[37px] text-[hsl(180,6%,15%)] font-bold">  L<Typewriter
words={['atest User Reviews']}
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
                reviews.map(review=> <SwiperSlide key={review?._id} > <div className="flex gap-2 items-center relative mb-[50px] w-80 p-2 mx-auto rounded overflow-hidden shadow-lg">





            <div className="avatar px-2 flex flex-col items-center">
            <div className="w-16 mask mask-squircle">
                <img src={review?.ReviewerImage} />
            </div>
            </div>



            <div className="">
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Name</span> ${review.ReviewerName}
                        </p>
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Description:</span> {review.Review}
                        </p>    
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Property Title:</span> {review.PropertyTitle}
                        </p>             
                </div>




                </div>
                </SwiperSlide>)
            }

            </Swiper>
            </div>

           







        </div>
    );
};

export default LatestReview;