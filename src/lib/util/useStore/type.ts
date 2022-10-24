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
    today: Todo[];
    tomorrow: Todo[];
    after: Todo[];
  };

  moveTodo: (payload: {
    today: Todo[];
    tomorrow: Todo[];
    after: Todo[];
  }) => void;

  addTodo: (todo: EditingTodo) => void;

  deleteTodo: (id: string) => void;

  toggleTodo: (id: string) => void;
};

export type State = Array;
