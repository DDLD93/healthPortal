const express = require('express')

const router = express.Router()
const {
    newform,
    forms,
    form,
} = require('../controllers/formController')
const { authClient, authAdmin} = require('../middlewares/webToken')




router.get('/forms',authAdmin, forms)
router.get('/form/:email',authClient, form)


module.exports = router