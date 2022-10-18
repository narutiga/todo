import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "src/lib/util/useStore";
import { insertAtIndex, removeAtIndex } from "src/lib/util/dnd_sortable";

/** @package */
export const useDndTodos = (todos: any) => {
  const move = useStore((state) => state.moveTodo);

  const handleDragOver = ({ over, active }: any) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || over;

      let newTodos = moveBetweenContainers(
        todos,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        active.id
      );

      move(newTodos);
    }
  };

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      let newTodos;
      if (activeContainer === overContainer) {
        newTodos = {
          ...todos,
          [overContainer]: arrayMove(
            todos[overContainer as keyof typeof todos],
            activeIndex,
            overIndex
          ),
        };
      } else {
        newTodos = moveBetweenContainers(
          todos,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }

      move(newTodos);
    }
  };

  const moveBetweenContainers = (
    todos: any,
    activeContainer: any,
    activeIndex: any,
    overContainer: any,
    overIndex: any,
    item: any
  ) => {
    return {
      ...todos,
      [activeContainer]: removeAtIndex(todos[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(todos[overContainer], overIndex, item),
    };
  };

  return { handleDragOver, handleDragEnd, moveBetweenContainers };
};
