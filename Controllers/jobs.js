const Jobs = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res)=> {
res.send('get all jobs')
}

const getJob = async (req,res)=> {
  res.send('get a single job')
 }

const createJobs = async (req,res)=> {
  // create jobs
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body)
   res.status(StatusCodes.CREATED).json({ job })
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