import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";

import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input,setInput] = useState({
    fullname:"",
    email: "",
    phoneNumber: "",
    password:"",
    role: "",
    file:"",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }
  const changeFileHandler = (e) => {
    setInput({...input,file:e.target.files?.[0]});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      dispatch(setLoading(true));

    const response = await axios.post(`${USER_API_END_POINT}/register`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log("API Response:", response); // 👈 add this!
    if (response.data.success){
      navigate("/login");
      toast.success(response.data.message);;
    }
    
  }
  catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Join JobHub and start your journey</p>
            </div>
            
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white font-medium">Full Name</Label>
                <Input 
                  type="text" 
                  value={input.fullname}
                  name = "fullname"
                  onChange = {changeEventHandler}
                  placeholder="Enter your full name" 
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 rounded-lg h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-medium">Email</Label>
                <Input 
                  type="email"
                  value={input.email}
                  name = "email"
                  onChange = {changeEventHandler}
                  placeholder="Enter your email" 
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 rounded-lg h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-medium">Phone Number</Label>
                <Input 
                  type="text" 
                  value={input.phoneNumber}
                  name = "phoneNumber"
                  onChange = {changeEventHandler}
                  placeholder="Enter your phone number" 
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 rounded-lg h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-medium">Password</Label>
                <Input 
                  type="password"
                  value={input.password}
                  name = "password"
                  onChange = {changeEventHandler}
                  placeholder="Enter your password" 
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 rounded-lg h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-white font-medium">Role</Label>
                <RadioGroup className="flex items-center gap-8">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role==='student'}
                      onChange={changeEventHandler}
                      className="cursor-pointer text-blue-500 border-gray-600"
                    />
                    <Label htmlFor="option-one" className="text-gray-300 cursor-pointer hover:text-blue-400 transition-colors">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role==='recruiter'}
                      onChange={changeEventHandler}
                      className="cursor-pointer text-blue-500 border-gray-600"
                    />
                    <Label htmlFor="option-two" className="text-gray-300 cursor-pointer hover:text-blue-400 transition-colors">Recruiter</Label>
                  </div>
                </RadioGroup>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium">Profile Photo</Label>
                  <Input 
                    accept="image/*" 
                    type="file" 
                    onChange = {changeFileHandler}
                    className="cursor-pointer bg-gray-700 border-gray-600 text-gray-300 rounded-lg h-12 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all duration-200" 
                  />
                </div>
              </div>
              
              {loading ? (
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Create Account
                </Button>
              )}
            
              <div className="text-center pt-4">
                <span className="text-gray-400">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign in</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
