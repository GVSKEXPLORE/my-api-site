// server.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Dummy Data
let employees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" }
];

let assets = [
  { id: 1, type: "Laptop", brand: "Dell", serialNumber: "DL1234", status: "Assigned", employeeId: 1 },
  { id: 2, type: "Mouse", brand: "Logitech", serialNumber: "LG9876", status: "Assigned", employeeId: 2 },
  { id: 3, type: "Earphones", brand: "Sony", serialNumber: "SN1122", status: "Assigned", employeeId: 1 }
];

let repairs = [
  { id: 1, assetId: 1, employeeId: 1, description: "Battery issue", status: "Open", reportedAt: new Date() }
];

// =================== EMPLOYEE ROUTES ===================
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
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.delete('/employees/:id', (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.status(204).send();
});

app.get('/employees/:id/assets', (req, res) => {
  const empAssets = assets.filter(a => a.employeeId == req.params.id);
  res.json(empAssets);
});

app.get('/employees/:id/repairs', (req, res) => {
  const empRepairs = repairs.filter(r => r.employeeId == req.params.id);
  res.json(empRepairs);
});

// =================== ASSET ROUTES ===================
app.get('/assets', (req, res) => {
  res.json(assets);
});

app.post('/assets', (req, res) => {
  const asset = { id: assets.length + 1, status: "Available", employeeId: null, ...req.body };
  assets.push(asset);
  res.status(201).json(asset);
});

app.put('/assets/:id', (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index] = { ...assets[index], ...req.body };
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});

app.post('/assets/:id/assign', (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index].employeeId = req.body.employeeId;
    assets[index].status = "Assigned";
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});

app.post('/assets/:id/unassign', (req, res) => {
  const index = assets.findIndex(a => a.id == req.params.id);
  if (index !== -1) {
    assets[index].employeeId = null;
    assets[index].status = "Available";
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});

app.delete('/assets/:id', (req, res) => {
  assets = assets.filter(a => a.id != req.params.id);
  res.status(204).send();
});

// =================== REPAIR ROUTES ===================
app.get('/repairs', (req, res) => {
  res.json(repairs);
});

app.post('/repairs', (req, res) => {
  const repair = { id: repairs.length + 1, reportedAt: new Date(), ...req.body };
  repairs.push(repair);
  res.status(201).json(repair);
});

app.put('/repairs/:id', (req, res) => {
  const index = repairs.findIndex(r => r.id == req.params.id);
  if (index !== -1) {
    repairs[index] = { ...repairs[index], ...req.body };
    res.json(repairs[index]);
  } else {
    res.status(404).send('Repair not found');
  }
});

app.get('/repairs/:id', (req, res) => {
  const repair = repairs.find(r => r.id == req.params.id);
  repair ? res.json(repair) : res.status(404).send('Repair not found');
});

app.delete('/repairs/:id', (req, res) => {
  repairs = repairs.filter(r => r.id != req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
