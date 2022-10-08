import { NextPage } from "next";
import { useTodos } from "src/lib/hook/useTodos";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

/** @package */
export const Index: NextPage = (props) => {
  const { state, handleComplete } = useTodos();
  const todayTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "today")
    : null;
  const tomorrowTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "tomorrow")
    : null;
  const afterTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "after")
    : null;

  return (
    <div className="min-w-full flex">
      <Todos
        array={todayTodos}
        title={<p className="text-2xl text-rose-500 font-semibold">今日する</p>}
        handleComplete={handleComplete}
      />
      <Todos
        array={tomorrowTodos}
        title={
          <p className="text-2xl text-orange-400 font-semibold">明日する</p>
        }
        handleComplete={handleComplete}
      />
      <Todos
        array={afterTodos}
        title={
          <p className="text-2xl text-yellow-400 font-semibold">今度する</p>
        }
        handleComplete={handleComplete}
      />
    </div>
  );
};

export const Todos = (props: any) => {
  return (
    <div className="w-1/3">
      {props.title}
      <ul className="list-none p-0">
        {props.array.map((todo: Todo) => (
          <li key={todo.id} className="mb-6 text-left">
            <label
              className={`text-xl ${
                todo.isDone ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              <input
                className="mr-4"
                id={todo.id}
                type="checkbox"
                value={todo.title}
                checked={todo.isDone}
                onChange={(e) => {
                  props.handleComplete(e);
                }}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
