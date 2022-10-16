import { Array, State } from "src/lib/hook/useStore/type";
import { StateCreator } from "zustand";

// , ["zustand/immer", never]

/** @package */
export const createArraySlice: StateCreator<
  State,
  [["zustand/devtools", never]],
  [],
  Array
> = (set) => ({
  todosArray: [
    { id: "1", title: "test1", isDone: false, dueDate: "today" },
    { id: "2", title: "test2", isDone: false, dueDate: "tomorrow" },
    { id: "3", title: "test3", isDone: false, dueDate: "after" },
  ],
  addTodo: (todo) => {
    set((state) => {
      return {
        todosArray: [...state.todosArray, todo],
      };
    });
  },
  deleteTodo: (id) => {
    set((state) => {
      return {};
    });
  },
  toggleTodo: (id) => {
    set((state) => {
      return {};
    });
  },
});
