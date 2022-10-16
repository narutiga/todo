import type { NextPage } from "next";
import { FormEvent, useCallback } from "react";
import { useInputState } from "@mantine/hooks";
import { EditingTodo } from "src/lib/hook/useStore/type";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { useStore } from "src/lib/hook/useStore";
import { Spinner } from "src/component/Spinner";
import { TodoList } from "src/component/TodoList/TodoList";
import { InputItem } from "src/component/InputItem";

/** @package */
export const Dashboard: NextPage = (props) => {
  const { todosArray } = useStore();
  const [todoToday, setTodoToday] = useInputState("");
  const [todoTomorrow, setTodoTomorrow] = useInputState("");
  const [todoAfter, setTodoAfter] = useInputState("");
  const add = useStore((state) => state.addTodo);

  const handleSubmitToday = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoToday === "") {
        return;
      }
      add({ id: "", title: todoToday, isDone: false, dueDate: "today" });
      setTodoToday("");
    },
    [todoToday]
  );

  const handleSubmitTomorrow = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoTomorrow === "") {
        return;
      }
      add({ id: "", title: todoTomorrow, isDone: false, dueDate: "tomorrow" });
      setTodoTomorrow("");
    },
    [todoToday]
  );

  const handleSubmitAfter = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoAfter === "") {
        return;
      }
      add({ id: "", title: todoAfter, isDone: false, dueDate: "after" });
      setTodoAfter("");
    },
    [todoToday]
  );

  const { data: todos, status } = useQueryTodos();
  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>{"Error"}</p>;

  const todayTodos = todos
    ? todos.filter((todo: EditingTodo) => todo.dueDate === "today")
    : [];
  const tomorrowTodos = todos
    ? todos.filter((todo: EditingTodo) => todo.dueDate === "tomorrow")
    : [];
  const afterTodos = todos
    ? todos.filter((todo: EditingTodo) => todo.dueDate === "after")
    : [];

  return (
    <div className="flex-row md:flex w-full">
      <TodoList
        todos={todayTodos}
        dueDate="today"
        color="pink"
        title={<p className="text-xl font-semibold text-rose-500">今日する</p>}
        input={
          <InputItem
            todo={todoToday}
            update={setTodoToday}
            handleSubmit={handleSubmitToday}
          />
        }
      />
      <TodoList
        todos={tomorrowTodos}
        dueDate="tomorrow"
        color="orange"
        title={
          <p className="text-xl font-semibold text-orange-400">明日する</p>
        }
        input={
          <InputItem
            todo={todoTomorrow}
            update={setTodoTomorrow}
            handleSubmit={handleSubmitTomorrow}
          />
        }
      />
      <TodoList
        todos={afterTodos}
        dueDate="after"
        color="yellow"
        title={
          <p className="text-xl font-semibold text-yellow-400">今度する</p>
        }
        input={
          <InputItem
            todo={todoAfter}
            update={setTodoAfter}
            handleSubmit={handleSubmitAfter}
          />
        }
      />
    </div>
  );
};
