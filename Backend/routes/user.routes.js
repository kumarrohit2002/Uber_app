const express=require('express');
const {body}=require('express-validator');
const router= express.Router();

const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invaild Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters')
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters')
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser);


module.exports=router;

