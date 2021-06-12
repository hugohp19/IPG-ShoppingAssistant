const Order = require("../db/models/order");

exports.createOrder = async (req, res) => {
  console.log(req.body);
  console.log(req.user);
  const owner = req.user._id;
  const { store, ...order } = req.body;
  console.log("owner: ", owner);
  console.log("store: ", store);
  const orderArray = Object.values(order);
  console.log("order: ", orderArray);

  try {
    const newOrder = await new Order({
      owner,
      store,
      order: orderArray
    });
    console.log("newOrder: ", newOrder);
    await newOrder.save();
    let user = req.user;
    user.orders = user.orders.concat(newOrder._id);
    await user.save();
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {

  console.log('****************************');
  console.log(req.user.admin);
  if (!req.user.admin) {
    res.status(401).send("Authorization Required");
  } else {
    const today = new Date();
    today.setDate(today.getDate());
    const { startOfWeek, endOfWeek } = await getActiveWeek(today);
    console.log( startOfWeek, endOfWeek)
    // console.log("startOfWeek: ", startOfWeek);
    // console.log("endOfWeek: ", endOfWeek);
    try {
      const orders = await Order.find({
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        store: "costco",
      })
        .populate({
          path: "owner",
          select: {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
          },
        })
        .populate({
          path: "order",
          populate: {
            path: "product",
          },
        });
      // console.log('newOrder: ', orders)
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getAllOrders = async (req, res) => {
  console.log(req.user.admin);
  if (!req.user.admin) {
    res.status(401).send("Authorization Required");
  } else {
    const today = new Date();
    today.setDate(today.getDate());
    const { startOfWeek, endOfWeek } = getActiveWeek(today);
    // console.log("startOfWeek: ", startOfWeek);
    // console.log("endOfWeek: ", endOfWeek);
    try {
      const orders = await Order.find({
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        store: "costco",
        isActive: true
      })
        .populate({
          path: "owner",
          select: {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
          },
        })
        .populate({
          path: "order",
          populate: {
            path: "product",
          },
        });
      // console.log('newOrder: ', orders)
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

function getActiveWeek(date) {
  const dayOfWeek = date.getDay();
  //[s, m, t, w, t, f ,s]
  //[0, 1, 2, 3, 4, 5, 6]
  let startOfWeek;
  let endOfWeek;
  if (dayOfWeek === 6) {
    startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() - 1));
    endOfWeek = new Date(date.setDate(date.getDate() + 6));
  } else {
    startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() - 8));
    endOfWeek = new Date(date.setDate(date.getDate() + 6));
  }
  return {
    startOfWeek,
    endOfWeek,
  };
}
