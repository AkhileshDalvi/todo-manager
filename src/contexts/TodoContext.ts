import { createContext, useContext } from "react";

type Todo = {
	id: string;
	todo: string; // Adjust this based on your actual todo structure
	completed: boolean;
};

export const TodoContext = createContext({
	todos: [{ id: "1", todo: "Task 1", completed: false }],
	addTodo: (todo: Omit<Todo, "id">) => {
		console.log(`Added todo`, todo);
	},
	editTodo: (id: string, todo: Omit<Todo, "id">) => {
		console.log(`Editing todo with id: ${id}`, todo);
	},
	deleteTodo: (id: string) => {
		console.log(`Deleted todo with id: ${id}`);
	},
	toggleComplete: (id: string) => {
		console.log(`Completed todo with id: ${id}`);
	},
});

export const useTodo = () => {
	return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
