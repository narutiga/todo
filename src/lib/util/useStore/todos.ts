import { State, Todos } from "src/lib/util/useStore/type";
import { StateCreator } from "zustand";

// , ["zustand/immer", never]

/** @package */
export const createTodosSlice: StateCreator<
  State,
  [["zustand/devtools", never]],
  [],
  Todos
> = (set) => ({
  editingTodoToday: { id: "", title: "", isDone: false, dueDate: "today" },
  updateEditingTodoToday: (payload) =>
    set({
      editingTodoToday: {
        id: payload.id,
        title: payload.title,
        isDone: payload.isDone,
        dueDate: payload.dueDate,
      },
    }),
  resetEditingTodoToday: () =>
    set({
      editingTodoToday: { id: "", title: "", isDone: false, dueDate: "tday" },
    }),

  editingTodoTomorrow: {
    id: "",
    title: "",
    isDone: false,
    dueDate: "tomorrow",
  },
  updateEditingTodoTomorrow: (payload) =>
    set({
      editingTodoTomorrow: {
        id: payload.id,
        title: payload.title,
        isDone: payload.isDone,
        dueDate: payload.dueDate,
      },
    }),
  resetEditingTodoTomorrow: () =>
    set({
      editingTodoTomorrow: {
        id: "",
        title: "",
        isDone: false,
        dueDate: "tomorrow",
      },
    }),

  editingTodoAfter: { id: "", title: "", isDone: false, dueDate: "after" },
  updateEditingTodoAfter: (payload) =>
    set({
      editingTodoAfter: {
        id: payload.id,
        title: payload.title,
        isDone: payload.isDone,
        dueDate: payload.dueDate,
      },
    }),
  resetEditingTodoAfter: () =>
    set({
      editingTodoAfter: { id: "", title: "", isDone: false, dueDate: "after" },
    }),
});
