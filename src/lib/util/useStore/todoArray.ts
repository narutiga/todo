import { removeAtIndex } from "src/lib/util/dnd_sortable";
import { Array, State } from "src/lib/util/useStore/type";
import { StateCreator } from "zustand";

// , ["zustand/immer", never]

const mockData = {
  today: [],
  tomorrow: [],
  after: [],
};

const mockData1 = {
  today: [
    { id: "1", title: "test1", isDone: false, dueDate: "today", index: 0 },
    { id: "2", title: "test2", isDone: false, dueDate: "today", index: 1 },
  ],
  tomorrow: [
    { id: "3", title: "test3", isDone: false, dueDate: "tomorrow", index: 0 },
    { id: "4", title: "test4", isDone: false, dueDate: "tomorrow", index: 1 },
  ],
  after: [
    { id: "5", title: "test5", isDone: false, dueDate: "after", index: 0 },
    { id: "6", title: "test6", isDone: false, dueDate: "after", index: 1 },
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
          [todo.dueDate]: removeAtIndex(
            state.todosArray[todo.dueDate as keyof typeof mockData],
            todo.index
          ),
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
