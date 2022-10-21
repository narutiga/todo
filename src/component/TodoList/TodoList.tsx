import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { TodoItem } from "src/component/TodoItem";
import { Todo } from "src/lib/util/useStore/type";

/** @package */
export const TodoList = (props: any) => {
  const { setNodeRef } = useDroppable(props.dueDate);

  return (
    <div className="ml-4 mb-12 w-full md:w-1/3">
      {props.title}
      <SortableContext
        id={props.dueDate}
        items={props.todos}
        strategy={rectSortingStrategy}
      >
        <div className="list-none p-0" ref={setNodeRef}>
          {props.todos.map((todo: Todo) => (
            <TodoItem key={todo.id} color={props.color} todo={todo} />
          ))}
        </div>
      </SortableContext>
      {props.input}
    </div>
  );
};
