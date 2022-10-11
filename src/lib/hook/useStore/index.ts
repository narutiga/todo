import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { State } from "src/lib/hook/useStore/type";
import { createTodosSlice } from "src/lib/hook/useStore/todos";

export const useStore = create<State>()((...args) => {
  return {
    ...createTodosSlice(...args),
  };
});

// export const useStore2 = create<State>()(
//   devtools(
//     immer((...args) => {
//       return {
//         ...createTodosSlice(...args),
//       };
//     })
//   )
// );
