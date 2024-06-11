import { useContext } from "react";

import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";
import useRole from "../../Hook/useRole";


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [role] = useRole()
    return (
        <div className="w-full min-h-screen bg-white text-gray-800 py-12">
            <Helmet>
                <title>Urban Estates | User Profile</title>
            </Helmet>

            <div className="text-center py-[35px]">
    <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold"> Profile
</h2>
<div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>
</div>
            <div className="max-w-3xl mx-auto px-4">
                {/* Profile Picture */}
                <div className="flex justify-center items-center mb-8">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/sV6w5ct/Vecteezy-illustration-of-human-icon-vector-user-symbol-icon-modern-8442086.jpg"}
                        alt="User Profile Picture"
                        className="h-64 w-64 rounded-full object-cover shadow-lg"
                    />
                </div>
                
                {/* Profile Details */}
                <div className="bg-gray-100 rounded-lg shadow-lg p-8">
                    <div className="text-3xl font-semibold mb-6 text-center">User Profile</div>
                    <div className="mb-4">
                        <div className="text-3xl font-semibold mb-6">{user?.displayName || "Name not found"}</div>
                    </div>
                    <div className="flex gap-5">
                        <div className="text-xl font-semibold mb-2">Email:</div>
                        <div className="text-xl">{user?.email || "Email not found"}</div>
                    </div>
                    {role!=='user' && 
                                    <div className="flex gap-5">
                                        <div className="text-xl font-semibold mb-2">Role:</div>
                                        <div className="text-xl">{role}</div>
                                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
