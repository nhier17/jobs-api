const express = require('express')
const router = express.Router()

const {
    getAllJobs, 
    getJob, 
    createJobs, 
    updateJobs, 
    deleteJob} = require('../Controllers/jobs')

    router.route('/').post(createJobs).get(getAllJobs)
    router.route('/:id').get(getJob).delete(deleteJob).patch(updateJobs)

    module.exports = router;
