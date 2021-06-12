const Product = require('../db/models/product'),
  isAdmin = require('../middleware/authorization/index');

exports.createProduct = async (req, res) => {
  console.log(req.body);
  // console.log(req.user);
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
    console.log(products)
    res.status(201).json(products);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

