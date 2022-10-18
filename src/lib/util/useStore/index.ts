import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { State } from "src/lib/util/useStore/type";
import { createTodosSlice } from "src/lib/util/useStore/todos";
import { createArraySlice } from "src/lib/util/useStore/todoArray";

export const useStore = create<State>()(
  devtools((...args) => {
    return {
      ...createArraySlice(...args),
      ...createTodosSlice(...args),
    };
  })
);
