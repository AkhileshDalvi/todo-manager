import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/contexts/TodoContext";
import { cn } from "@/lib/utils";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TodoProps {
	todo: {
		id: string;
		todo: string;
		completed: boolean;
	};
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [title, setTitle] = useState(todo.todo);
	const { editTodo, deleteTodo, toggleComplete } = useTodo();

	useEffect(() => {
		setTitle(todo.todo);
	}, [todo.todo]);

	const updateTodo = () => {
		if (title.trim() !== "") {
			editTodo(todo.id, { ...todo, todo: title.trim() });
			setIsTodoEditable(false);
		}
	};

	const handleToggleComplete = () => {
		toggleComplete(todo.id);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && isTodoEditable) {
			updateTodo();
		} else if (e.key === "Escape" && isTodoEditable) {
			setIsTodoEditable(false);
			setTitle(todo.todo);
		}
	};

	return (
		<div className="flex border p-2 px-3 rounded-md items-center justify-between">
			<div className="flex items-center gap-2 w-full mr-3">
				<Checkbox
					id={`todo-${todo.id}`}
					checked={todo.completed}
					onCheckedChange={handleToggleComplete}
				/>
				<Input
					type="text"
					id={`todo-input-${todo.id}`}
					className={cn(
						"w-full bg-transparent rounded-lg focus-visible:outline-none focus-visible:ring-0",
						isTodoEditable
							? "border focus:ring-2 focus:ring-primary"
							: "border-none outline-none",
						todo.completed && "line-through text-muted-foreground"
					)}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					readOnly={!isTodoEditable}
					onBlur={updateTodo}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="flex gap-2 justify-end">
				<Button
					variant="outline"
					size="icon"
					disabled={todo.completed}
					onClick={() => {
						if (todo.completed) return;
						if (isTodoEditable) {
							updateTodo();
						} else {
							setIsTodoEditable(true);
						}
					}}
					aria-label={isTodoEditable ? "Save todo" : "Edit todo"}
				>
					{isTodoEditable ? (
						<Save className="size-4" />
					) : (
						<Pencil className="size-4" />
					)}
				</Button>
				<Button
					variant="destructive"
					size="icon"
					onClick={() => deleteTodo(todo.id)}
					aria-label="Delete todo"
					disabled={isTodoEditable}
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default Todo;
