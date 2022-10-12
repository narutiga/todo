export type Todo = {
  id: string;
  created_at: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  user_id: string | undefined;
};

export type EditingTodo = Omit<Todo, "created_at" | "user_id">;

export type TodosToday = {
  editingTodoToday: EditingTodo;
  updateEditingTodoToday: (payload: EditingTodo) => void;
  resetEditingTodoToday: () => void;
};

export type TodosTomorrow = {
  editingTodoTomorrow: EditingTodo;
  updateEditingTodoTomorrow: (payload: EditingTodo) => void;
  resetEditingTodoTomorrow: () => void;
};

export type TodosAfter = {
  editingTodoAfter: EditingTodo;
  updateEditingTodoAfter: (payload: EditingTodo) => void;
  resetEditingTodoAfter: () => void;
};

export type State = TodosToday & TodosTomorrow & TodosAfter;
