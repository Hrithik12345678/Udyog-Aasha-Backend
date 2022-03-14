const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const paymentControler = require("../controllers/paymentControler");
const prod_reviewCtrl = require("../controllers/prod_reviewCtrl");

router.post("/product", productCtrl.product);
router.post("/Getproduct", productCtrl.Getproduct);
router.get("/Details/:id", productCtrl.Details);
router.get("/Recommended/:id", productCtrl.Recommended);
router.get("/Popular/:id", productCtrl.Popular);
router.get("/Live/:id", productCtrl.Live);
router.get("/Delete/:id", productCtrl.Delete);
router.post("/reviewcheck", paymentControler.checkPaid_product);
router.post("/review", prod_reviewCtrl.saveReview);
router.post("/reviewvalidate", prod_reviewCtrl.checkReview);
router.post("/checkproduct", productCtrl.check);

module.exports = router;
