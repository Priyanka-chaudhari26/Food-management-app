// name:Astring (required).
//  ■ category: Astring (e.g., Appetizers, Main Course, Desserts).
//  ■ price:Anumber (required).
//  ■ availability: A boolean (default: true).

const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    unique: true,
    
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Appetizers", "Main Course", "Desserts"],
  },
  price: {
    type: Number,
    required: [true , "Price is required"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: 0, 
  },
});

module.exports = mongoose.model("Menu", MenuSchema);
