const { Schema, model } = require("mongoose");

const mentalExerciseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  type: {
    type: String,
    enum: ["multiple choice", "true/false"],
  },
});

const MentalExercise = model("MentalExercise", mentalExerciseSchema);

module.exports = MentalExercise;