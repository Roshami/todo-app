const express = require('express');
const mysql = require('mysql2/promise');


const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8080;

// DB config from env
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  port: parseInt(process.env.DB_PORT, 10) || 3306
};


//test DB connection
(async () => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('✅ DB connected');
    conn.end();
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
})();

// Create task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(
      'INSERT INTO task (title, description) VALUES (?, ?)',
      [title, description || '']
    );
    conn.end();
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get 5 most recent uncompleted tasks
app.get('/tasks', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`
      SELECT id, title, description, created_at
      FROM task
      WHERE is_completed = FALSE
      ORDER BY created_at DESC
      LIMIT 5
    `);
    conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Mark task as done
app.patch('/tasks/:id/done', async (req, res) => {
  const id = req.params.id;
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('UPDATE task SET is_completed = TRUE WHERE id = ?', [id]);
    conn.end();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});


// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute('DELETE FROM task WHERE id = ?', [id]);
    conn.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});