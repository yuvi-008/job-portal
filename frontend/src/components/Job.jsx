import React, { use } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar,AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
 // const jobId  = "absfsrsyuvwxyz";
 const daysAgoFunction = (mongodbTime)=>{
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDiff = currentTime - createdAt;
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
 }
  return (
    <div className='p-6 rounded-2xl shadow-xl bg-gray-700/90 border border-gray-600 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm group'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm text-gray-300 bg-gray-600/70 px-3 py-1 rounded-full border border-gray-500/50'>{daysAgoFunction(job?.createdAt)==0 ? "today" :`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="ghost" className="rounded-full hover:bg-gray-600 text-gray-300 hover:text-blue-400 transition-all duration-200">
          <Bookmark className="h-5 w-5"/>
        </Button>
      </div>
      
      <div className='flex items-center gap-3 mb-4'>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <Avatar className="w-12 h-12 ring-2 ring-gray-500 group-hover:ring-blue-500 transition-all duration-200">
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-semibold text-lg text-white group-hover:text-blue-400 transition-colors'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-300'>India</p>
        </div>
      </div>
      
      <div className='mb-4'>
        <h1 className='font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors'>{job?.title}</h1>
        <p className='text-sm text-gray-200 line-clamp-2 leading-relaxed'>{job?.description}</p>
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
      
      <div className='flex items-center gap-3'>
        <Button 
          onClick={()=> navigate(`/description/${job?._id}`)} 
          variant="outline" 
          className="flex-1 bg-transparent border-2 border-gray-500 text-gray-200 hover:bg-gray-600 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 font-medium py-2"
        >
          View Details
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          Save Job
        </Button>
      </div>
    </div>
  )
}

export default Job
