import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

global.fetch = jest.fn();

describe('TaskList', () => {
  const mockTasks = [
    { id: 1, title: 'Test Task', description: 'Test Desc' }
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders tasks', () => {
    render(<TaskList tasks={mockTasks} onTaskDone={() => {}} apiUrl="http://test" />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onTaskDone when Done is clicked', async () => {
    const mockOnDone = jest.fn();
    render(<TaskList tasks={mockTasks} onTaskDone={mockOnDone} apiUrl="http://test" />);
    fetch.mockResolvedValue({});

    fireEvent.click(screen.getByText('Done'));
    expect(fetch).toHaveBeenCalledWith('http://test/tasks/1/done', { method: 'PATCH' });
    expect(mockOnDone).toHaveBeenCalled();
  });

  it('calls delete API and refreshes when Delete is clicked', async () => {
  const mockOnDelete = jest.fn();
  render(
    <TaskList
      tasks={[{ id: 1, title: 'Test Task', description: 'Test Desc' }]}
      onTaskDone={() => {}}
      onTaskDeleted={mockOnDelete}
      apiUrl="http://test"
    />
  );

  fetch.mockResolvedValue({ status: 204 });

  // 1️⃣ Click delete icon
  fireEvent.click(screen.getByTestId('delete-1'));

  // 2️⃣ Modal should appear; click "Delete" button
  const confirmButton = await screen.findByText('Delete');
  fireEvent.click(confirmButton);

  expect(fetch).toHaveBeenCalledWith('http://test/tasks/1', { method: 'DELETE' });
  expect(mockOnDelete).toHaveBeenCalled();
});

});



