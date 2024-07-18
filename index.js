// to get env file while server is running,import dotenv
require('dotenv').config()

//import express.js
const express=require('express')

//import cors
const cors=require('cors')

//create express server
const regsamp=express()

//implementing cors to server
regsamp.use(cors())

//parsing json data using server app
regsamp.use(express.json())

//import router
const router=require('./routes/routes')


//import connection.js
require('./connection/dbconnection')

//import middleware
const middleware=require('./middlewares/umiddleware')
regsamp.use(middleware)

//use router to server
regsamp.use(router)

// port numver configuration
const PORT=4000 || process.env.PORT

//serving upload files
regsamp.use('/upload',express.static('./uploads'))


//to run server
regsamp.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`)
})

//resolve request to localhost:400
regsamp.get('/',(req,res)=>{
    res.send("<h1>Server is running successfully</h1>")
})

regsamp.post('/',(req,res)=>{
    res.send("<h1>Post Request Is successful</h1>")
})