import { useMutation, useQueryClient } from "react-query";
import { EditingTask, Task, useStore } from "src/lib/hook/useStore";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const useMutateTodos = () => {
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditingTask);

  const createTodoMutation = useMutation(
    async (todo: Omit<Task, "id" | "created_at" | "dueDate" | "user_id">) => {
      const { data, error } = await supabase
        .from("todos")
        .insert({ ...todo, dueDate: "today" });
      if (error) throw new Error(error.message);
      return data;
    },

    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const completeTodoMutation = useMutation(
    async (todo: { id: string; isDone: boolean }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ isDone: todo.isDone })
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const updateTodoMutation = useMutation(
    async (todo: EditingTask) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: todo.title })
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const deleteTodoMutation = useMutation(
    async (todo: { id: string }) => {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return {
    createTodoMutation,
    completeTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
