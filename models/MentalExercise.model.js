const { Schema, model } = require("mongoose");

const mentalExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["mathematical", "puzzle", "coding", "riddle"],
  },
  notes: {
    type: String,
    required: true,
  },
});

const MentalExercise = model("MentalExercise", mentalExerciseSchema);

module.exports = MentalExercise;