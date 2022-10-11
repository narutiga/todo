export type Task = {
  id: string;
  created_at: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  user_id: string | undefined;
};

export type EditingTask = Omit<Task, "created_at" | "user_id">;

export type TodosToday = {
  editingTodoToday: EditingTask;
  updateEditingTodoToday: (payload: EditingTask) => void;
  resetEditingTodoToday: () => void;
};

export type TodosTomorrow = {
  editingTodoTomorrow: EditingTask;
  updateEditingTodoTomorrow: (payload: EditingTask) => void;
  resetEditingTodoTomorrow: () => void;
};

export type TodosAfter = {
  editingTodoAfter: EditingTask;
  updateEditingTodoAfter: (payload: EditingTask) => void;
  resetEditingTodoAfter: () => void;
};

export type State = TodosToday & TodosTomorrow & TodosAfter;
