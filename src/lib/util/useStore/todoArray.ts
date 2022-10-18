import { Array, State } from "src/lib/util/useStore/type";
import { StateCreator } from "zustand";

// , ["zustand/immer", never]

const mockData = {
  today: [
    { id: "1", title: "test1", isDone: false, dueDate: "today" },
    { id: "2", title: "test2", isDone: false, dueDate: "today" },
  ],
  tomorrow: [
    { id: "3", title: "test3", isDone: false, dueDate: "tomorrow" },
    { id: "4", title: "test4", isDone: false, dueDate: "tomorrow" },
  ],
  after: [
    { id: "5", title: "test5", isDone: false, dueDate: "after" },
    { id: "6", title: "test6", isDone: false, dueDate: "after" },
  ],
};

/** @package */
export const createArraySlice: StateCreator<
  State,
  [["zustand/devtools", never]],
  [],
  Array
> = (set) => ({
  todosArray: mockData,
  moveTodo: (payload) =>
    set({
      todosArray: {
        today: payload.today,
        tomorrow: payload.tomorrow,
        after: payload.after,
      },
    }),
  addTodo: (todo) => {
    set((state) => {
      return {};
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
