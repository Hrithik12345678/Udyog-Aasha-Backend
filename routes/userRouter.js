const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl"); // importing userCtrl from controllers

router.post("/createprofile", userCtrl.createprofile);  // Post route of createprofile
router.post("/googlelogin", userCtrl.googlelogin);
router.post("/emaillogin", userCtrl.emaillogin);     // Post route of googlelogin
router.post("/getdata", userCtrl.getdata);
router.post("/add_address", userCtrl.add_adress);
router.post("/update_address", userCtrl.update_address);
router.post("/get_address", userCtrl.get_address);
router.post("/forgetpassword", userCtrl.forgetpassword);
router.post("/updatepassword", userCtrl.updatepassword);


module.exports = router;
