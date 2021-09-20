const cloudinary = require("cloudinary");

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = require('./server/app'),
port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Express server is up on port ${port}`));
