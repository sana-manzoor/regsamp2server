
const users = require('../model/userSchema')

exports.register = async (req, res) => {
    console.log("Inside Register Function")
    // console.log(req.file.filename)
   
    const { name,dob,district,gender, email,password } = req.body
    console.log(`name:${name},dob:${dob},district:${district},gender:${gender},email:${email},password:${password}`)
    const u_image=req.file.filename
    try {
        const excistingUser = await users.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            res.status(406).json("Excisting User..Please Try again!!")
        }
        else {
            const newUser = new users({name,dob,district,gender,email,password,u_image})
            await newUser.save()
            res.status(200).json(newUser)

        }
    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
        console.log(err)
    }

}

exports.login = async (req, res) => {
    console.log("inside login function!")
    const { email, password } = req.body
    try {
        const excistingUser = await users.findOne({ email, password })
        if (excistingUser) {
            const token = ({ userId: excistingUser._id }, "secretid")
            // console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "user",
                token
            })
            
        }
        else {
            res.status(406).json("Invalid Email/Password!!")
        }
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!!" + err.message)
    }
}



exports.editUser = async (req, res) => {
    // const userId=req.payload
    const {name,dob,district,gender, email,password }=req.body
    const uploadedFile=req.file?req.file.filename:req.body.u_image
    const {id}=req.params
    try{
      console.log("inside edit")
      const result=await users.findByIdAndUpdate({_id:id},{name,dob,district,gender, email,password,u_image:uploadedFile })
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }
