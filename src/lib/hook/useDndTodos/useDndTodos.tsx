import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "src/lib/util/useStore";
import { insertAtIndex, removeAtIndex } from "src/lib/util/dnd_sortable";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { useMutateTodos } from "src/lib/hook/useMutateTodos";
import { EditingTodo, Todo } from "src/lib/util/useStore/type";

/** @package */
export const useDndTodos = (todos: any) => {
  const set = useStore((state) => state.setTodo);
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
      moveTodoMutation.mutate({
        id: todos[activeContainer][activeIndex].id,
        dueDate: overContainer,
      });
      newTodos[activeContainer].map((item: EditingTodo, index: number) =>
        soartTodoMutation.mutate({ id: item.id, index: index })
      );

      set(newTodos);
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
        newTodos[overContainer].map((item: Todo, index: number) =>
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
        moveTodoMutation.mutate({
          id: todos[overContainer][overIndex].id,
          dueDate: overContainer,
        });
        newTodos[overContainer].map((item: Todo, index: number) =>
          soartTodoMutation.mutate({ id: item.id, index: index })
        );
        newTodos[activeContainer].map((item: EditingTodo, index: number) =>
          soartTodoMutation.mutate({ id: item.id, index: index })
        );
      }
      set(newTodos);
    }
  };

  const moveBetweenContainers = (
    todos: any,
    activeContainer: string,
    activeIndex: number,
    overContainer: string,
    overIndex: number,
    item: Todo
  ) => {
    return {
      ...todos,
      [activeContainer]: removeAtIndex(todos[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(todos[overContainer], overIndex, item),
    };
  };

  return { handleDragOver, handleDragEnd, moveBetweenContainers };
};
