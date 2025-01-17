const express=require('express')
const makePayment = require('../controllers/payment/payment_controller')
const router=express.Router()

router.post('/makepayment',makePayment);

module.exports=router