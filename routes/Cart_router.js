const router = require("express").Router();

const Cart_ctrl = require("../controllers/Cart_Ctrl");

router.post("/GetCart",Cart_ctrl.getCart);
router.post("/SaveCart",Cart_ctrl.saveCart);
router.post("/remove",Cart_ctrl.DeleteCart);
router.post("/removeall",Cart_ctrl.DeleteCart_all);

module.exports = router;