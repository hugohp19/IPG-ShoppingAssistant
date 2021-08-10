require('./db/config/index');
const express = require('express'),
  app = express(),
  openRoutes = require('./routes/open/index'),
  userRouter = require('./routes/secure/users'),
  productsRouter = require('./routes/secure/products'),
  ordersRouter = require('./routes/secure/orders'),
  passport = require('./middleware/authentication/index'),
  cookieParser = require('cookie-parser'),
  path = require('path')
  // cors = require('cors');
//   const corsOptions ={
//     origin: process.env.CORS_ORIGIN_URL, 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// Parse incoming JSON into objects
app.use(express.json());

//Middleware to parse through incoming cookies in the requests.
app.use(cookieParser());

//Unauthenticated routes
app.use('/api', openRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

//Authenticated Routes
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

module.exports = app;