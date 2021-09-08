const Product = require("../db/models/product"),
  isAdmin = require("../middleware/authorization/index");

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
  const updateData = req.body;
  const { id } = updateData;
  if (!id) return res.status(400).json({ message: "Product Not Selected" });
  delete updateData.id;
  const updates = Object.keys(req.body); // => ['email', 'name', 'password']
  const allowedUpdates = [
    "name",
    "code",
    "photo",
    "isActive",
    "price",
    "store",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).json({ message: "Invalid Inputs for update" });
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).json({ message: "product not found" });
    //Loop through each update, and change the value for the current product to the value coming from the body
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
