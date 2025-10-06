import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

export default function TaskList({ tasks, onTaskDone, apiUrl, onTaskDeleted }) {
  const [taskToDelete, setTaskToDelete] = useState(null); // ✅ Track ID
  const [taskToMarkDone, setTaskToMarkDone] = useState(null);

  const handleDoneConfirm = async () => {
    if (taskToMarkDone) {
      await fetch(`${apiUrl}/tasks/${taskToMarkDone}/done`, {
        method: 'PATCH',
      });
      onTaskDone();
    }
    setTaskToMarkDone(null);
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      await fetch(`${apiUrl}/tasks/${taskToDelete}`, { method: 'DELETE' });

      onTaskDeleted();
    }
    setTaskToDelete(null);
  };

  if (tasks.length === 0) {
    return <p>No active tasks.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-list-container">
          <div className="task-details">
            <h3>{task.title}</h3>
            <p>{task.description || <em>No description</em>}</p>
          </div>
          <div className="task-action">
            <MdDelete
              data-testid={`delete-${task.id}`}
              className="delete-icon"
              onClick={() => setTaskToDelete(task.id)} // ✅ Save ID
            />
            <button onClick={() => setTaskToMarkDone(task.id)}>Done</button>
          </div>
        </div>
      ))}

      {/* Done Modal */}
      {taskToMarkDone && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Completion</h2>
            <p>Are you sure you want to mark this task as done?</p>
            <div className="modal-buttons">
              <button onClick={() => setTaskToMarkDone(null)}>Cancel</button>
              <button onClick={handleDoneConfirm}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {taskToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button onClick={() => setTaskToDelete(null)}>Cancel</button>
              <button onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
