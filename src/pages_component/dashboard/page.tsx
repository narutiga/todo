import type { NextPage } from "next";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { useInputState } from "@mantine/hooks";
import { supabase } from "src/lib/util/supabase";
import { useQueryTodos } from "src/lib/hook/useQueryTodos";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { Spinner } from "src/component/Spinner";
import { TodoList } from "src/component/TodoList/TodoList";
import { InputItem } from "src/component/InputItem";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useStore } from "src/lib/util/useStore";
import { useDndTodos } from "src/lib/hook/useDndTodos";
import { Todo } from "src/lib/util/useStore/type";
import { v4 as uuidv4 } from "uuid";

/** @package */
export const Dashboard: NextPage = (props) => {
  const { todosArray } = useStore();
  const move = useStore((state) => state.moveTodo);
  const add = useStore((state) => state.addTodo);
  const { handleDragEnd, handleDragOver } = useDndTodos(todosArray);
  const [titleToday, setTitleToday] = useInputState("");
  const [titleTomorrow, setTitleTomorrow] = useInputState("");
  const [titleAfter, setTitleAfter] = useInputState("");
  const { createTodoMutation } = useMutateTodos();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const { data: todos, status } = useQueryTodos();
  // if (status === "loading") return <Spinner />;
  // if (status === "error") return <p>{"Error"}</p>;

  const newTodos = {
    today: todos ? todos.filter((todo: Todo) => todo.dueDate === "today") : [],
    tomorrow: todos
      ? todos.filter((todo: Todo) => todo.dueDate === "tomorrow")
      : [],
    after: todos ? todos.filter((todo: Todo) => todo.dueDate === "after") : [],
  };

  useEffect(() => {
    move(newTodos);
  }, [todos]);

  const handleSubmitToday = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (titleToday === "") {
        return;
      }
      const todo = {
        id: uuidv4(),
        title: titleToday,
        isDone: false,
        dueDate: "today",
        index: todosArray.today?.length,
      };
      add(todo);
      createTodoMutation.mutate({
        ...todo,
        user_id: supabase.auth.user()?.id,
      });
      setTitleToday("");
    },
    [titleToday]
  );

  const handleSubmitTomorrow = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (titleTomorrow === "") {
        return;
      }
      const todo = {
        id: uuidv4(),
        title: titleTomorrow,
        isDone: false,
        dueDate: "tomorrow",
        index: todosArray.tomorrow?.length,
      };
      add(todo);
      createTodoMutation.mutate({
        ...todo,
        user_id: supabase.auth.user()?.id,
      });
      setTitleTomorrow("");
    },
    [titleTomorrow]
  );

  const handleSubmitAfter = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (titleAfter === "") {
        return;
      }
      const todo = {
        id: uuidv4(),
        title: titleAfter,
        isDone: false,
        dueDate: "after",
        index: todosArray.after?.length,
      };
      add(todo);
      createTodoMutation.mutate({
        ...todo,
        user_id: supabase.auth.user()?.id,
      });
      setTitleAfter("");
    },
    [titleAfter]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex-row md:flex w-full">
        <TodoList
          todos={todosArray.today}
          dueDate="today"
          color="pink"
          title={
            <p className="text-xl font-semibold text-rose-500">今日する</p>
          }
          input={
            <InputItem
              caret="caret-rose-500"
              todo={titleToday}
              update={setTitleToday}
              handleSubmit={handleSubmitToday}
            />
          }
        />
        <TodoList
          todos={todosArray.tomorrow}
          dueDate="tomorrow"
          color="orange"
          title={
            <p className="text-xl font-semibold text-orange-400">明日する</p>
          }
          input={
            <InputItem
              caret="caret-orange-400"
              todo={titleTomorrow}
              update={setTitleTomorrow}
              handleSubmit={handleSubmitTomorrow}
            />
          }
        />
        <TodoList
          todos={todosArray.after}
          dueDate="after"
          color="yellow"
          title={
            <p className="text-xl font-semibold text-yellow-400">今度する</p>
          }
          input={
            <InputItem
              caret="caret-yellow-400"
              todo={titleAfter}
              update={setTitleAfter}
              handleSubmit={handleSubmitAfter}
            />
          }
        />
      </div>
    </DndContext>
  );
};
