const express = require('express')
const router = express.Router()
const {
    login,
    register,
    getUser,
    getUsers,
    deleteUser,
    getAnalytics,
    payStack
} = require('../controllers/userControllers')
const { authClient, authAdmin} = require('../middlewares/webToken')

router.post('/signup', register)
router.post('/login', login)
router.get('/user/:email',authAdmin, getUser)
router.get('/users',authAdmin, getUsers)
router.delete('/delete/:id',authAdmin,deleteUser)
router.get('/analytics',authAdmin, getAnalytics)
router.get('/paystack/verify/:refNo',authClient, payStack)

module.exports = router