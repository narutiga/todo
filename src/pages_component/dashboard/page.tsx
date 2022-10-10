import { FormEvent, useCallback } from "react";
import type { NextPage } from "next";
import { Spinner } from "src/component/Spinner";
import { useStore } from "src/lib/hook/useStore";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { Checkbox } from "@mantine/core";
import { IconCirclePlus, IconTrash } from "@tabler/icons";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

/** @package */
export const Dashboard: NextPage = (props) => {
  const { editingTask } = useStore();
  const update = useStore((state) => state.updateEditingTask);
  const reset = useStore((state) => state.resetEditingTask);
  const { createTodoMutation } = useMutateTodos();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editingTask.title === "") {
        return;
      }
      createTodoMutation.mutate({
        title: editingTask.title,
        isDone: false,
      });
      reset();
    },
    [editingTask]
  );

  const { data: todos, status } = useQueryTodos();
  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>{"Error"}</p>;

  const todayTodos = todos
    ? todos.filter((todo: Todo) => todo.dueDate === "today")
    : [];
  const tomorrowTodos = todos
    ? todos.filter((todo: Todo) => todo.dueDate === "tomorrow")
    : [];
  const afterTodos = todos
    ? todos.filter((todo: Todo) => todo.dueDate === "after")
    : [];

  return (
    <div className="min-w-full md:flex flex-row">
      <ul className="list-none p-0">
        {todayTodos.map((todo) => (
          <Todos
            color="pink"
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            dueDate={todo.isDone}
          />
        ))}
        <li>
          <form action="" method="" onSubmit={handleSubmit}>
            <IconCirclePlus className="text-gray-400 align-middle" />
            <input
              className="border-none focus:outline-none align-middle"
              type="text"
              placeholder="タスクを追加する"
              value={editingTask.title}
              onChange={(e) =>
                update({ ...editingTask, title: e.target.value })
              }
            ></input>
          </form>
        </li>
      </ul>
    </div>
  );
};

export const Todos = (props: any) => {
  const { editingTask } = useStore();
  const { completeTodoMutation, deleteTodoMutation } = useMutateTodos();
  const update = useStore((state) => state.updateEditingTask);
  const toggleComplete = () => {};

  return (
    <li key={props.id} className="group mb-6 flex justify-between">
      <div className="flex">
        <Checkbox
          id={props.id}
          radius="xl"
          color={props.color}
          className="mt-1 mr-2"
          checked={props.isDone}
          onChange={toggleComplete}
        />
        <label
          className={`text-lg ${
            props.isDone ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {props.title}
        </label>
      </div>
      <div>
        <IconTrash
          className="items-end h-5 w-5 m-2 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100"
          onClick={() => deleteTodoMutation.mutate({ id: props.id })}
        />
      </div>
    </li>
  );
};
