var express = require('express');
var router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn')
const fileUploader = require('../middleware/cloudinary.config')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/workout-pic', isLoggedIn, function(req, res, next) {
  
  // res.json(req.file)
})


router.post('/image-upload', isLoggedIn, fileUploader.single("images"), function(req, res){
  res.json(req.file)
});


module.exports = router;
