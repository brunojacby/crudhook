import React, { useState } from "react";
import { Form, Table, Button, Container } from "react-bootstrap";
import './App.css'

function App() {

  // Define o estado inicial da lista de tarefas
  const [tasks, setTasks] = useState([
    { id: 1, name: "Comprar pão", done: false },
    { id: 2, name: "Pagar contas", done: true },
    { id: 3, name: "Estudar React", done: false },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
  };

  const handleSaveTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const taskName = form.taskName.value;
    // Atualiza a tarefa com os novos valores
    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTask.id) {
        return {
          ...task,
          name: taskName,
        };
      }
      return task;
    });
    // Atualiza o estado do aplicativo
    setTasks(updatedTasks);
    setEditingTask(null);
  };


  // Adiciona uma nova tarefa à lista
  const handleAddTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      name: event.target.taskName.value,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };
 
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    
    <Container className="container mt-5">
      <Form onSubmit={handleAddTask}>
        <Form.Group controlId="taskName">
          <Form.Label>Nova tarefa</Form.Label>
          <Form.Control type="text" placeholder="Aprender React.js"></Form.Control>
        </Form.Group>
          <Button className="mt-2 mb-4" variant="primary" type="submit">
            Adicionar
          </Button>        
      </Form>
      {editingTask && (
        <Form onSubmit={handleSaveTask}>
          <Form.Group controlId="taskName">
            <Form.Label>Editar tarefa</Form.Label>
            <Form.Control type="text" defaultValue={editingTask.name} />
          </Form.Group>
          <Form.Group className="mt-2">
            <Button variant="secondary" className="me-2" onClick={handleCloseForm}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
            Salvar
          </Button>
          </Form.Group>          
        </Form>
      )}


      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td><Button
                variant={task.done ? "success" : "secondary"}
                onClick={() => handleToggleTask(task.id)}
                >
                {task.done ? "Concluído" : "Não concluído"}
                </Button>
              </td>
                <td>
                  <Button variant="warning" className="me-3" onClick={() => handleEditTask(task)}>
                    Editar
                  </Button>                  
                  <Button variant="danger" onClick={() => handleRemoveTask(task.id)}>
                  Excluir
                  </Button>                  
                </td>
            </tr>
          ))}
        </tbody>        
      </Table>
    </Container>
   
  );
}

export default App;
