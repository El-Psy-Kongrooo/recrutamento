import { useState } from "react";

interface TodoProps {
  id: number;
  text: string;
}

export function useTodo(initialTodos: TodoProps[]) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo: TodoProps) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    newTodo.id = newId;
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    // Reassign IDs after deletion
    const updatedTodosWithNewIds = updatedTodos.map((todo, index) => ({
      ...todo,
      id: index + 1,
    }));

    setTodos(updatedTodosWithNewIds);
  };

  return { todos, addTodo, deleteTodo };
}






