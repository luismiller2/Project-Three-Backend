var express = require("express");
const Spiritual = require("../models/Spiritual.model");
var router = express.Router();
const axios = require("axios");
require('dotenv/config');

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
        .get(`https://api.scripture.api.bible/v1/swagger.json`)
        .then((results) => {
            console.log(results)
            res.json(results.data)})
        
        .catch((err) => console.log(err.message))
});

router.get("/single-spiritual", function (req, res, next) {
  axios
  .get("https://labs.bible.org/api/?passage=random")
  .then((results) => {
    res.json(results.data)})
  //   res.json(results.data[Math.floor(Math.random() * results.data.length)])
  // })
  .catch((err) => console.log(err));
})

// router.get("/single-spiritual", function (req, res, next) {
//   const options = {
//     method: 'GET',
//     url: 'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
//     params: {Book: 'Genesis', chapter: '5', VerseFrom: '1', VerseTo: '11'},
//     headers: {
//       'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com',
//       'X-RapidAPI-Key': process.env.BIBLE_API_KEY
//     }
//   };
  
//   axios.request(options).then(function (response) {
//     res.json(response.data);
//   }).catch(function (error) {
//     res.json(error);
//   });
// })

router.get("/all-spiritual", (req, res) => {
  Spiritual.find()
    .then((allSpirituals) => {
      res.json(allSpirituals);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.post("/create", (req, res) => {
    console.log(req.body);
  Spiritual.create({
    book: req.body.book,
    verses: req.body.verses,
    takeaway: req.body.takeaway,
  })
    .then((createdSpiritual) => {
      res.json(createdSpiritual);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;