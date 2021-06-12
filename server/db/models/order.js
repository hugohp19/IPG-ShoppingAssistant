const mongoose = require("mongoose"),
  Product = require("./product"),
  User = require("./user");

const orderSchema = new mongoose.Schema(
  {
    order: [
      {
        quantity: {
          type: Number,
          required: true
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    store:{
      type: 'String',
      trim: true,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

//Create a relationship between User and Task
// userSchema.virtual('tasks', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'owner'
// });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
