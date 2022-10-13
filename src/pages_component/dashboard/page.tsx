import { FormEvent, useCallback } from "react";
import type { NextPage } from "next";
import { Todo } from "src/lib/hook/useStore/type";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { supabase } from "src/lib/util/supabase";
import { useStore } from "src/lib/hook/useStore";
import { Spinner } from "src/component/Spinner";
import { Checkbox, TextInput } from "@mantine/core";
import { IconCirclePlus, IconCopy, IconTrash } from "@tabler/icons";

/** @package */
export const Dashboard: NextPage = (props) => {
  const updateArray = useStore((state) => state.updateTodosArray);
  const { todosArray } = useStore();
  const updateToday = useStore((state) => state.updateEditingTodoToday);
  const { editingTodoToday } = useStore();
  const updateTomorrow = useStore((state) => state.updateEditingTodoTomorrow);
  const { editingTodoTomorrow } = useStore();
  const updateAfter = useStore((state) => state.updateEditingTodoAfter);
  const { editingTodoAfter } = useStore();

  const { data: todos, status } = useQueryTodos();
  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>{"Error"}</p>;

  updateArray(todos);

  // const todayTodos = todos
  //   ? todos.filter((todo: Todo) => todo.dueDate === "today")
  //   : [];
  // const tomorrowTodos = todos
  //   ? todos.filter((todo: Todo) => todo.dueDate === "tomorrow")
  //   : [];
  // const afterTodos = todos
  //   ? todos.filter((todo: Todo) => todo.dueDate === "after")
  //   : [];

  return (
    <div className="flex-row md:flex w-full">
      <TodoList
        todos={todosArray.today}
        dueDate="today"
        color="pink"
        update={updateToday}
        editingTask={editingTodoToday}
        title={<p className="text-xl font-semibold text-rose-500">今日する</p>}
      />
      <TodoList
        todos={todosArray.tomorrow}
        dueDate="tomorrow"
        color="orange"
        update={updateTomorrow}
        editingTask={editingTodoTomorrow}
        title={
          <p className="text-xl font-semibold text-orange-400">明日する</p>
        }
      />
      <TodoList
        todos={todosArray.after}
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

export const TodoList = (props: any) => {
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
        {props.todos.map((todo: Todo) => (
          <TodoItem
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
            />
          </form>
        </li>
      </ul>
    </div>
  );
};

/** @package */
export const TodoItem = (props: any) => {
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

export const Input = () => {
  return (
    <TextInput
      icon={<IconCirclePlus />}
      placeholder="タスクを追加"
      variant="unstyled"
      radius="md"
      size="md"
    />
  );
};
