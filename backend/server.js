const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database for products
const products = [
  { id: 1, name: 'Product 1', description: 'High quality product', price: 49.99 },
  { id: 2, name: 'Product 2', description: 'Premium item', price: 79.99 },
  { id: 3, name: 'Product 3', description: 'Best seller', price: 99.99 },
  { id: 4, name: 'Product 4', description: 'Limited edition', price: 129.99 },
];

// Mock database for orders
let orders = [];

// Email configuration (using EmailJS credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    
    const order = {
      id: orders.length + 1,
      customer,
      items,
      total,
      createdAt: new Date(),
    };
    
    orders.push(order);

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Order Confirmation - Mack and Sons Enterprises',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear ${customer.name},</p>
        <p>Your order has been placed successfully.</p>
        <h3>Order Details:</h3>
        <p>Order ID: ${order.id}</p>
        <p>Total: $${total}</p>
        <h4>Items:</h4>
        <ul>
          ${items.map((item) => `<li>${item.name} - $${item.price}</li>`).join('')}
        </ul>
        <p>Your order will be shipped to:</p>
        <p>${customer.address}</p>
        <p>We'll contact you at ${customer.phone} for delivery updates.</p>
        <p>Thank you for shopping with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error });
  }
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});