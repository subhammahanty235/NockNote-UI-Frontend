const express = require('express');
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();



const { body, validationResult } = require('express-validator');
const JWT_SECRET = "Subhammahantyyyy"
//create a user using  : Post "api/auth/"

router.post('/createUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 8 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // let emailmessage = "Sorry a user with this email already exists , please try again using another email";
  //if there is any error , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ errors: errors.array() });
  }
  //check wheather the user with this email already exists
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      // message : "Sorry a user with this email already exists , please try again using another email"
      success = false;
      return res.status(400).json({  error: "Sorry a user with this email already exists" })
      // return res.json(emailmessage)
    }
    //create a new user
    const salt = await bcrypt.genSalt(10);
    secpass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,

      password: secpass,
      
    })
    
    // .then(user => res.json(user))
    // .catch((err)=>{``
    //     console.log(err)
    //     res.json({error:"please enter a unique value for email",message:err.message})
    // })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success , authtoken })

  } catch (error) {
    console.error(error.message)
    message = "Internal Server error , please try again later"
    res.status(500).send(message , "some error occured")
  }


})

//authenticate a user using /api/auth/login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  //if there is any error , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success = false;
      return res.status(404).json({ error: "Please try to log in with correct credentials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      success = false;
      return res.status(404).json({ error: "Please try to log in with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success= true;
    
    res.json({ success , authtoken ,})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error")
  }
})
// Route 3 : get user details using post api/auth/getuser
router.post('/getuser',fetchuser, async (req, res) => {
  try {

    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    // const user = await User.findById(userId)
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("internal server erraaaaor")
  }
})
router.put('/updatepw',fetchuser,async(req,res)=>{
    try {
      let userId = req.user.id;
      // console.log(userId)
      const id = await User.findById(userId).select("_id")
      let pwbyuser = req.body.newpw;
      const salt = await bcrypt.genSalt(10);
      secpassupd = await bcrypt.hash(pwbyuser, salt);
      const upd = await User.findByIdAndUpdate(id , {$set:{password:secpassupd}});
      res.send("Successfull")



    } catch (error) {
      console.error(error.message)
      res.status(500).send("internal server erraaaaor")
    }
})
//by email
router.put('/forgotpassword',async(req,res)=>{
  try {
    // let userId = req.user.id;
    // const id = await User.findById(userId).select("_id")
    let email = req.body.email
    let pwbyuser = req.body.newpw;
    const id2 = await User.findOne({email})

    if(!id2)res.send("email id not found in our database")
    
    // let pwbyuser = req.body.newpw;
    const salt = await bcrypt.genSalt(10);
    secpassupd = await bcrypt.hash(pwbyuser, salt);
    const upd = await User.findByIdAndUpdate(id2 , {$set:{password:secpassupd}});
    res.send("Successfull")



  } catch (error) {
    console.error(error.message)
    res.status(500).send("internal server erraaaaor")
  }
})
















module.exports = router;