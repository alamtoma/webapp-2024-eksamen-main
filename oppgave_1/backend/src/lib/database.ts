import Database from 'better-sqlite3';

export const connectToDatabase = () => {
  const db = new Database('./database.sqlite', { verbose: console.log });

  // Example table creation
  db.prepare(`
    CREATE TABLE IF NOT EXISTS examples (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `).run();

  return db;
};
