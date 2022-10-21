import { Array, State } from "src/lib/util/useStore/type";
import { StateCreator } from "zustand";

// , ["zustand/immer", never]

export const mockData = {
  today: [],
  tomorrow: [],
  after: [],
};

/** @package */
export const createArraySlice: StateCreator<
  State,
  [["zustand/devtools", never]],
  [],
  Array
> = (set) => ({
  todosArray: mockData,

  moveTodo: (newTodos) =>
    set({
      todosArray: {
        today: newTodos.today,
        tomorrow: newTodos.tomorrow,
        after: newTodos.after,
      },
    }),

  addTodo: (todo) => {
    set((state) => {
      return {
        todosArray: {
          ...state.todosArray,
          [todo.dueDate]: [
            ...state.todosArray[todo.dueDate as keyof typeof mockData],
            todo,
          ],
        },
      };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      return {
        todosArray: {
          ...state.todosArray,
          today: state.todosArray["today"].filter((todo) => todo.id !== id),
          tomorrow: state.todosArray["tomorrow"].filter(
            (todo) => todo.id !== id
          ),
          after: state.todosArray["after"].filter((todo) => todo.id !== id),
        },
      };
    });
  },

  toggleTodo: (id) => {
    set((state) => {
      return {
        todosArray: {
          ...state.todosArray,
          today: state.todosArray.today.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
          tomorrow: state.todosArray.tomorrow.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
          after: state.todosArray.after.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
        },
      };
    });
  },
});
