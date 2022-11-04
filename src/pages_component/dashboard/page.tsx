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
  const set = useStore((state) => state.setTodo);
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
    set(newTodos);
  }, [todos]);

  // 動的な関数の生成
  const handleSubmitFactory = (
    title: string,
    dueDate: string,
    setTitle: any
  ) => {
    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (title === "") {
        return;
      }
      const todo = {
        id: uuidv4(),
        title: title,
        isDone: false,
        dueDate: dueDate,
        index: todosArray.today?.length,
      };
      add(todo);
      createTodoMutation.mutate({
        ...todo,
        user_id: supabase.auth.user()?.id,
      });
      setTitle("");
    };
    return handleSubmit;
  };

  const handleSubmitToday = handleSubmitFactory(
    titleToday,
    "today",
    setTitleToday
  );

  const handleSubmitTomorrow = handleSubmitFactory(
    titleTomorrow,
    "tomorrow",
    setTitleTomorrow
  );

  const handleSubmitAfter = handleSubmitFactory(
    titleAfter,
    "after",
    setTitleAfter
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
