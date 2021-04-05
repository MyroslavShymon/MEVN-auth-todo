const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  title: String,
});

module.exports = Story = mongoose.model("story", StorySchema);
