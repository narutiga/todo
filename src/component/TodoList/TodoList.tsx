import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { ReactElement } from "react";
import { TodoItem } from "src/component/TodoItem";
import { Todo } from "src/lib/util/useStore/type";

type Props = {
  todos: Todo[];
  dueDate: string;
  color: string;
  title: ReactElement;
  input: ReactElement;
};

/** @package */
export const TodoList = (props: Props) => {
  const { setNodeRef } = useDroppable({ id: props.dueDate });

  return (
    <div className="ml-4 mb-12 w-full md:w-1/3">
      {props.title}
      <SortableContext
        id={props.dueDate}
        items={props.todos}
        strategy={rectSortingStrategy}
      >
        <div className="pt-4 min-h-4 p-0" ref={setNodeRef}>
          {props.todos.map((todo: Todo) => (
            <TodoItem key={todo.id} color={props.color} todo={todo} />
          ))}
        </div>
      </SortableContext>
      {props.input}
    </div>
  );
};
