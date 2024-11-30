import { Hono } from 'hono';
import { Database } from 'sqlite3';

const db = new Database('lms.db');
const app = new Hono();

// Hent alle kurs
app.get('/courses', (c) => {
    return new Promise((resolve) => {
        db.all('SELECT * FROM courses', (err, rows) => {
            if (err) {
                resolve(c.json({ error: err.message }, 500));
            }
            resolve(c.json(rows));
        });
    });
});

// Legg til nytt kurs
app.post('/courses', async (c) => {
    const { title, description, category } = await c.req.json();
    return new Promise((resolve) => {
        db.run('INSERT INTO courses (title, description, category) VALUES (?, ?, ?)',
            [title, description, category],
            function (err) {
                if (err) {
                    resolve(c.json({ error: err.message }, 500));
                }
                resolve(c.json({ id: this.lastID }));
            }
        );
    });
});

// Slett kurs (inkludert tilhørende leksjoner og kommentarer)
app.delete('/courses/:id', (c) => {
    const { id } = c.req.param();
    return new Promise((resolve) => {
        db.run('DELETE FROM courses WHERE id = ?', [id], function (err) {
            if (err) {
                resolve(c.json({ error: err.message }, 500));
            }
            resolve(c.json({ message: 'Course deleted successfully' }));
        });
    });
});

app.get('/', (c) => c.text('LMS Backend is running!'));

export default app;
