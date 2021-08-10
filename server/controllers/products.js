const Product = require('../db/models/product'),
  isAdmin = require('../middleware/authorization/index');

exports.createProduct = async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: 'access denied' });
  }
  try {
    const product = new Product({
      ...req.body
    });
    await product.save();
    res.status(201).json({Message: 'Success'});
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

