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
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <div>
          <h1 className="text-2xl font-bold ">
            Job <span className="text-[#F83002]">Hub</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium itmes-center gap-4">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                
                </>


              ) : (

                <>
                 <li><Link to="/">Home</Link>  </li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>

                </>
              )
            }
           
            
            
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to = "/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-5 text-grey-600 ">
                  {
                    user && user.role === 'student' && (
                      <div className="flex  w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="Link"><Link to="/profile">View Profile</Link></Button>
                  </div>

                    )
                  }



                  
                  <div className="flex  w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="Link">Logout</Button>
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
