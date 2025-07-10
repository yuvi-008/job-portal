import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const {user}= useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname ,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map(skill=>skill),
    file:user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] ;
    setInput({ ...input, file });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }


    } catch(error){
      console.log(error);
      toast.error(error.response.data.message);

    } finally{
      setLoading(false);
    }
    setOpen(false);
    console.log(input);

    console.log(input);
  }



  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="name" className="text-right ">
                  Name
                </Label>
                <Input id="name" name="name" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="email" className="text-right ">
                  Email
                </Label>
                <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="number" className="text-right ">
                  Number
                </Label>
                <Input id="number" name="number" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="bio" className="text-right ">
                  Bio
                </Label>
                <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="skills" className="text-right ">
                  Skills
                </Label>
                <Input id="skills" name="skills" type="text" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlfor="file" className="text-right ">
                  Resume
                </Label>
                <Input id="file" name="file"  type="file" onChange={changeFileHandler} accept="application/pdf" className="col-span-3" />
              </div>
              
            </div>
            <DialogFooter>
              
                 {loading ? (
                  <Button>
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait{" "}
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                )}

              
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
