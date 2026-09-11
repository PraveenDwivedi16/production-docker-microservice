const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_NAME || 'devops_db',
});

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "🚀 Production-Ready DevOps Microservice is Running!",
    status: "Healthy",
    timestamp: new Date()
  });
});

// Production Healthcheck Endpoint
app.get('/health', async (req, res) => {
  try {
    // Database connection test
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'UP', database: 'CONNECTED' });
  } catch (err) {
    res.status(503).json({ status: 'DOWN', database: 'DISCONNECTED', error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
