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

  deleteTodo: (todo) => {
    set((state) => {
      return {
        todosArray: {
          ...state.todosArray,
          [todo.dueDate]: state.todosArray[
            todo.dueDate as keyof typeof mockData
          ].filter((item) => item.id !== todo.id),
        },
      };
    });
  },

  toggleTodo: (todo) => {
    set((state) => {
      return {
        todosArray: {
          ...state.todosArray,
          [todo.dueDate]: state.todosArray[
            todo.dueDate as keyof typeof mockData
          ].map((item) =>
            item.id === todo.id ? { ...item, isDone: !todo.isDone } : item
          ),
        },
      };
    });
  },

  copyTodo: (prevTodo, newTodo) => {
    set((state) => {
      const previousArray =
        state.todosArray[prevTodo.dueDate as keyof typeof mockData];
      const newArray = [...previousArray];
      newArray.splice(previousArray.indexOf(prevTodo) + 1, 0, newTodo);
      return {
        todosArray: {
          ...state.todosArray,
          [prevTodo.dueDate]: newArray,
        },
      };
    });
  },
});
