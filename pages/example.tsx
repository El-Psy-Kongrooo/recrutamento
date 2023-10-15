import { useTodo } from "@/lib/frontend/hooks";
import { useEffect, useState } from "react";
import { Button, Title } from "@mantine/core";
import IST_Logo from '../assets/Ist_Logo.png';

interface TodoProps {
  id: number;
  text: string;
}

export default function Todo() {
  const [inputFocused, setInputFocused] = useState(false);
  const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const { todos, addTodo, deleteTodo } = useTodo([
    { id: 1, text: "Todo #1" },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddTodo = () => {
    if (inputValue.trim() !== '' && inputValue.length <= 30) {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
      };
      addTodo(newTodo);
      setInputValue(''); // Clear the input box after adding
    } if(inputValue.length>30) {
      setErrorMessage("*Excedeste o limite de caracteres (30) "); // Set error message
    }if (inputValue.trim() == ''){
      setErrorMessage("*Esqueceste de escrever qualquer coisa");  // Set error message
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
  };

  useEffect(() => {
    console.log("todos changed:", todos);
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setErrorMessage(null); // Clear the error message when input changes
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleTodoHover = (todoId: number) => {
    setHoveredTodo(todoId);
  };

  const handleTodoLeave = () => {
    setHoveredTodo(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-400">
      <div>
        <img src={IST_Logo.src} alt="Ist Logo" className="w-32 h-34" />
      </div>
      <div>
        <Title className="mt-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "white" }}>
          To-do List
        </Title>
      </div>
      <div className="h-fit w-1/3 rounded-lg border-4 bg-white border-blue-500">
        <div className="h-16 p-4 border-b flex flex-row items-center">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
            className={`w-80 ${
              inputFocused ? '' : 'hover:bg-gray-300 rounded-lg border'
            }`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <Button onClick={handleAddTodo} style={{ marginLeft: 'auto' }}>
            Add new item
          </Button>

        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <div className="h-96 p-4 flex flex-col gap-2 overflow-y-scroll">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="w-full border rounded-lg flex flex-row items-center justify-between p-4"
              onMouseEnter={() => handleTodoHover(todo.id)} // Handle hover
              onMouseLeave={handleTodoLeave} // Handle mouse leave
            >
              <h2 className="text-xl font-semibold">{todo.text}</h2>
              <Button
                bg="red"
                onClick={() => handleDeleteTodo(todo.id)}
                style={{ opacity: hoveredTodo === todo.id ? 1 : 0 }} // Set opacity based on hover state
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
