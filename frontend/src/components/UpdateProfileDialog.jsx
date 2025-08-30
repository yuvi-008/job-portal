import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    bio: user?.profile?.bio || "",
    phoneNumber: user?.profile?.phoneNumber || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/updateprofile`,
        {
          ...formData,
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-700/95 border border-gray-600 shadow-2xl backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Update Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white font-medium">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 rounded-lg h-11 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Bio</Label>
            <Input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 rounded-lg h-11 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 rounded-lg h-11 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Skills (comma separated)</Label>
            <Input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., HTML, CSS, JavaScript, React"
              className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 rounded-lg h-11 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-2 border-gray-500 text-gray-200 hover:bg-gray-600 hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
            >
              Cancel
            </Button>
            {loading ? (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
              </Button>
            ) : (
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Update Profile
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
