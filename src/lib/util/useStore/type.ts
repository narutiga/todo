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

  deleteTodo: (todo: Todo) => void;

  toggleTodo: (todo: Todo) => void;

  copyTodo: (prevTodo: Todo, newTodo: Todo) => void;
};

export type State = Array;
