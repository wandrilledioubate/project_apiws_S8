const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const passport = require('./auth');

// Inserting (Creating) Data
router.post("/insertproduct", async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode } = req.body;

  try {
    const pre = await products.findOne({ ProductBarcode: ProductBarcode });
    console.log(pre);

    if (pre) {
      res.status(422).json("Product is already added.");
    } else {
      const addProduct = new products({ 
        ProductName, 
        ProductPrice, 
        ProductBarcode
      });

      await addProduct.save();
      res.status(201).json(addProduct);
      console.log(addProduct);
    }
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) Data
router.get('/products', async (req, res) => {
  try {
    const getProducts = await products.find();
    console.log(getProducts);
    res.status(201).json(getProducts);
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) individual Data
router.get('/products/:id', async (req, res) => {
  try {
    const getProduct = await products.findById(req.params.id);
    console.log(getProduct);
    res.status(201).json(getProduct);
  } catch (err) {
    console.log(err);
  }
});

// Editing (Updating) Data
router.put('/updateproduct/:id', async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode } = req.body;

  try {
    const updateProducts = await products.findByIdAndUpdate(
      req.params.id,
      { ProductName, ProductPrice, ProductBarcode },
      { new: true }
    );
    console.log("Data Updated");
    res.status(201).json(updateProducts);
  } catch (err) {
    console.log(err);
  }
});

// Deleting Data
router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    console.log("Data Deleted");
    res.status(201).json(deleteProduct);
  } catch (err) {
    console.log(err);
  }
});

// Route to start OAuth authentication with Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route to handle OAuth callback from Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log('Successful authentication:', req.user);
    res.cookie('user', req.user)
    console.log("User connected : ", req.user)
    res.redirect(process.env.FRONTEND_URL+`/products`);
  }
);

// Route to log out user
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    console.log('User logged out');
    res.redirect('/');
  });
});

// Route to get current user
// router.get('/current_user', (req, res) => {
//   console.log('Cookies: ', req.cookies);
//   console.log('Session: ', req.session);
//   console.log('Session: ', req.session.cookie);
//   if (req.cookies && req.cookies.user) {
//     const encodedProfile = req.cookies.user;
//     const decodedProfile = decodeURIComponent(encodedProfile);
//     try {
//       const profileObj = JSON.parse(decodedProfile);
//       console.log('Parsed Profile:', profileObj);
//       res.json(profileObj);
//     } catch (error) {
//       console.error('Error parsing profile:', error);
//       res.json(null);
//     }
//   } else {
//     console.log('No "user" entry found in req.cookies');
//     res.json(null);
//   }
//   // if (req.user) {
//   //   console.log('Current user:', req.user);

//   //   res.json(req.user);
//   // } else {
//   //   console.log('No user logged in');
//   //   res.json(null);
//   // }
// });

module.exports = router;
