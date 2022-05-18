var express = require("express");
const Workout = require("../models/Workout.model");
var router = express.Router();
const axios = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", function (req, res, next) {
  axios
        .get(`https://wger.de/api/v2/exercise/?format=json&language=2&limit=250`)
        .then((results) => {
            console.log(results)
            res.json(results.data)})
        
        .catch((err) => console.log(err.message))
});

router.get("/singleWorkout/:id", function (req, res, next) {
  axios
        .get(`https://wger.de/api/v2/exerciseinfo/${req.params.id}`)
        .then((results) => {
            console.log(results)
            res.json(results.data)})
        
        .catch((err) => console.log(err.message))
});

router.get("/single-workout", function (req, res, next) {
  axios
  .get("https://wger.de/api/v2/exercise/?format=json&language=2")
  .then((results) => {
    res.json(results.data.results[Math.floor(Math.random() * results.data.results.length)])
  })
  .catch((err) => console.log(err));
})

router.get("/all-workouts", (req, res) => {
  Workout.find()
    .then((allWorkouts) => {
      res.json(allWorkouts);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.get("/my-workouts", isLoggedIn, (req, res, next) => {
  Workout.find({creatorId: req.user._id})
    .then(function (results) {
      res.json(results);
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});

router.post("/create", (req, res) => {
    console.log(req.body);
  Workout.create({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    creatorId: req.user._id,
  })
    .then((createdWorkout) => {
      res.json(createdWorkout);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.get("/:id/edit", (req, res, next) => {
  Workout.findById(req.params.id)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});

router.post("/:id/edit", (req, res, next) => {
  Workout.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    creatorId: req.user._id,
  }, {new:true})
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Workout.findByIdAndRemove(req.params.id)
    .then(function (results) {
      res.redirect(results);
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});


module.exports = router;
