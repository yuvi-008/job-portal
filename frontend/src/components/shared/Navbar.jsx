import React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch , useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import Profile from "../Profile";

const Navbar = () => {
  
  const {user}= useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () =>{
    try{
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }

    } catch (error){
      console.log(error);
      toast.error(error.response.data.message);

    }
  }
  return (
    <div className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job <span className="text-blue-400">Hub</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-gray-300">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies" className="hover:text-blue-400 transition-colors">Companies</Link></li>
                  <li><Link to="/admin/jobs" className="hover:text-blue-400 transition-colors">Jobs</Link></li>
                
                </>


              ) : (

                <>
                 <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>  </li>
                <li><Link to="/jobs" className="hover:text-blue-400 transition-colors">Jobs</Link></li>
                <li><Link to="/browse" className="hover:text-blue-400 transition-colors">Browse</Link></li>

                </>
              )
            }
           
            
            
          </ul>
          
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login"><Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">Login</Button></Link>
              <Link to = "/signup"><Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">Signup</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-gray-600 hover:ring-blue-400 transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-800 border-gray-600">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-5 text-gray-400 mt-4">
                  {
                    user && user.role === 'student' && (
                      <div className="flex  w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="Link" className="text-blue-400 hover:text-blue-300 p-0 h-auto"><Link to="/profile">View Profile</Link></Button>
                  </div>

                    )
                  }



                  
                  <div className="flex  w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="Link" className="text-red-400 hover:text-red-300 p-0 h-auto">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
