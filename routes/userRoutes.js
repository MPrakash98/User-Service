var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware');

// Routes declared by express router object
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/profile', authMiddleware.checkLogin, userController.updateProfile);
router.get('/users', authMiddleware.checkLogin, userController.getUsersList);
router.delete('/users/:id', authMiddleware.checkLogin, userController.deleteUserById);
router.get('/search', authMiddleware.checkLogin, userController.filterUsersList);

module.exports = router;