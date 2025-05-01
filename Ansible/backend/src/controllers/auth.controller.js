const bcrypt = require('bcryptjs');
const sql = require('mssql');
const dbConfig = require('../config/db.config');
const { validationResult } = require('express-validator');

let pool;

const getPool = async () => {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
};

const signup = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  
  try {
    const pool = await getPool();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (email, password) VALUES (@email, @password)');
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Check for duplicate email error
    if (error.number === 2627) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const user = result.recordset[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { signup, login };
