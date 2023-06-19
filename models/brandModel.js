const mongoose = require("mongoose");
// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASEURL}/brands/${doc.image}`;
  }
};

//find edit find all
brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});
//create
brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});
// 2- Create model
module.exports = mongoose.model("Brand", brandSchema);
