const Jobs = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res)=> {
  //use find for filtering
const jobs = await Jobs.find({createdBy:req.user.userId}).sort('createdAt')
res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async (req,res)=> {
  const {user:{userId},params:{id:jobId}} = req
  const job = await Jobs.findOne({
    _id:jobId, createdBy:userId
  })
  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
 }

const createJobs = async (req,res)=> {
  // create jobs
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body)
   res.status(StatusCodes.CREATED).json({ job })
 }

const updateJobs = async (req,res)=> {
  const {
    body:{company,position},
     user: {userId},
      params:{id:jobId}
    } = req
if (company === "" || position === "") {
  throw new BadRequestError('Company or position fields cannot be empty')
}
const job = await Jobs.findByIdAndUpdate({_id:jobId, createdBy:userId},req.body, {new:true,
  runValidators: true}
  )
  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })

  }
const deleteJob = async (req,res)=> {
  const {
      user: {userId},
      params:{id:jobId}
    } = req
  const job = await Jobs.findByIdAndDelete({
    _id:jobId,
    createdBy:userId
  })
  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()

  }        
  module.exports = {
    getAllJobs,
    getJob,
    createJobs,
    updateJobs,
    deleteJob,
  }