// const express = require("express");
// const bcrypt = require('bcrypt')
// const path = require("path");
// const app = express();
// const cors = require('cors')
// const jwt = require('jsonwebtoken');
// const port = process.env.PORT || 5100;
// const mongoose = require('mongoose');
// const { MONGO_URI } = require('./db/connect');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const models = require("./db/schema");

// app.use(cors());

// // admin middelware
// function adminAuthenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.status(401).send('Unauthorized');
//     jwt.verify(token, 'ADMIN_SECRET_TOKEN', (err, user) => {
//         if (err) return res.status(403).send('Forbidden');
//         req.user = user;
//         next();
//     });
// }

// // user middleware
// const userAuthenticateToken = async (req, res, next) => {
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader.split(" ")[1]
//         if (!token) {
//             res.status(401);
//             return res.send('Invalid JWT Token');
//         }
//         const decoded = jwt.verify(token, 'USER_SECRET_TOKEN')
//         req.user = decoded.user;
//         next();

//     } catch (err) {
//         console.error(err);
//         res.status(500);
//         res.send('Server Error');
//     }
// };


// // admin schema
// app.post('/adminlogin', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await models.Admins.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const isAdmin = email == 'virat@gmail.com' && password == 'virat@1234';
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate a JWT token
//     if (!isAdmin) {
//         const token = jwt.sign({ userId: user._id }, 'mysecretkey');
//         res.json({ user, token });
//     } else {
//         const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey');
//         res.json({ user, jwtToken });
//     }
// });


// // user schema
// app.post('/adminregister', async (req, res) => {
//     try {
//         const { firstname, lastname, username, email, password } = req.body;

//         if (!username) {
//             return res.status(400).send('Username is required');
//         }                     

//         const userExists = await models.Admins.findOne({ username });                     

//         if (userExists) {    
//             return res.status(400).send('Username already exists');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new models.Admins({
//             firstname,
//             lastname,
//             username,
//             email,
//             password: hashedPassword
//         });

//         const userCreated = await newUser.save();
//         console.log(userCreated, 'user created');
//         return res.status(201).json({ message: 'Successfully registered' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'An error occurred during registration' });

//     }
// });



// // API endpoint to add a category
// app.post('/add-category', async (req, res) => {
//     try {
//         const { category, description } = req.body;
//         if (!category) {
//             return res.status(400).send('Category and description are required');
//         }
//         const existingCategory = await models.Category.findOne({ category });
//         if (existingCategory) {
//             return res.status(400).send('Category already exists');
//         }
//         const newCategory = new models.Category({
//             category,
//             description
//         });
//         const savedCategory = await newCategory.save();
//         console.log(savedCategory, 'category created');
//         return res.status(200).send(savedCategory);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

// app.get('/api/categories', async (req, res) => {
//     try {
//         const cotegoriesList = await models.Category.find();
//         res.status(200).send(cotegoriesList);
//     } catch (error) {
//         res.status(500).send('Server error');
//         console.log(error);
//     }
// })

     
// // Server-side code (e.g., in your Node.js + Express.js backend)

// // Define a route for handling the POST request to '/add-products'
// app.post('/add-products', async (req, res) => {
//     try {      
//         // Extract the product information from the request body
//         const { productname, description, price, image, category, countInStock, rating } = req.body;

//         // Validate if all required fields are provided
//         if (!productname || !description || !price || !image || !category || !countInStock || !rating) {
//             return res.status(400).send({ message: 'Missing required fields' });
//         }

//         // Assuming models.Product and models.Category are defined and imported properly
//         // Create a new product document
//         const product = new models.Product({
//             productname,
//             description,
//             price,
//             image,
//             category,
//             countInStock,
//             rating,
//             dateCreated: new Date()
//         });

//         // Save the new product document to the database
//         await product.save();

