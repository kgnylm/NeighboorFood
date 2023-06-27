const express = require('express')
const adminController = require('./../controllers/adminController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/').post(adminController.createAdmin)
router.route('/applications').get(adminController.getAllApplications)

module.exports = router
