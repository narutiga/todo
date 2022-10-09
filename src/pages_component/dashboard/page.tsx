import { Checkbox } from "@mantine/core";
import { IconCirclePlus, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import { useTodos } from "src/lib/hook/useTodos";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

/** @package */
export const Dashboard: NextPage = (props) => {
  const { state, handleAdd, handleComplete } = useTodos();
  const todayTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "today")
    : [];
  const tomorrowTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "tomorrow")
    : [];
  const afterTodos = state
    ? state.filter((todo: Todo) => todo.dueDate === "after")
    : [];

  return (
    <div className="min-w-full md:flex flex-row">
      <Todos
        color="pink"
        array={todayTodos}
        title={<p className="text-xl text-rose-500 font-semibold">今日する</p>}
        handleComplete={handleComplete}
        handleAdd={handleAdd}
      />
      <Todos
        color="orange"
        array={tomorrowTodos}
        title={
          <p className="text-xl text-orange-400 font-semibold">明日する</p>
        }
        handleComplete={handleComplete}
      />
      <Todos
        color="yellow"
        array={afterTodos}
        title={
          <p className="text-xl text-yellow-400 font-semibold">今度する</p>
        }
        handleComplete={handleComplete}
      />
    </div>
  );
};

export const Todos = (props: any) => {
  return (
    <div className="px-4 w-full lg:w-1/3">
      {props.title}
      <ul className="list-none p-0">
        {props.array.length === 0 ? (
          <li>
            <form action="" method="" onSubmit={props.handleAdd}>
              <IconCirclePlus className="text-gray-400 align-middle" />
              <input
                className="border-none focus:outline-none align-middle"
                type="text"
                placeholder="タスクを追加する"
                required
              ></input>
            </form>
          </li>
        ) : (
          props.array.map((todo: Todo) => (
            <li key={todo.id} className="group mb-6 flex justify-between">
              <div className="flex">
                <Checkbox
                  id={todo.id}
                  radius="xl"
                  color={props.color}
                  className="mt-1 mr-2"
                  checked={todo.isDone}
                  onClick={(e) => {
                    props.handleComplete(e);
                  }}
                />
                {/* <input
                className="mr-4 align-top"
                id={todo.id}
                type="checkbox"
                value={todo.title}
                checked={todo.isDone}
                onClick={(e) => {
                  props.handleComplete(e);
                }}
              /> */}
                <label
                  className={`text-lg ${
                    todo.isDone ? "text-gray-400 line-through" : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </label>
              </div>
              <div>
                <IconTrash className="items-end h-5 w-5 m-2 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100" />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
