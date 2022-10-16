import { TodoItem } from "src/component/TodoItem";
import { Todo } from "src/lib/hook/useStore/type";

/** @package */
export const TodoList = (props: any) => {
  return (
    <div className="ml-4 mb-12 w-full md:w-1/3">
      {props.title}
      <ul className="list-none p-0">
        {props.todos.map((todo: Todo) => (
          <TodoItem key={todo.id} color={props.color} todo={todo} />
        ))}
        {props.input}
      </ul>
    </div>
  );
};
