import Todo from "@/components/Todo";
import TodoForm from "@/components/TodoForm";
import { Separator } from "@/components/ui/separator";
import { useTodo } from "@/contexts/TodoContext";

const Todos = () => {
	const { todos } = useTodo();
	return (
		<div className="min-h-screen flex justify-center mt-16">
			<div className="w-full max-w-2xl">
				<div className="text-4xl font-semibold">📝 Todo Manager</div>
				<TodoForm />
				<Separator className="my-4" />
				<div className="flex flex-col gap-3">
					{todos.length > 0 ? (
						todos.map((todo) => {
							return (
								<Todo
									todo={todo}
									key={todo.id}
								/>
							);
						})
					) : (
						<div className="flex justify-center leading-7 [&:not(:first-child)]:mt-6">
							Please Add Todos
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Todos;
