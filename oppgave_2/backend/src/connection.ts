import sqlite3 from 'sqlite3';

// Enable verbose mode for debugging (optional)
const sol3 = sqlite3.verbose();

// Create and connect to the database
const connectDB = new sol3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to the SQLite database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Create the `users` table if it doesn't exist
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
    )
  `;
  connectDB.run(sql, [], (err) => {
    if (err) {
      console.error('Error creating the users table:', err.message);
      return;
    }
    console.log('Users table is ready.');
  });
};

// Call the createTable function to ensure the table is initialized
createTable();

// Export the `connectDB` instance for use in other modules
export { connectDB };
