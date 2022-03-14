const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl"); 

router.post("/login", adminCtrl.login);


module.exports = router;