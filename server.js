// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Dummy Data
let employees = [
  { id: 1, name: "Alice Johnson", role: "Developer", department: "Engineering" },
  { id: 2, name: "Bob Smith", role: "Designer", department: "UX" },
  { id: 3, name: "Charlie Brown", role: "QA Tester", department: "Quality" },
  { id: 4, name: "Daisy Lee", role: "Product Manager", department: "Product" },
  { id: 5, name: "Ethan Kim", role: "HR Executive", department: "HR" }
];

let products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Mouse", price: 25, category: "Accessories" },
  { id: 3, name: "Keyboard", price: 50, category: "Accessories" },
  { id: 4, name: "Monitor", price: 250, category: "Electronics" },
  { id: 5, name: "Desk Chair", price: 180, category: "Furniture" }
];

// Homepage
app.get('/', (req, res) => {
  res.send('Welcome to your API practice site 🎉');
});

// ===================== EMPLOYEE ROUTES =====================
app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  emp ? res.json(emp) : res.status(404).send('Employee not found');
});

app.post('/employees', (req, res) => {
  const emp = { id: employees.length + 1, ...req.body };
  employees.push(emp);
  res.status(201).json(emp);
});

app.put('/employees/:id', (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    employees[index] = { id: Number(req.params.id), ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.delete('/employees/:id', (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.status(204).send();
});

// ===================== PRODUCT ROUTES =====================
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).send('Product not found');
});

app.post('/products', (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.put('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products[index] = { id: Number(req.params.id), ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.status(204).send();
});

// ===================== EXTRA MOCK ROUTES =====================
app.get('/status', (req, res) => {
  res.json({ status: 'API is running smoothly 🚀' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.status(201).json({ message: `User ${username} registered successfully.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
