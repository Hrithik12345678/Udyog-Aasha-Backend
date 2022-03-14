const express = require("express");
const router = express.Router();
const serviceCtrl = require("../controllers/serviceCtrl");
const paymentControler = require("../controllers/paymentControler");


router.post("/apply", serviceCtrl.apply);
router.post("/getservices", serviceCtrl.getservices);
router.post("/unverified", serviceCtrl.unverified);
router.post("/servdata", serviceCtrl.service_data);
router.post("/servid", serviceCtrl.service_id);
router.post("/subservdata", serviceCtrl.sub_service_data);
router.post("/checkservice", paymentControler.checkPaid_services);


module.exports = router;
