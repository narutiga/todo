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

export type Todos = TodosToday & TodosTomorrow & TodosAfter;

export type Array = {
  todosArray: EditingTodo[];
  addTodo: (todo: EditingTodo) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

export type State = Todos & Array;
