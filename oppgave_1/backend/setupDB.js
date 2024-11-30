var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lms.db');
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS courses (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    title TEXT NOT NULL,\n    description TEXT,\n    category TEXT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n  )");
    db.run("CREATE TABLE IF NOT EXISTS lessons (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    course_id INTEGER,\n    title TEXT NOT NULL,\n    content TEXT,\n    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE\n  )");
    db.run("CREATE TABLE IF NOT EXISTS comments (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    lesson_id INTEGER,\n    content TEXT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE\n  )");
    console.log("Database and tables created successfully!");
});
db.close();
