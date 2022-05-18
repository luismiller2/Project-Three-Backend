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
  if(!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({message: "Please fill out all fields"})
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
        email: req.body.email,
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
        res.status(400).json(err.message)
      })



    }
  })
});

router.post('/login', function(req, res, next) {
  console.log(req.body)
  // 1. Make sure fields are valid
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: "Please fill out all fields"})
  }
  // 2. Check username
  User.findOne({username: req.body.username})
  .then((foundUser) =>{

    // 2.1 Make sure User exists
    if(!foundUser){
      return res.status(401).json("no user")
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
      return res.status(402).json("Username or password incorrect!")
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


router.get("/:id/edit", (req, res, next) => {
  User.findById(req.params.id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});


router.post("/edit", isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    username: req.body.username,
    email: req.body.email,
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.post("/delete", isLoggedIn, (req, res, next) => {
  User.findByIdAndRemove(req.user._id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.get("/all-users", (req, res, next) => {

  User.find()
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.get("/user-data", isLoggedIn, (req, res, next) => {

  User.findById(req.user._id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

module.exports = router;
