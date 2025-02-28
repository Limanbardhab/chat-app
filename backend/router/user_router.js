const express = require("express");
const router = express.Router();
const {user_register,user_login,alluser}= require('../controllers/userController.js');
const { protect } = require("../middleware/authMiddleware.js");

router.route('/').post(user_register).get(protect,alluser);
router.route('/login').post(user_login);



module.exports = router;
