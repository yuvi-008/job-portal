import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Phone, FileText, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import AppliedJobTable from "./AppliedJobTable";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-700/90 border border-gray-600 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 ring-4 ring-gray-500">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback className="text-2xl font-bold bg-gray-600 text-white">
                      {user?.fullname?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{user?.fullname}</h1>
                    <p className="text-lg text-gray-300 mb-4">{user?.profile?.bio || "Tech Enthusiast"}</p>
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <span>{user?.profile?.phoneNumber || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsUpdateProfileOpen(true)}
                  variant="outline"
                  className="bg-transparent border-2 border-gray-500 text-gray-200 hover:bg-gray-600 hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user?.profile?.skills?.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-600/70 text-white border border-gray-500 px-4 py-2 text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      {skill}
                    </Badge>
                  )) || (
                    <>
                      <Badge className="bg-gray-600/70 text-white border border-gray-500 px-4 py-2 text-sm font-medium">HTML</Badge>
                      <Badge className="bg-gray-600/70 text-white border border-gray-500 px-4 py-2 text-sm font-medium">CSS</Badge>
                      <Badge className="bg-gray-600/70 text-white border border-gray-500 px-4 py-2 text-sm font-medium">JavaScript</Badge>
                      <Badge className="bg-gray-600/70 text-white border border-gray-500 px-4 py-2 text-sm font-medium">React</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Resume Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Resume
                </h3>
                <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {user?.profile?.resume || "resume.pdf"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Jobs Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-700/90 border border-gray-600 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-gray-500 pb-3">Applied Jobs</h2>
              {allAppliedJobs && allAppliedJobs.length > 0 ? (
                <AppliedJobTable appliedJobs={allAppliedJobs} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300 text-lg">No jobs applied yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start applying to jobs to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileDialog
        isOpen={isUpdateProfileOpen}
        onClose={() => setIsUpdateProfileOpen(false)}
      />
    </div>
  );
};

export default Profile;
