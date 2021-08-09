const User = require('../db/models/user'),
isAdmin = require('../middleware/authorization/index'), ///try to implement isAdmin to get all users in secure route
  // cloudinary = require('cloudinary').v2,
  // {
  //   sendWelcomeEmail,
  //   sendCancellationEmail,
  //   forgotPasswordEmail
  // } = require('../emails/index'),
  jwt = require('jsonwebtoken'),
  {sendForm} = require('../mail/index')


  // ***********************************************//
// Create a user
// ***********************************************//
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    });
    //sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};



// ***********************************************//
// Login a user
// ***********************************************//
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

// ******************************
// Password Reset Request
// This route sends an email that the
// user must click within 10 minutes
// to reset their password.
// ******************************
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const token = jwt.sign(
      { _id: user._id.toString(), name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );
    forgotPasswordEmail(email, token);
    res.json({ message: 'reset password email sent!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.passwordRedirect = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, function (err) {
      if (err) throw new Error(err.message);
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 600000,
      sameSite: 'Strict'
    });
    res.redirect(process.env.URL + '/update-password');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// AUTHENTICATED REQUESTS

// ***********************************************//
// Get current user
// ***********************************************//
exports.getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

exports.getCurrentUserOrders = async (req, res) => {
    try{
      const allUsers = await User.findById(req.user._id).populate({
        path: 'orders',
        populate: {
          path: 'order',
          populate:{
            path: 'product'
          }
        }
      });
      res.status(200).send(allUsers);
  
  
    // if (req.query.completed) match.completed = req.query.completed === 'true';
    // if (req.query.sortBy) {
    //   const parts = req.query.sortBy.split(':'); // =>>> ['dueDate', 'desc']
    //   sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    // }
    // try {
    //   await req.user
    //     .populate({
    //       path: 'tasks',
    //       match,
    //       options: {
    //         limit: parseInt(req.query.limit),
    //         skip: parseInt(req.query.skip),
    //         sort
    //       }
    //     })
    //     .execPopulate();
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// ***********************************************//
// Update a user
// ***********************************************//
exports.updateCurrentUser = async (req, res) => {
  const updates = Object.keys(req.body); // => ['email', 'name', 'password']
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'admin', 'orders'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).json({ message: 'Invalid updates' });
  try {
    //Loop through each update, and change the value for the current user to the value coming from the body
    updates.forEach((update) => (req.user[update] = req.body[update]));
    //save the updated user in the db
    await req.user.save();
    //send the updated user as a response
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ***********************************************//
// get all user
// ***********************************************//
exports.getAllUsers = async (req, res) => {
  const match = {};
  const sort = {};

  try{
    const allUsers = await User.find().populate('orders');
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ***********************************************//
// Logout a user
// ***********************************************//
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.cookies.jwt;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'logged out!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ***********************************************//
// Logout all devices
// ***********************************************//

exports.logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'logged out from all devices!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ***********************************************//
// Delete a user
// ***********************************************//

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.clearCookie('jwt');
    res.json({ message: 'user deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ***********************************************//
// Upload avatar
// ***********************************************//
// exports.uploadAvatar = async (req, res) => {
//   try {
//     const response = await cloudinary.uploader.upload(
//       req.files.avatar.tempFilePath
//     );
//     req.user.avatar = response.secure_url;
//     await req.user.save();
//     res.json(response);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updatePassword = async (req, res) => {
  try {
    req.user.password = req.body.password;
    await req.user.save();
    res.clearCookie('jwt');
    res.status(200).json({ message: 'password updated successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.sendFormulario = async (req, res) => {
  //const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    sendForm(req.body)
    res.status(200).json({message: 'Email sent'});
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};