//         // Send a success response with the newly created product
//         res.status(201).send(product);
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error(error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// });



// // Endpoint for adding an item to the cart
// app.post('/add-to-cart', async (req, res) => {
//     const {userId, productId, productName, quantity = 1 } = req.body;
//     const item = new models.AddToCart({userId, productId,productName, quantity });
//     try {
//         await item.save();
//         res.status(200).json({ message: `Added ${quantity} of product ${productId} to cart` });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// app.delete('/remove-from-cart/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const result = await models.AddToCart.deleteOne({ productId: id });
//         if (result.deletedCount === 0) {
//             res.status(404).json({ message: `Product with id ${id} not found in the cart` });
//         } else {
//             res.status(200).json({ message: `Removed product with id ${id} from cart` });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.get('/cart/:id', async (req, res) => {
//     try {
//         const cartItems = await models.AddToCart.find({ userId: req.params.id });
//         const productIds = cartItems.map(item => item.productId);
//         const products = await models.Product.find({ _id: { $in: productIds } });
//         res.send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });

// app.post('/orders', async (req, res) => {
//     const { firstname, lastname, user, phone, productId, quantity, paymentMethod, address } = req.body;
//     const product = await models.Product.findById(productId);
//     const amount = product.price * quantity;
//     try {
//         const order = new models.Order({
//             firstname,
//             lastname,
//             user,
//             price: amount,
//             phone,
//             productId,
//             productName:product.productname,
//             quantity,
//             paymentMethod,
//             address
//         });
//         const newOrder = await order.save();
//         const payment = new models.Payment({
//             user,
//             name:firstname+ " " +lastname,
//             order: newOrder._id, // Associate the order with the payment
//             amount,
//             deliveryStatus: newOrder.status,
//             paymentMethod,
//             status: 'Pending'
//         });
//         const savedPayment = await payment.save();
//         res.status(201).json(newOrder);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// app.get('/payments', async (req, res) => {
//     try {
//         const payments = await models.Payment.find();
//         res.status(200).json(payments);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });



// app.get('/orders', async (req, res) => {
//     try {
//         const order = await models.Order.find();
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.json(order);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Define a route for fetching orders by user ID
// app.get('/my-orders/:id', async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const userOrders = await models.Order.find({ user: userId });
//         if (userOrders.length === 0) {
//             return res.status(404).json({ message: 'User orders not found' });
//         }
//         res.json(userOrders);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.put('/orders/:id', async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const { status } = req.body;
//         const order = await models.Order.findById(orderId);
//         if (!order) {
//             return res.status(404).send('Order not found');
//         }

//         order.status = status; // Update the order status property
//         order.createdAt = Date.now()
//         const payment = await models.Payment.findOne({ order: orderId });
//         if (!payment) {
//             return res.status(404).send('Payment not found');
//         }

//         payment.deliveryStatus = status; // Update the payment status property
//         if(status === 'Delivered'){
//             payment.status = 'Success'
//         }else{
//             payment.status = "Pending"
//         }
//         payment.createdAt = Date.now()
//         await payment.save();
//         const updatedOrder = await order.save();
//         res.send(updatedOrder);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// app.put('/cancel-order/:id', async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const { status } = req.body;
//         const order = await models.Order.findById(orderId);
//         if (!order) {
//             return res.status(404).send('Order not found');
//         }

//         order.status = status; 
//         const payment = await models.Payment.findOne({ order: orderId });
//         if (!payment) {
//             return res.status(404).send('Payment not found');
//         }
//         payment.deliveryStatus = status;
//         payment.status = "Failed"
//         payment.createdAt = Date.now()
//         await payment.save();
//         const updatedOrder = await order.save();
//         res.send(updatedOrder);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// app.get('/orders/:id', async (req, res) => {
//     try {
//         const order = await models.Order.findById(req.params.id);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.json(order);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // POST /payments
// app.post('/payments', async (req, res) => {
//     try {
//         const payment = new models.Payment(req.body);
//         const savedPayment = await payment.save();
//         res.status(201).json(savedPayment);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// // Define the route for updating a payment
// app.put('/payment/:id', async (req, res) => {
//     try {
//         const paymentId = req.params.id;

//         const payment = await models.Payment.findById(paymentId);
//         if (!payment) {
//             return res.status(404).send('Payment not found');
//         }
//         const { amount, status } = req.body;
//         if (!amount || !status) {
//             return res.status(400).json({ message: 'Both amount and status are required' });
//         }
//         const updatedPayment = await models.Payment.findByIdAndUpdate(
//             paymentId,
//             { amount, status },
//             { new: true, runValidators: true }
//         );
//         res.status(200).json({
//             message: 'Payment updated successfully',
//             payment: updatedPayment,
//         });
//     } catch (error) {
//         if (error.name === 'CastError') {
//             return res.status(400).json({ message: 'Invalid payment ID' });
//         }
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ message: error.message });
//         }
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// // Create feedback from user
// app.post('/feedback', async (req, res) => {
//     try {
//         const { user, message } = req.body;
//         const feedback = new models.Feedback({ user, message });
//         const savedFeedback = await feedback.save();
//         res.status(201).json(savedFeedback);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Check feedback (admin only)
// app.get('/feedback', async (req, res) => {
//     try {
//         const feedback = await models.Feedback.find();
//         res.status(200).send(feedback);
//     } catch (error) {
//         res.status(500).send('Server error');
//         console.log(error);
//     }
// });

