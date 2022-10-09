import { useReducer } from "react";

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  dueDate: string;
};

/** @package */
export const useTodos = () => {
  const initialState = [
    {
      id: "1",
      title: "テスト1文字が折り返したらどうなるかな？",
      isDone: false,
      dueDate: "today",
    },
    { id: "2", title: "テスト2", isDone: false, dueDate: "today" },
    { id: "3", title: "テスト3", isDone: false, dueDate: "today" },
    { id: "4", title: "テスト4", isDone: false, dueDate: "tomorrow" },
    { id: "5", title: "テスト5", isDone: false, dueDate: "tomorrow" },
    { id: "6", title: "テスト6", isDone: false, dueDate: "tomorrow" },
    { id: "7", title: "テスト7", isDone: false, dueDate: "after" },
    { id: "8", title: "テスト8", isDone: false, dueDate: "after" },
    { id: "9", title: "テスト9", isDone: false, dueDate: "after" },
  ];

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: "10", title: "追加のテスト", isDone: false, dueDate: "after" },
        ];
      case "edit":
        return [...state];
      case "complete":
        const newState = state.map((todo: Todo) =>
          todo.id === action.e.target.id
            ? { ...todo, isDone: !todo.isDone }
            : todo
        );
        return newState;
      case "delete":
        return [...state];
      case "move":
        return [...state];
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAdd = (todo: any) => {
    dispatch({ type: "add", todo });
  };

  const handleComplete = (e: any) => {
    dispatch({ type: "complete", e });
  };

  return {
    state,
    handleAdd,
    handleComplete,
  };
};
