const mongoose = require("mongoose");
require("./Product");
require("./User");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const model = mongoose.models.Wishlist || mongoose.model("Wishlist", schema);

export default model;
