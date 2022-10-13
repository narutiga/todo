import { Array, State, TodosArray } from "src/lib/hook/useStore/type";
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
  updateTodosArray: (todoData: TodosArray | undefined) =>
    set((payload) => {
      todoData ? todoData : payload;
    }),
});
