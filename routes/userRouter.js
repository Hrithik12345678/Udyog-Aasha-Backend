const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.post("/createprofile", userCtrl.createprofile);
router.get("/refresh_token", userCtrl.refresh_Token);
router.post("/googlelogin", userCtrl.googlelogin);

module.exports = router;
