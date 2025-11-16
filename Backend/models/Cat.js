import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min:0
  },
   unit: {
      type: String,
      enum: ["D", "M", "Y"],
      required: true
    },
    mAge:{
      type: Number,
      required: true,
      min:0
    },
  gender: {
    type: String,
    enum: ["ذكر", "انثى"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["adoption", "mating"],
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [
    {
      type: String,   
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",    
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cat = mongoose.model("Cat", catSchema);

export default Cat;
