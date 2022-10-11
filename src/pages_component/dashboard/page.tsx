import { FormEvent, useCallback } from "react";
import type { NextPage } from "next";
import { Task } from "src/lib/hook/useStore/type";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { supabase } from "src/lib/util/supabase";
import { useStore } from "src/lib/hook/useStore";
import { Spinner } from "src/component/Spinner";
import { Checkbox } from "@mantine/core";
import { IconCirclePlus, IconCopy, IconTrash } from "@tabler/icons";

/** @package */
export const Dashboard: NextPage = (props) => {
  const updateToday = useStore((state) => state.updateEditingTodoToday);
  const { editingTodoToday } = useStore();
  const updateTomorrow = useStore((state) => state.updateEditingTodoTomorrow);
  const { editingTodoTomorrow } = useStore();
  const updateAfter = useStore((state) => state.updateEditingTodoAfter);
  const { editingTodoAfter } = useStore();

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
    <div className="flex-row md:flex w-full">
      <Todos
        todos={todayTodos}
        dueDate="today"
        color="pink"
        update={updateToday}
        editingTask={editingTodoToday}
        title={<p className="text-xl font-semibold text-rose-500">今日する</p>}
      />
      <Todos
        todos={tomorrowTodos}
        dueDate="tomorrow"
        color="orange"
        update={updateTomorrow}
        editingTask={editingTodoTomorrow}
        title={
          <p className="text-xl font-semibold text-orange-400">明日する</p>
        }
      />
      <Todos
        todos={afterTodos}
        dueDate="after"
        color="yellow"
        update={updateAfter}
        editingTask={editingTodoAfter}
        title={
          <p className="text-xl font-semibold text-yellow-400">今度する</p>
        }
      />
    </div>
  );
};

export const Todos = (props: any) => {
  const { createTodoMutation } = useMutateTodos();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (props.editingTask.title === "") {
        return;
      }
      createTodoMutation.mutate({
        title: props.editingTask.title,
        isDone: false,
        dueDate: props.dueDate,
        user_id: supabase.auth.user()?.id,
      });
    },
    [props.editingTask]
  );

  return (
    <div className="ml-4 mb-12 w-full md:w-1/3">
      {props.title}
      <ul className="list-none p-0">
        {props.todos.map((todo: Task) => (
          <Todo
            key={todo.id}
            color={props.color}
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
              value={props.editingTask.title}
              onChange={(e) =>
                props.update({ ...props.editingTask, title: e.target.value })
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
    <li key={props.id} className="group mb-3 flex justify-between">
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
        <IconCopy className="items-end h-5 w-5 mt-1 cursor-pointer text-gray-400 opacity-0 mb:group-hover:opacity-100" />
        <IconTrash
          className="items-end h-5 w-5 mt-1 ml-4 cursor-pointer text-gray-400 opacity-0 mb:group-hover:opacity-100"
          onClick={() => deleteTodoMutation.mutate({ id: props.id })}
        />
      </div>
    </li>
  );
};
