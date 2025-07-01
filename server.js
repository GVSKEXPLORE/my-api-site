const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const TOKEN_EXPIRE_TIME = '1h';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

let employees = [
  { id: 1, name: "Alice Johnson", role: "Developer", department: "Engineering" },
  { id: 2, name: "Bob Smith", role: "Designer", department: "UX" }
];

let assets = [
  { id: 1, type: "Laptop", brand: "Dell", serialNumber: "SN123", status: "Assigned", employeeId: 1 },
  { id: 2, type: "Mouse", brand: "Logitech", serialNumber: "SN456", status: "Available", employeeId: null }
];

let repairs = [
  { id: 1, employeeId: 1, assetId: 1, description: "Screen flickering", status: "Open", reportedAt: new Date() }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });
    res.json({ token, expiresIn: 3600 });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/employees', authenticateToken, (req, res) => res.json(employees));
app.post('/employees', authenticateToken, (req, res) => {
  const emp = { id: employees.length + 1, ...req.body };
  employees.push(emp);
  res.status(201).json(emp);
});
app.get('/employees/:id', authenticateToken, (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  emp ? res.json(emp) : res.status(404).send('Employee not found');
});
app.put('/employees/:id', authenticateToken, (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    employees[index] = { id: Number(req.params.id), ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).send('Employee not found');
  }
});
app.delete('/employees/:id', authenticateToken, (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.status(204).send();
});
app.get('/employees/:id/assets', authenticateToken, (req, res) => {
  const assigned = assets.filter(a => a.employeeId == req.params.id);
  res.json(assigned);
});
app.get('/employees/:id/repairs', authenticateToken, (req, res) => {
  const employeeRepairs = repairs.filter(r => r.employeeId == req.params.id);
  res.json(employeeRepairs);
});

app.get('/assets', authenticateToken, (req, res) => res.json(assets));
app.post('/assets', authenticateToken, (req, res) => {
  const asset = { id: assets.length + 1, status: "Available", employeeId: null, ...req.body };
  assets.push(asset);
  res.status(201).json(asset);
});
app.put('/assets/:id', authenticateToken, (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index] = { ...assets[index], ...req.body };
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});
app.delete('/assets/:id', authenticateToken, (req, res) => {
  assets = assets.filter(a => a.id != req.params.id);
  res.status(204).send();
});
app.post('/assets/:id/assign', authenticateToken, (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index].employeeId = req.body.employeeId;
    assets[index].status = "Assigned";
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});
app.post('/assets/:id/unassign', authenticateToken, (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index].employeeId = null;
    assets[index].status = "Available";
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});

app.get('/repairs', authenticateToken, (req, res) => res.json(repairs));
app.post('/repairs', authenticateToken, (req, res) => {
  const repair = { id: repairs.length + 1, reportedAt: new Date(), ...req.body };
  repairs.push(repair);
  res.status(201).json(repair);
});
app.get('/repairs/:id', authenticateToken, (req, res) => {
  const repair = repairs.find(r => r.id == req.params.id);
  repair ? res.json(repair) : res.status(404).send('Repair not found');
});
app.put('/repairs/:id', authenticateToken, (req, res) => {
  const index = repairs.findIndex(r => r.id == req.params.id);
  if (index !== -1) {
    repairs[index] = { ...repairs[index], ...req.body };
    res.json(repairs[index]);
  } else {
    res.status(404).send('Repair not found');
  }
});
app.delete('/repairs/:id', authenticateToken, (req, res) => {
  repairs = repairs.filter(r => r.id != req.params.id);
  res.status(204).send();
});

app.get('/', (req, res) => res.send('Welcome to Employee Asset Management API'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
