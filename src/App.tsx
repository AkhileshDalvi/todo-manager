import Todos from "@/components/Todos";
import { TodoProvider } from "@/contexts/TodoContext.ts";
import { useEffect, useState } from "react";

type Todo = {
	id: string;
	todo: string; // Adjust this based on your actual todo structure
	completed: boolean;
};

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (todo: Omit<Todo, "id">) => {
		setTodos((prev) => [{ id: Date.now().toString(), ...todo }, ...prev]);
	};

	const editTodo = (id: string, updatedTodo: Omit<Todo, "id">) => {
		setTodos((prev) =>
			prev.map(
				(prevTodo) => (prevTodo.id === id ? { ...updatedTodo, id } : prevTodo) // Include the id in the updated todo
			)
		);
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
	};

	const toggleComplete = (id: string) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id
					? { ...prevTodo, completed: !prevTodo.completed }
					: prevTodo
			)
		);
	};

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos"); // Get the item from localStorage
		if (storedTodos) {
			// Check if storedTodos is not null
			const todos = JSON.parse(storedTodos); // Now it's safe to parse
			if (todos && todos.length > 0) setTodos(todos);
		}
	}, []);

	return (
		<TodoProvider
			value={{ todos, addTodo, editTodo, deleteTodo, toggleComplete }}
		>
			<Todos />
		</TodoProvider>
	);
}

export default App;
