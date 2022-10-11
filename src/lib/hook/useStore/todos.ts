import { State } from "src/lib/hook/useStore/type";
import { StateCreator } from "zustand";

/** @package */
export const createTodosSlice: StateCreator<
  State,
  [],
  // [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  State
> = (set) => ({
  editingTodoToday: { id: "", title: "", isDone: false, dueDate: "" },
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
      editingTodoToday: { id: "", title: "", isDone: false, dueDate: "" },
    }),

  editingTodoTomorrow: { id: "", title: "", isDone: false, dueDate: "" },
  updateEditingTodoTomorrow: (payload: any) =>
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
      editingTodoTomorrow: { id: "", title: "", isDone: false, dueDate: "" },
    }),

  editingTodoAfter: { id: "", title: "", isDone: false, dueDate: "" },
  updateEditingTodoAfter: (payload: any) =>
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
      editingTodoAfter: { id: "", title: "", isDone: false, dueDate: "" },
    }),
});
