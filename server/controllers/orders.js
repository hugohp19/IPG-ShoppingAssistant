const Order = require("../db/models/order");
const { sendOrder } = require("../mail/index")

exports.createOrder = async (req, res) => {
  const owner = req.user._id;
  const { store, ...order } = req.body;
  const orderArray = Object.values(order);

  try {
    const newOrder = await new Order({
      owner,
      store,
      order: orderArray
    });
    await newOrder.save();
    let user = req.user;

    user.orders = user.orders.concat(newOrder._id);
    await user.save();
    const recentOrder = await Order.find({
      _id: newOrder._id,
    }).populate({
      path: "order",
      populate: {
        path: "product",
        select: {
          name: 1,
          price: 1,
          store: 1,
        }
      },
    });
    //sendOrder(req.user.email, req.user.firstName, recentOrder[0].order)
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  if (!req.user.admin) {
    res.status(401).send("Authorization Required");
  } else {
    const today = new Date();
    today.setDate(today.getDate());
    const { startOfWeek, endOfWeek } = await getActiveWeek(today);
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
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getAllOrders = async (req, res) => {
  if (!req.user.admin) {
    res.status(401).send("Authorization Required");
  } else {
    const today = new Date();
    today.setDate(today.getDate());
    const { startOfWeek, endOfWeek } = getActiveWeek(today);
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
