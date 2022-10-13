import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { State } from "src/lib/hook/useStore/type";
import { createTodosSlice } from "src/lib/hook/useStore/todos";
import { createArraySlice } from "src/lib/hook/useStore/todoArray";

export const useStore = create<State>()(
  devtools(
    immer((...args) => {
      return {
        ...createArraySlice(...args),
        ...createTodosSlice(...args),
      };
    })
  )
);
