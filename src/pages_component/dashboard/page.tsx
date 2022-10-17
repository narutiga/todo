import type { NextPage } from "next";
import { FormEvent, useCallback } from "react";
import { useInputState } from "@mantine/hooks";
import { supabase } from "src/lib/util/supabase";
import { EditingTodo } from "src/lib/hook/useStore/type";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { Spinner } from "src/component/Spinner";
import { TodoList } from "src/component/TodoList/TodoList";
import { InputItem } from "src/component/InputItem";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/** @package */
export const Dashboard: NextPage = (props) => {
  const [todoToday, setTodoToday] = useInputState("");
  const [todoTomorrow, setTodoTomorrow] = useInputState("");
  const [todoAfter, setTodoAfter] = useInputState("");
  const { createTodoMutation } = useMutateTodos();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleSubmitToday = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoToday === "") {
        return;
      }
      createTodoMutation.mutate({
        title: todoToday,
        isDone: false,
        dueDate: "today",
        index: todayTodos.length,
        user_id: supabase.auth.user()?.id,
      });
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
      createTodoMutation.mutate({
        title: todoTomorrow,
        isDone: false,
        dueDate: "tomorrow",
        index: tomorrowTodos.length,
        user_id: supabase.auth.user()?.id,
      });
      setTodoTomorrow("");
    },
    [todoTomorrow]
  );

  const handleSubmitAfter = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoAfter === "") {
        return;
      }
      createTodoMutation.mutate({
        title: todoAfter,
        isDone: false,
        dueDate: "after",
        index: afterTodos.length,
        user_id: supabase.auth.user()?.id,
      });
      setTodoAfter("");
    },
    [todoAfter]
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
    <DndContext sensors={sensors}>
      <div className="flex-row md:flex w-full">
        <TodoList
          todos={todayTodos}
          dueDate="today"
          color="pink"
          title={
            <p className="text-xl font-semibold text-rose-500">今日する</p>
          }
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
    </DndContext>
  );
};
