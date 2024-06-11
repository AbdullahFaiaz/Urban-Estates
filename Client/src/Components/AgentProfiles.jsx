import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hook/useAxiosPublic";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import 'swiper/css/free-mode';
// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import { Typewriter } from "react-simple-typewriter";


const AgentProfiles = () => {

    const axiosPublic = useAxiosPublic()
    const {data: Agents=[], refetch, isLoading} = useQuery({
        queryKey: ['allAgentProfilesGeneralQuery'],
        queryFn: async () => {
            const res = await axiosPublic.get("/agentProfiles")
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
    <h2 className="text-[37px] lg:text-[37px] text-[hsl(180,6%,15%)] font-bold">  A<Typewriter
words={['gent Profiles']}
loop={50}
typeSpeed={100}
deleteSpeed={60}
delaySpeed={2000}
/></h2>
<div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>
</div>
            
            
            
            
            <div>


            <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        centeredSlides={false}
        autoplay={{
          delay: 2300,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
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

        navigation={true}
        modules={[FreeMode,Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
            {
                Agents?.map(agent=>
                    <SwiperSlide  key={agent?._id}>
                <div className="flex flex-col items-center relative mb-[50px] w-72 mx-auto rounded overflow-hidden shadow-lg">
                    {/* <img src={agent?.Image} alt={agent.name} className="w-full h-[30vw] md:h-[22vw] lg:h-[16vw] object-cover" /> */}
                    <div className="avatar">
  <div className="w-48 mask mask-parallelogram">
    <img src={agent?.Image} />
  </div>
</div>
                    <div className="px-[2vw]">
                       
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Name: </span> {agent.name}
                        </p>
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Email: </span> {agent.email}
                        </p>    
                        <p className="text-[8px] md:text-[15px]">
                            <span className="font-semibold">Role:</span> {agent.role}
                        </p>             
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

export default AgentProfiles;