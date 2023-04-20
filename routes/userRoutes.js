const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/').get(userController.getAllUsers)

router
    .route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/:id/rate').patch(userController.rateChef)

module.exports = router