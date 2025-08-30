import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-xl shadow-lg bg-gray-700/90 border border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-300 bg-gray-600/70 px-3 py-1 rounded-full border border-gray-500/50">
          {daysAgoFunction(job?.createdAt) == 0 ? "today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="ghost" className="rounded-full hover:bg-gray-600 text-gray-300 hover:text-blue-400 transition-all duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12 ring-2 ring-gray-500 group-hover:ring-blue-500 transition-all duration-200">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-300">India</p>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Badge className="bg-blue-500/30 text-blue-300 border border-blue-400/50 font-medium px-3 py-1">
          {job?.position}
        </Badge>
        <Badge className="bg-red-500/30 text-red-300 border border-red-400/50 font-medium px-3 py-1">
          {job?.jobtype}
        </Badge>
        <Badge className="bg-purple-500/30 text-purple-300 border border-purple-400/50 font-medium px-3 py-1">
          {job?.salary}
        </Badge>
      </div>

      <Button
        onClick={() => navigate(`/description/${job?._id}`)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        View Details
      </Button>
    </div>
  );
};

export default LatestJobCards
