var express = require('express');
var router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config');

const isLoggedIn = require('../middleware/isLoggedIn')
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  // 1. Make sure fields are filled out
  if(!req.body.username || !req.body.password){
    return res.json({message: "Please fill out all fields"})
  }
  // 2. Make sure username isn't taken
  User.findOne({username: req.body.username})
  .then((foundUser) => {

    if(foundUser){
      return res.json({message: "Username is taken!"})
    } else {
      // 3. Hash the password
      // 3.1 Generate the salt
      const salt = bcrypt.genSaltSync(saltRounds)
      // 3.2 hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)

      // 4. Create the account
      User.create({
        username: req.body.username,
        password: hashedPassword
      })
      .then((createdUser) =>{
        // 5. Create the JWT
        // 5.1 Create the payload
        const payload = {_id: createdUser._id}

        // 5.2 Create the token
        const token = jwt.sign(payload, process.env.SECRET, {
          algorithm: 'HS256', 
          expiresIn: '24hr'
        });

          res.json({token: token});


      })
      .catch((err)=>{
        res.json(err.message)
      })



    }
  })
  .catch((err)=>{
    res.json(err.message)
  })
  // 4.  
});

router.post('/login', function(req, res, next) {
  // 1. Make sure fields are valid
  if(!req.body.username || !req.body.password){
    return res.json({message: "Please fill out all fields"})
  }
  // 2. Check username
  User.findOne({username: req.body.username})
  .then((foundUser) =>{

    // 2.1 Make sure User exists
    if(!foundUser){
      return res.json({message: "Username or password incorrect!"})
    }

    // 2.2 Make sure passwords math
    const doesMatch = bcrypt.compareSync(req.body.password, foundUser.password)

    // 3 Create a token
    if(doesMatch){
      const payload = {_id: foundUser._id}

      const token = jwt.sign(payload, process.env.SECRET, {
        algorithm: 'HS256', 
        expiresIn: '24hr'
      });

        res.json({token: token});
    } else {
      return res.json({message: "Username or password incorrect!"})
    }



  })


 .catch((err)=>{
    res.json(err.message)
  })

});

router.get('/login-test', isLoggedIn, (req, res)=>{
  console.log('user')
  res.json({message: "You are logged in"})
})

module.exports = router;
