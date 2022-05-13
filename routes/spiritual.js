var express = require("express");
const Spiritual = require("../models/Spiritual.model");
var router = express.Router();
const axios = require("axios");
require('dotenv/config');

router.get("/", function (req, res, next) {
  console.log('params', req.params)
  console.log('query', req.query)
  const options = {
    method: 'GET',
    url: 'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
    params: {Book: req.query.book, chapter: req.query.chapter, VerseFrom: req.query.verseFrom, VerseTo: req.query.verseTo},
    headers: {
      'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.BIBLE_API_KEY
    }
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.json(error);
  });
})

router.get("/single-spiritual", function (req, res, next) {
  axios
  .get("https://labs.bible.org/api/?passage=random")
  .then((results) => {
    res.json(results.data)})
  .catch((err) => console.log(err));
})

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
    testament: req.body.testament,
    book: req.body.book,
    chapter: req.body.chapter,
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

router.get("/:id/edit", (req, res, next) => {
  Spiritual.findById(req.params.id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});

router.post("/:id/edit", (req, res, next) => {
  Spiritual.findByIdAndUpdate(req.params.id, {
    testament: req.body.testament,
    book: req.body.book,
    chapter: req.body.chapter,
    verses: req.body.verses,
    takeaway: req.body.takeaway,
  }, {new:true})
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Spiritual.findByIdAndRemove(req.params.id)
    .then(function (results) {
      res.redirect(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});


module.exports = router;