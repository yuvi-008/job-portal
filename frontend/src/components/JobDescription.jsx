import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import Navbar from "./shared/Navbar";
import { Loader2, MapPin, Calendar, DollarSign, Users, FileText } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(true);

  // Fetch single job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications?.some(app => app.applicant === user?._id) || false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job details");
      } finally {
        setJobLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-white text-lg">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-700/90 border border-gray-600 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20 ring-4 ring-gray-500">
                <AvatarImage src={singleJob?.company?.logo} />
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{singleJob?.title}</h1>
                <p className="text-xl text-gray-300 mb-2">{singleJob?.company?.name}</p>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{singleJob?.location || "India"}</span>
                </div>
              </div>
            </div>
            {isApplied && (
              <Badge className="bg-green-500/30 text-green-300 border border-green-400/50 px-4 py-2 text-lg font-medium">
                Already Applied
              </Badge>
            )}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Badge className="bg-blue-500/30 text-blue-300 border border-blue-400/50 font-medium px-4 py-2 text-base">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-red-500/30 text-red-300 border border-red-400/50 font-medium px-4 py-2 text-base">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-500/30 text-purple-300 border border-purple-400/50 font-medium px-4 py-2 text-base">
              {singleJob?.salary || "Not specified"}
            </Badge>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-500 pb-2">Job Description</h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">{singleJob?.description}</p>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Role</h3>
              </div>
              <p className="text-gray-200">{singleJob?.position}</p>
            </div>
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Location</h3>
              </div>
              <p className="text-gray-200">{singleJob?.location}</p>
            </div>
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Experience</h3>
              </div>
              <p className="text-gray-200">{singleJob?.experience || "Not specified"}</p>
            </div>
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Salary</h3>
              </div>
              <p className="text-gray-200">{singleJob?.salary || "Not specified"}</p>
            </div>
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Total Applicants</h3>
              </div>
              <p className="text-gray-200">{singleJob?.applications?.length || 0}</p>
            </div>
            <div className="bg-gray-600/50 border border-gray-500 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Posted Date</h3>
              </div>
              <p className="text-gray-200">{new Date(singleJob?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="text-center">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied || loading}
              className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Applying...
                </>
              ) : isApplied ? 'Already Applied' : 'Apply for this Job'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
