import { Job } from "../models/job.model.js";
// admin post krega job
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary,location,jobtype, experience,position,companyId } = req.body;
    const userId = req.id; // logged in user id
    if(!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId){
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    };
      const job = await Job.create({
        title,
        description,
        requirements : requirements.split(","),
        salary :Number(salary),
        location,
        
        jobtype,
        experienceLevel:experience,
        position,
        company: companyId,
        created_by: userId,
      });
      return res.status(201).json({
        message: "Job created successfully",
        job,
        success: true,
        
      });
  
  } catch (error) {
    console.log(error);
  }
}
// student job apply krega
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ]
    };
      const jobs = await Job.find(query).populate({
        path:"company"
      }).sort({createdAt:-1})
        if(!jobs){
          return res.status(404).json({
            message: "No jobs found",
            success: false,
          });
        };
        return res.status(200).json({
          jobs,
          success: true,
        });
      } catch (error) {
    console.log(error);
  }
}
// get all jobs by company id for student
export const getJobById = async (req, res) => { 
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });
    if(!job){
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
// admin kitne job create kiye
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // logged in user id
    const jobs = await Job.find({ created_by: adminId}).populate({  
      path: "company",
      createdAt: -1
    });
    if(!jobs){
      return res.status(400).json({
        message: "No jobs found",
        success: false,
      });
    };
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}