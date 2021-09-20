const Product = require("../db/models/product"),
  isAdmin = require("../middleware/authorization/index");
const cloudinary = require("cloudinary").v2;

exports.createProduct = async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: "access denied" });
  }
  try {
    const product = new Product({
      ...req.body,
    });
    await product.save();
    res.status(201).json({ Message: "Success" });
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.updateProduct = async (req, res) => {
  let updateData = req.body;
  const { id, photo } = updateData;

  if (!id) return res.status(400).json({ message: "Product Not Selected" });
  delete updateData.id;
  if (photo) delete updateData.photo;

  const updates = Object.keys(req.body); // => ['email', 'name', 'password']
  const allowedUpdates = [
    "name",
    "code",
    "photo",
    "isActive",
    "price",
    "store",
    "photoId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).json({ message: "Invalid Inputs for update" });

  try {
    let responsePhoto = {};
    if (photo) {
      try {
        responsePhoto = await cloudinary.uploader.upload(photo, {
          upload_preset: "stores",
        });
        updates.push("photo", "photoId");
        updateData = {
          ...updateData,
          photo: responsePhoto.secure_url,
          photoId: responsePhoto.public_id,
        };
      } catch (e) {
        console.log("Not able to upload Photo: ", e);
      }
    }
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).json({ message: "product not found" });
    //Loop through each update, and change the value for the current product to the value coming from the body
    if (responsePhoto.secure_url && product.photoId) {
      cloudinary.uploader.destroy(product.photoId);
    }
    updates.forEach((update) => (product[update] = updateData[update]));
    await product.save();
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
