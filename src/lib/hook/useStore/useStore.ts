import create from "zustand";

/** @package */
export type Task = {
  id: string;
  created_at: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  user_id: string | undefined;
};

/** @package */
export type EditingTask = Omit<Task, "created_at" | "user_id">;

type State = {
  editingTask: EditingTask;
  updateEditingTask: (payload: EditingTask) => void;
  resetEditingTask: () => void;
};

/** @package */
export const useStore = create<State>((set) => ({
  editingTask: { id: "", title: "", isDone: false, dueDate: "" },
  updateEditingTask: (payload) =>
    set({
      editingTask: {
        id: payload.id,
        title: payload.title,
        isDone: payload.isDone,
        dueDate: payload.dueDate,
      },
    }),

  resetEditingTask: () =>
    set({ editingTask: { id: "", title: "", isDone: false, dueDate: "" } }),
}));
