// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
