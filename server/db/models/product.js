const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      code: {
        type: String,
        required: true,
        trim: true
      },
      photo:{
        type: String,
        required: true,
        trim: true
      },
      photoId:{
        type: String,
        // required: true,
        trim: true
      },
      isActive: {
        type: Boolean,
        required: true,
        default: true
      },
      price: {
        type: Number,
        required: true,
        trim: true
      },
      store:{
        type: String,
        required: true,
        trim: true
      },
    },
    {
      timestamps: true
    }
  );
  
  //Create a relationship between User and Task
  // userSchema.virtual('tasks', {
  //   ref: 'Task',
  //   localField: '_id',
  //   foreignField: 'owner'
  // });
  
  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;
  