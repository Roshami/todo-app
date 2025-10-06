import React, { useState } from 'react';

export default function TaskForm({ onTaskAdded, apiUrl }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    setTitle('');
    setDescription('');
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows="3"
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <div className='form-button-container'>
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </div>
    </form>
  );
}