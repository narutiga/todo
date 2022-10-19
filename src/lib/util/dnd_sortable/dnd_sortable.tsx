import { arrayMove as dndkitArrayMove } from "@dnd-kit/sortable";

/** @package */
export const removeAtIndex = (array: any, index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

/** @package */
export const insertAtIndex = (array: any, index: any, item: any) => {
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
