
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AppliedJobTable = ({ appliedJobs }) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption className="text-gray-400">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className="border-gray-600 hover:bg-gray-600/50 transition-colors">
            <TableHead className="text-white font-semibold">Date</TableHead>
            <TableHead className="text-white font-semibold">Job Role</TableHead>
            <TableHead className="text-white font-semibold">Company</TableHead>
            <TableHead className="text-white font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs?.map((job, index) => (
            <TableRow key={index} className="border-gray-600 hover:bg-gray-600/50 transition-colors">
              <TableCell className="text-gray-200 font-medium">
                {new Date(job?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-gray-200 font-medium">{job?.job?.title}</TableCell>
              <TableCell className="text-gray-200 font-medium">{job?.job?.company?.name}</TableCell>
              <TableCell>
                <Badge 
                  className={`px-3 py-1 font-medium ${
                    job?.status === 'ACCEPTED' 
                      ? 'bg-green-500/30 text-green-300 border border-green-400/50' 
                      : job?.status === 'REJECTED'
                      ? 'bg-red-500/30 text-red-300 border border-red-400/50'
                      : 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/50'
                  }`}
                >
                  {job?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable