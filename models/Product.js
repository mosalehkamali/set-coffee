const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual(
    "comments",{
        ref:"Comment",
        localField:"_id",
        foreignField:"product"
    }
)

const model = mongoose.models.Product || mongoose.model("Product", schema);

module.exports = model;
