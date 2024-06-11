
// export function About() {
//   return <section className="py-[6vw] px-[3.3vw] lg:px-[14vw] text-[3.5vw] lg:text-[2vw] text-[#559595]">
//   <div className="text-center">
//     <h2 className="text-[4.3vw] lg:text-[3vw] text-[hsl(180,55%,37%)] font-bold mb-4">About Us</h2>
//     <p className="mb-8">Embark on unforgettable journeys with us</p>
//     <div className="flex justify-center mb-12">
//       <div className="w-16 h-1 bg-[#292925] rounded-full"></div>
//     </div>
//     <p className="leading-relaxed">
//       At Volunteer Hub, we're passionate about travel and exploration. Our mission is to help you uncover the world's hidden gems and create unforgettable memories.
//     </p>
//     <p className=" leading-relaxed mt-4">
//       Whether you're seeking adrenaline-pumping adventures, tranquil retreats, or cultural immersions, we've got you covered. Our team of seasoned travelers meticulously curates each experience to ensure authenticity, excitement, and comfort.
//     </p>
//     <p className=" leading-relaxed mt-4">
//       Join us on a journey of discovery as we traverse the globe, one destination at a time. Let Volunteer Hub be your trusted companion in exploration.
//     </p>
//     <div className="flex justify-center mt-12">

import { Typewriter } from "react-simple-typewriter";

     
//     </div>
//   </div>
//   </section>;
// }
export function About() {
  return <section className="mb-[30px] py-[30px] px-[40px] lg:px-[300px] text-[15px] lg:text-[15px] text-[#131717]">
  <div className="text-center">
    <h2 className="text-[37px] lg:text-[37px] text-[hsl(180,6%,15%)] font-bold">  A<Typewriter
words={['bout Us']}
loop={50}
typeSpeed={100}
deleteSpeed={60}
delaySpeed={2000}
/></h2>

  <div className="w-[60%] mx-auto mb-4"><hr /></div>
    <p className=" text-[20px] lg:text-[20px]">Urban Estates</p>
    <p className="mb-8  text-[17px] lg:text-[17px]">Your gateway to premium urban living</p>
    <div className="flex justify-center mb-12">
      <div className="w-16 h-1 bg-[#292925] rounded-full"></div>
    </div>
    <p className="leading-relaxed">
      Urban Estates is a leading real estate and property management company with a passion for connecting people with their dream urban homes. Our mission is to simplify your property search and make finding your perfect urban home an enjoyable journey.
    </p>
    <p className=" leading-relaxed mt-4">
      From modern apartments in the heart of the city to luxurious villas in serene urban neighborhoods, we offer a diverse portfolio of properties to suit every lifestyle. Our experienced team of real estate professionals is dedicated to providing a seamless and personalized service.
    </p>
    <p className=" leading-relaxed mt-4">
      With Urban Estates, you're not just finding a property, you're discovering your new home in the urban landscape. Experience the Urban Estates difference today.
    </p>
    <div className="flex justify-center mt-12">
     
    </div>
  </div>
</section>

}