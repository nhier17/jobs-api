

const getAllJobs = async (req,res)=> {
res.send('get all jobs')
}

const getJob = async (req,res)=> {
  res.send('get a single job')
 }

const createJobs = async (req,res)=> {
   res.send(req.user)
 }
const updateJobs = async (req,res)=> {
  res.send('update  jobs')
  }
const deleteJob = async (req,res)=> {
  res.send('delete a job')
  }        
  module.exports = {
    getAllJobs,
    getJob,
    createJobs,
    updateJobs,
    deleteJob,
  }