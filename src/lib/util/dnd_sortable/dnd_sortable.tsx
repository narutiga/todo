import { arrayMove as dndkitArrayMove } from "@dnd-kit/sortable";
import { Todo } from "src/lib/util/useStore/type";

/** @package */
export const removeAtIndex = (array: Todo[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

/** @package */
export const insertAtIndex = (array: Todo[], index: number, item: Todo) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

/** @package */
export const arrayMove = (
  array: string[],
  oldIndex: number,
  newIndex: number
) => {
  return dndkitArrayMove(array, oldIndex, newIndex);
};
