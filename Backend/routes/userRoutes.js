const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/userController');
const { singleAdminCheck } = require('../middlewares/authMiddleware');

router.post('/register', singleAdminCheck, registerUser);
router.post('/login', loginUser);

module.exports = router;