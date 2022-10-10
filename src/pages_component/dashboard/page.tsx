import { FormEvent, useCallback } from "react";
import type { NextPage } from "next";
import { Spinner } from "src/component/Spinner";
import { Task, useStore } from "src/lib/hook/useStore";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { Checkbox } from "@mantine/core";
import { IconCirclePlus, IconCopy, IconTrash } from "@tabler/icons";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const Dashboard: NextPage = (props) => {
  const { data: todos, status } = useQueryTodos();
  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>{"Error"}</p>;

  const todayTodos = todos
    ? todos.filter((todo: Task) => todo.dueDate === "today")
    : [];
  const tomorrowTodos = todos
    ? todos.filter((todo: Task) => todo.dueDate === "tomorrow")
    : [];
  const afterTodos = todos
    ? todos.filter((todo: Task) => todo.dueDate === "after")
    : [];

  return (
    <Todos
      todos={todayTodos}
      title={<p className="text-xl font-semibold text-rose-500">今日する</p>}
    />
  );
};

export const Todos = (props: any) => {
  const update = useStore((state) => state.updateEditingTask);
  const { editingTask } = useStore();
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
        dueDate: "today",
        user_id: supabase.auth.user()?.id,
      });
    },
    [editingTask]
  );

  return (
    <div className="min-w-full">
      {props.title}
      <ul className="list-none p-0">
        {props.todos.map((todo: Task) => (
          <Todo
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
            <IconCirclePlus className="mr-1 text-gray-400 align-middle" />
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

/** @package */
export const Todo = (props: any) => {
  const { completeTodoMutation, deleteTodoMutation } = useMutateTodos();

  return (
    <li key={props.id} className="group mb-6 flex justify-between">
      <div className="flex">
        <Checkbox
          id={props.id}
          radius="xl"
          color={props.color}
          className="mt-1 mr-2"
          checked={props.isDone}
          onChange={() =>
            completeTodoMutation.mutate({ id: props.id, isDone: !props.isDone })
          }
        />
        <label
          className={`text-lg ${
            props.isDone ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {props.title}
        </label>
      </div>
      <div className="flex">
        <IconCopy className="items-end h-5 w-5 mt-1 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100" />
        <IconTrash
          className="items-end h-5 w-5 mt-1 ml-4 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100"
          onClick={() => deleteTodoMutation.mutate({ id: props.id })}
        />
      </div>
    </li>
  );
};
