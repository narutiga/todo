import { useReducer } from "react";

/** @package */
export const useTodos = () => {
  //   const initialState = {
  //     today: [
  //       { id: 1, title: "テスト1", isDone: false, dueDate: "today" },
  //       { id: 2, title: "テスト2", isDone: false, dueDate: "today" },
  //       { id: 3, title: "テスト3", isDone: false, dueDate: "today" },
  //     ],
  //     tomorrow: [
  //       { id: 4, title: "テスト4", isDone: false, dueDate: "tomorrow" },
  //       { id: 5, title: "テスト5", isDone: false, dueDate: "tomorrow" },
  //       { id: 6, title: "テスト6", isDone: false, dueDate: "tomorrow" },
  //     ],
  //     after: [
  //       { id: 7, title: "テスト7", isDone: false, dueDate: "after" },
  //       { id: 8, title: "テスト8", isDone: false, dueDate: "after" },
  //       { id: 9, title: "テスト9", isDone: false, dueDate: "after" },
  //     ],
  //   };

  const initialState = [
    { id: 1, title: "テスト1", isDone: false, dueDate: "today" },
    { id: 2, title: "テスト2", isDone: false, dueDate: "today" },
    { id: 3, title: "テスト3", isDone: false, dueDate: "today" },
    { id: 4, title: "テスト4", isDone: false, dueDate: "tomorrow" },
    { id: 5, title: "テスト5", isDone: false, dueDate: "tomorrow" },
    { id: 6, title: "テスト6", isDone: false, dueDate: "tomorrow" },
    { id: 7, title: "テスト7", isDone: false, dueDate: "after" },
    { id: 8, title: "テスト8", isDone: false, dueDate: "after" },
    { id: 9, title: "テスト9", isDone: false, dueDate: "after" },
  ];

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          ...state,
        };
      case "edit":
        return {
          ...state,
        };
      case "complete":
        return {
          ...state,
        };
      case "delete":
        return {
          ...state,
        };
      case "move":
        return {
          ...state,
        };
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
