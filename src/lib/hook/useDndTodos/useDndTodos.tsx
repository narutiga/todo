import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "src/lib/util/useStore";
import { insertAtIndex, removeAtIndex } from "src/lib/util/dnd_sortable";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { EditingTodo } from "src/lib/util/useStore/type";

/** @package */
export const useDndTodos = (todos: any) => {
  const move = useStore((state) => state.moveTodo);
  const { soartTodoMutation, moveTodoMutation } = useMutateTodos();

  const handleDragOver = ({ over, active }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index || over;

      let newTodos = moveBetweenContainers(
        todos,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        todos[activeContainer][activeIndex]
      );

      move(newTodos);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
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
        newTodos[overContainer].map((item: EditingTodo, index: number) =>
          soartTodoMutation.mutate({ id: item.id, index: index })
        );
      } else {
        newTodos = moveBetweenContainers(
          todos,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          todos[activeContainer][activeIndex]
        );
        newTodos[overContainer].map((item: EditingTodo, index: number) =>
          soartTodoMutation.mutate({ id: item.id, index: index })
        );
        // 元の配列のindex書き換え
        newTodos[activeContainer].map((item: EditingTodo, index: number) =>
          soartTodoMutation.mutate({ id: item.id, index: index })
        );
        // dueDate書き換え
        moveTodoMutation.mutate({
          id: todos[activeContainer][activeIndex].id,
          dueDate: overContainer,
        });
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
