var express = require("express");
const Workout = require("../models/Workout.model");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
        .get(`https://wger.de/api/v2/exercise/?format=json&language=2`)
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

router.post("/create", (req, res) => {
    console.log(req.body);
  Workout.create({
    name: req.body.name,
    type: req.body.type,
    duration: req.body.duration,
    location: req.body.location,
  })
    .then((createdWorkout) => {
      res.json(createdWorkout);
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;

// axios
//         .get(`https://wger.de/api/v2/exercise/?format=json&language=2`)
//         .then((results) => {
//             console.log(results)
//             setWorkouts(results.data)})
        
//         .catch((err) => console.log(err.message))

//     axios
//     .get("https://wger.de/api/v2/exercise/?format=json&language=2")
//     .then((results) => {
//       setWorkouts(results.data[Math.floor(Math.random() * results.data.length)])
//     })
//     .catch((err) => console.log(err));
