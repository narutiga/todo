import { NextPage } from "next";
import { useTodos } from "src/lib/hook/useTodos";
import { Checkbox } from "@mantine/core";

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  dueDate: string;
};

/** @package */
export const Index: NextPage = (props) => {
  const { state } = useTodos();
  const todayTodos = state.filter((todo: Todo) => todo.dueDate === "today");
  const tomorrowTodos = state.filter(
    (todo: Todo) => todo.dueDate === "tomorrow"
  );
  const afterTodos = state.filter((todo: Todo) => todo.dueDate === "after");

  return (
    <div className="w-full  flex">
      <Todos array={todayTodos} title="今日する" />
      <Todos array={tomorrowTodos} title="明日する" />
      <Todos array={afterTodos} title="後でする" />
    </div>
  );
};

export const Todos = (props: any) => {
  const { handleComplete } = useTodos();

  return (
    <div>
      <p>{props.title}</p>
      <ul className="list-none">
        {props.array.map((todo: Todo) => (
          <li key={todo.id} className="mb-6">
            <Checkbox
              label={props.title}
              color="red"
              radius="xl"
              size="md"
              checked={todo.isDone}
              onChange={(e) => {
                handleComplete(e);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
