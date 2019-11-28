const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const tweetsController = require('../controllers/tweets.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const uploadCloud = require('../config/cloudinary.js'); //librery cloudinary

module.exports = router;

router.get('/', authMiddleware.isAuthenticated, tweetsController.index)
router.get('/tweets/:id', authMiddleware.isAuthenticated, tweetsController.show)
router.post('/tweets/:id/comments', authMiddleware.isAuthenticated, tweetsController.addComment)
router.post('/tweets/:id/like', authMiddleware.isAuthenticated, tweetsController.like)
router.post('/tweets', authMiddleware.isAuthenticated, uploadCloud.single('image'), tweetsController.create)

router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
router.post('/users', authMiddleware.isNotAuthenticated, uploadCloud.single('avatar'), usersController.create) //upload image library cloudinary
router.get('/users/:token/validate', usersController.validate)

router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

router.get('/:username', authMiddleware.isAuthenticated, tweetsController.profile)
