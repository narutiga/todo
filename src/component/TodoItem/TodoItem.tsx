import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@mantine/core";
import { IconCopy, IconTrash } from "@tabler/icons";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { useStore } from "src/lib/util/useStore";
import { mockData } from "src/lib/util/useStore/todoArray";
import { Todo } from "src/lib/util/useStore/type";

/** @package */
export const TodoItem = (props: { color: string; todo: Todo }) => {
  const { todosArray } = useStore();
  const { completeTodoMutation, deleteTodoMutation, soartTodoMutation } =
    useMutateTodos();
  const toggle = useStore((state) => state.toggleTodo);
  const trash = useStore((state) => state.deleteTodo);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleDelete = () => {
    const newArray = todosArray[
      props.todo.dueDate as keyof typeof mockData
    ].filter((todo) => todo.id !== props.todo.id);
    trash(props.todo.id);
    deleteTodoMutation.mutate(props.todo.id);
    newArray.map((item, index) =>
      soartTodoMutation.mutate({ id: item.id, index: index })
    );
  };

  return (
    <div
      key={props.todo.id}
      className="group mb-3 flex justify-between"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="flex touch-none">
        <Checkbox
          radius="xl"
          className="mt-1 mr-2"
          id={props.todo.id}
          color={props.color}
          checked={props.todo.isDone}
          onChange={() => {
            toggle(props.todo.id);
            completeTodoMutation.mutate({
              id: props.todo.id,
              isDone: props.todo.isDone,
            });
          }}
        />
        <label
          className={`text-lg ${
            props.todo.isDone ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {props.todo.title}
        </label>
      </div>
      <div className="flex">
        <IconCopy className="items-end h-5 w-5 mt-1 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100" />
        <IconTrash
          className="items-end h-5 w-5 mt-1 ml-4 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
