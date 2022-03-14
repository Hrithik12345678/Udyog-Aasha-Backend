const router = require("express").Router();
const trainctrl = require("../controllers/train_ctrl");
const reviewCtrl = require("../controllers/reviewCtrl");
const paymentControler = require("../controllers/paymentControler");

router.post("/training", trainctrl.training);
router.post("/Gettraining", trainctrl.GetTraining);
router.get("/Details/:id", trainctrl.Details);
router.get("/Recommended/:id", trainctrl.Recommended);
router.get("/Popular/:id", trainctrl.Popular);
router.get("/Live/:id", trainctrl.Live);
router.get("/Delete/:id", trainctrl.Delete);
router.post("/review", reviewCtrl.saveReview);
router.post("/reviewcheck", paymentControler.checkPaid_training);
router.post("/reviewvalidate", reviewCtrl.checkReview);
router.post("/checkproduct", trainctrl.check);
router.post("/posttrain", trainctrl.posttrain);

module.exports = router;
