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
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)==0 ? "today" :`${daysAgoFunction(job?.createdAt)} days ago`}</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>

      </div>
      
      <div className='flex items-center gap-1 my-2'>
      <Button>
        <Avatar>
          <AvatarImage src={job?.company?.logo}/>
        </Avatar>
      </Button>
      <div>
        <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>

      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm tetx-gray-600'>{job?.description}</p>
      </div>
      <div className = "flex items-center gap-2 mt-4">
           <Badge className= {"text-blue-700 font-bold"} variant="ghost">{job?.position}</Badge>
           <Badge className= {"text-[#F83002] font-bold"} variant="ghost">{job?.jobtype}</Badge>
           <Badge className= {"text-[#7209b7] font-bold"} variant="ghost">{job?.salary}</Badge>
     
           </div >
       <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
       </div>
    </div>
  )
}

export default Job
