import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/contexts/TodoContext";
import { useState } from "react";

const TodoForm = () => {
	const [todo, setTodo] = useState("");
	const { addTodo } = useTodo();

	const add = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!todo) return;

		addTodo({ todo, completed: false });
		setTodo("");
	};

	return (
		<form
			onSubmit={add}
			className="flex gap-2 rounded-lg pt-8"
		>
			<Input
				type="text"
				placeholder="Enter Todo"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};

export default TodoForm;
