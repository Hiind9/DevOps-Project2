require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const authRoutes = require('./routes/auth.routes');
const dbConfig = require('./config/db.config');

const app = express();

app.use(cors());
app.use(express.json());

let pool; // Global database pool connection

// Initialize Database Connection Pool
const initializeDbPool = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log('✅ Database connection established');
    await initializeDB(); // Initialize tables after a successful connection
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Create users table if it doesn't exist
async function initializeDB() {
  try {
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
      CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL
      );
    `);
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
  }
}

// Routes
app.use('/api/auth', authRoutes);

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await initializeDbPool(); // Establish DB connection on startup
  });

  // Gracefully close DB connection when the app stops
  process.on('SIGINT', async () => {
    console.log('🛑 Closing database connection...');
    if (pool) await pool.close();
    process.exit(0);
  });
}

module.exports = app;
