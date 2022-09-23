const express = require('express')
const router = express.Router()

const {
    createJob,
    deleteJob,
    getAllJob,
    updateJob,
    getJob
} = require('../controllers/jobs')

router.route('/').get(getAllJob).post(createJob)
router.route('/').post(getJob).patch(updateJob).delete(deleteJob)

module.exports = router