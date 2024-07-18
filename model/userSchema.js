//import mongoose
const mongoose=require('mongoose')
const validators=require('validator')

//define schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    district:{
        type:String,
        
    },
    u_image:{
        type:String,
        required:true


    },
    gender:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validators.isEmail,'Invalid Email']
    },

    password:{
        type:String,
        required:true,

    }
})

const users=mongoose.model('users',userSchema)

module.exports=users