const express = require("express");
const paymentControler = require("../controllers/paymentControler");
const router = express.Router();

router.post("/createorder", paymentControler.createOrder);
router.post("/payment/callback", paymentControler.paymentCallback);
router.post("/payments/:paymentId", paymentControler.getPayment);
router.post("/Courses", paymentControler.Enrolled_Courses);


module.exports = router;
