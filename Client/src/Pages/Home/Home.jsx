
import { About } from './About';


import BannerSlider from "../../Components/BannerSlider";

import { Helmet } from "react-helmet-async";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Advertisement from '../../Components/Advertisement';
import LatestReview from '../../Components/LatestReview';
import AgentProfiles from '../../Components/AgentProfiles';

// ..
AOS.init();





const Home = () => {




    return (
        <>
        <Helmet>
            <title>Urban Estates | Home</title>
        </Helmet>
                        

    <ToastContainer></ToastContainer>







    <div className="relative">
    <BannerSlider></BannerSlider>
    </div>

    {/* advertisement section */}
        <Advertisement/>
    {/* latest user review section */}

        <LatestReview/>

{/* Agent Profiles Section */}

<AgentProfiles/>

    <About/>






</>
    );
};

export default Home;