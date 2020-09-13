const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  age: { type: String, required: true },
  goal: [],
  // clubId : {type : mongoose.Schema.Types.ObjectId , required : true , ref="club"},
});
module.exports = mongoose.model("player", playerSchema);