// // admin schema
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await models.Users.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const isAdmin = email == 'virat@gmail.com' && password == 'virat@1234';
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate a JWT token
//     if (!isAdmin) {
//         const token = jwt.sign({ userId: user._id }, 'mysecretkey');
//         res.json({ user, token });
//     } else {
//         const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey');
//         res.json({ user, jwtToken });
//     }
// });


// // user schema
// app.post('/register', async (req, res) => {
//     try {
//         const { firstname, lastname, username, email, password } = req.body;

//         if (!username) {
//             return res.status(400).send('Username is required');
//         }                     

//         const userExists = await models.Users.findOne({ username });

//         if (userExists) {    
//             return res.status(400).send('Username already exists');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new models.Users({
//             firstname,
//             lastname,
//             username,
//             email,
//             password: hashedPassword
//         });

//         const userCreated = await newUser.save();
//         console.log(userCreated, 'user created');
//         return res.status(201).json({ message: 'Successfully registered' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'An error occurred during registration' });

//     }
// });

// // get users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await models.Users.find();
//         res.send(users);
//     } catch (error) {
//         res.status(500).send('Server error');
//         console.log(error);
//     }
// });

// app.delete('/userdelete/:id',(req,res)=>{        
//     let id=req.params.id;
//     models.Users.deleteOne({ _id: id })
//        .then((user)=>{
//         res.status(200).json(user)
//          })
//        .catch(() => {
//         res.sendStatus(500)
//        })
// })

// app.get('/getbookings/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const booking = await models.Order.find({ userId }).sort('position');
//         res.json(booking);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch tasks' });
//     }
// });

// app.delete('/userbookingdelete/:id',(req,res)=>{
//     let id=req.params.id;
//     models.Order.deleteOne({_id : id})
//     .then((item)=>{
//           res.status(200).json(item)
//     })
//     .catch(()=>{
//         res.status(400).json({msg:"No item found"})
//     })
// })

// // Get Products
// const getAllProducts = async () => {
//     try {
//         const products = await models.Product.find();
//         return products;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// // Define a route for the "get products" API endpoint
// app.get('/products', async (req, res) => {
//     const products = await getAllProducts();
//     res.json(products);
// });

// // Get a single product
// app.get('/products/:id', async (req, res) => {
//     try {
//         const product = await models.Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         console.error(`Error getting product with id ${req.params.id}`, error);
//         res.status(500).json({ message: `Error getting product with id ${req.params.id}` });
//     }
// });

// app.delete('/products/:id', async (req, res) => {
//     try {
//         const deletedProduct = await models.Product.findByIdAndDelete(req.params.id);
//         if (!deletedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product deleted' });
//     } catch (error) {
//         console.error(`Error deleting product with id ${req.params.id}`, error);
//         res.status(500).json({ message: `Error deleting product with id ${req.params.id}` });
//     }
// });

// app.put('/products/:id', async (req, res) => {
//     try {
//         const updatedProduct = await models.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         console.error(`Error updating product with id ${req.params.id}`, error);
//         res.status(500).json({ message: `Error updating product with id ${req.params.id}` });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


// module.exports = app;
const express = require("express");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const port = process.env.PORT || 5100;
const models = require("./db/schema");

// Connect to MongoDB
require('./db/connect');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== AUTH MIDDLEWARES =====================
function adminAuthenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, 'ADMIN_SECRET_TOKEN', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}

const userAuthenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Invalid JWT Token' });
    const decoded = jwt.verify(token, 'USER_SECRET_TOKEN');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// ===================== ADMIN AUTH =====================
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  const user = await models.Admins.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

  const isAdmin = email === 'virat@gmail.com' && password === 'virat@1234';
  const tokenPayload = { userId: user._id };
  const token = jwt.sign(tokenPayload, 'mysecretkey');

  isAdmin
    ? res.json({ user, jwtToken: token })
    : res.json({ user, token });
});

app.post('/adminregister', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (!username || !email) return res.status(400).json({ error: 'Username and email are required' });

    const existingUsername = await models.Admins.findOne({ username });
    if (existingUsername) return res.status(400).json({ error: 'Username already exists' });

    const existingEmail = await models.Admins.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new models.Admins({
      firstname, lastname, username, email, password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log('Admin created:', savedUser);
    res.status(201).json({ message: 'Successfully registered' });
  } catch (error) {
    console.error('Admin Registration error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===================== USER AUTH =====================
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (!username || !email) return res.status(400).json({ error: 'Username and email are required' });

    const usernameExists = await models.Users.findOne({ username });
    if (usernameExists) return res.status(400).json({ error: 'Username already exists' });

    const emailExists = await models.Users.findOne({ email });
    if (emailExists) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new models.Users({
      firstname, lastname, username, email, password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
    res.status(201).json({ message: 'Successfully registered' });
  } catch (error) {
    console.error('User Registration error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===================== USER LOGIN =====================
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.Users.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ===================== PRODUCTS =====================
app.get('/products', async (req, res) => {
  try {
    const products = await models.Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
// ===================== ADD PRODUCT (ADMIN) =====================
app.post('/api/admin/add-product', async (req, res) => {
  try {
    const {
      productname,
      description,
      price,
      brand,
      image,
      category, // 👈 this is the category ObjectId coming from the frontend
      countInStock,
      rating
    } = req.body;

    // 💡 Basic field validation
    if (
      !productname || !description || !price ||
      !brand || !image || !category ||
      countInStock == null || rating == null
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 🔍 Find category by ObjectId
    const foundCategory = await models.Category.findById(category);
    if (!foundCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // 🛠 Create new product using ObjectId reference
    const product = new models.Product({
      productname,
      description,
      price,
      brand,
      image,
      category: foundCategory._id, // or just "category" if you're confident
      countInStock,
      rating,
      dateCreated: new Date()
    });

    // 💾 Save to MongoDB
    const saved = await product.save();
    res.status(201).json({ message: 'Product added', product: saved });

  } catch (error) {
    console.error('Add-product error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ===================== GET ALL CATEGORIES =====================
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await models.Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// ===================== ADD CATEGORY =====================
app.post('/api/categories', async (req, res) => {
  try {
    const { category, description } = req.body;
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const exists = await models.Category.findOne({ category });
    if (exists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = new models.Category({ category, description });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Add category error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//=================Add to cart========================
app.post('/add-to-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Missing user or product ID' });
  }

  // try {
  //   // MongoDB insert or update logic here...
  //   res.status(200).json({ message: 'Added to cart' });
  // } 
  try {
  // Check if this item is already in the cart
  const existingItem = await models.Cart.findOne({ userId, productId });

  if (existingItem) {
    // Update quantity if item already exists
    existingItem.quantity += quantity || 1;
    await existingItem.save();
  } else {
    // Add new item to cart
    const cartItem = new models.Cart({ userId, productId, quantity: quantity || 1 });
    await cartItem.save();
  }

    res.status(200).json({ message: 'Added to cart' });
  }
  catch (err) {
    console.error('Add to cart error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ===================== GET CART ITEMS FOR A USER =====================
app.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await models.Cart.find({ userId }).populate('productId');
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Fetch cart error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//======================buy==================================
app.post('/orders', async (req, res) => {
  try {
    console.log('Received order payload:', req.body);
    const newOrder = new models.Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Order creation error:', error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});
//======================product data===========================
app.get('/products/:id', async (req, res) => {
  try {
    const product = await models.Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//===================my-order==================
app.get('/my-orders/:userId', async (req, res) => {
  try {
    const orders = await models.Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
// ===================== SERVER =====================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

module.exports = app;