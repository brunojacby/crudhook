import React, { useState } from 'react';
import './App.css'

function App1() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodoIndex, setEditingTodoIndex] = useState(-1);
  const [editTodoText, setEditTodoText] = useState('');

  function handleInputChange(e) {
    setNewTodoText(e.target.value);
  }

  function handleButtonClick() {
    setTodos([...todos, { text: newTodoText, selected: false }]);
    setNewTodoText('');
  }

  function handleClean() {
    setTodos([])
  }

  function handleRemove(key) {
    const newTodos = todos.filter(todo => !todo.selected);
    setTodos(newTodos);
  }

  function handleTodoClick(index) {
    const newTodos = [...todos];
    newTodos[index].selected = !newTodos[index].selected;
    setTodos(newTodos);
  }

  function handleEditButtonClick(index) {
    setEditingTodoIndex(index);
    setEditTodoText(todos[index].text);
  }

  function handleEditInputChange(e) {
    setEditTodoText(e.target.value);
  }

  function handleEditTodo() {
    const newTodos = [...todos];
    newTodos[editingTodoIndex].text = editTodoText;
    setTodos(newTodos);
    setEditingTodoIndex(-1);
    setEditTodoText('');
  }

  return (
    <div className='App'>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Add Todo</button>
      </div>
      <p>
        Todos:
        {todos.map((todo, index) => (
          <div
            key={index}
            style={{ textDecoration: todo.selected ? 'line-through' : 'none' }}
            onClick={() => handleTodoClick(index)}
          >
            {todo.text}
            <button onClick={() => handleEditButtonClick(index)}>Edit</button>
            
          </div>
        ))}
      </p>
      {editingTodoIndex !== -1 && (
        <div>
          <input value={editTodoText} onChange={handleEditInputChange} />
          <button onClick={handleEditTodo}>Save</button>
        </div>
      )}
      <button onClick={handleClean}>Limpar</button>
      <button onClick={handleRemove}>Remove Selected Todo</button>
    </div>
  );
}

export default App1