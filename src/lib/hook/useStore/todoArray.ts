import { Array, State, Todo } from "src/lib/hook/useStore/type";
import { StateCreator } from "zustand";

/** @package */
export const createArraySlice: StateCreator<
  State,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  Array
> = (set) => ({
  todosArray: {
    today: [],
    tomorrow: [],
    after: [],
  },
  updateTodosArray: (todoData: Todo[] | undefined) =>
    set((payload) => {
      todoData
        ? {
            today: payload.filter((todo: Todo) => todo.dueDate === "today"),
            tomorrow: payload.filter(
              (todo: Todo) => todo.dueDate === "tomorrow"
            ),
            after: payload.filter((todo: Todo) => todo.dueDate === "after"),
          }
        : payload;
    }),
});
