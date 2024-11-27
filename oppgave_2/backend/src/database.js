import Database from 'better-sqlite3';

// Connect to SQLite database
const db = new Database('./data/database.db', { verbose: console.log });

// Initialize the "arrangements" table
db.exec(`
  CREATE TABLE IF NOT EXISTS arrangements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    maxParticipants INTEGER NOT NULL,
    price TEXT NOT NULL,
    description TEXT
  );
`);

export default db;
