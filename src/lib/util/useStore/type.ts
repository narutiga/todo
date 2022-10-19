export type Todo = {
  id: string;
  created_at: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  index: number;
  user_id: string | undefined;
};

export type EditingTodo = Omit<Todo, "created_at" | "user_id">;

export type Array = {
  todosArray: {
    today: EditingTodo[];
    tomorrow: EditingTodo[];
    after: EditingTodo[];
  };

  moveTodo: (payload: {
    today: EditingTodo[];
    tomorrow: EditingTodo[];
    after: EditingTodo[];
  }) => void;

  addTodo: (todo: EditingTodo) => void;

  deleteTodo: (todo: EditingTodo) => void;

  toggleTodo: (id: string) => void;
};

export type State = Array;
