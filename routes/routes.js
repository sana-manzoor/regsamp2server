//import express
const express=require('express')


//import controller function to resolve requests
const usercontroller=require('../controller/userController')


//multer import
const multerConfig=require('../middlewares/usermiddleware')
const jwtMiddleware=require('../middlewares/jwtMiddlewares')
const multer = require('multer')

//create object for router class in express
const router=new express.Router()


//define various paths
router.post('/user/register',multerConfig.single('u_image'),usercontroller.register)
router.post('/user/login',usercontroller.login)

router.put('/user/edit/:id',multerConfig.single('u_image'),usercontroller.editUser)

module.exports=router