const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js');

dotenv.config();

//mongodb connection
connectDB();

const app = express();

//middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRroute.js'));
app.use('/api/v1/auth', require('./routes/authRoute.js'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

// Express 5.x Global Error Handler - catches async errors automatically
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.DEV_MODE === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running in ${process.env.DEV_MODE} on ${PORT}`.bgBlue.white));