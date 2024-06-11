import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="bg-cover text-[8px] lg:text-[4px] bg-bottom relative py-12 md:py-16 lg:py-20 bg-black">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="mx-auto px-[3vw] lg:px-[6vw] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6vw]">
                    {/* Website Name */}
                    <div className="flex flex-col items-center lg:items-start justify-center">
                        <h3 className="text-white text-[18px] mg:text-[22px] lg:text-[32px] font-bold mb-4">Urban Estates</h3>
                        <p className="text-gray-300 text-[12px] mg:text-[12px] lg:text-[20px]">Explore the world with us!</p>
                    </div>
                    {/* Contact Information */}
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-white text-[12px] mg:text-[12px] lg:text-[20px] font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-300 text-[12px] mg:text-[12px] lg:text-[20px]">Email:info@adventureavenue.com</p>
                        <p className="text-gray-300 text-[12px] mg:text-[12px] lg:text-[20px]">Phone: +1234567890</p>
                    </div>
                    {/* Social Media Links */}
                    <div className="flex justify-center items-center gap-4 md:gap-6">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[15px] lg:text-[20px] p-3 rounded-full text-blue-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[15px] lg:text-[20px] p-3 rounded-full text-blue-400 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[15px] lg:text-[20px] p-3 rounded-full text-pink-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[15px] lg:text-[20px] p-3 rounded-full text-blue-700 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
                {/* Copyright */}
                <div className="mt-8 text-center">
                    <p className="text-gray-300 text-[12px] mg:text-[12px] lg:text-[20px]">© 2024 Urban Estates. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
