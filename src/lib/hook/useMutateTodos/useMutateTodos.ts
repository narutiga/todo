import { useMutation, useQueryClient } from "react-query";
import { Todo } from "src/lib/util/useStore/type";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const useMutateTodos = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation(
    async (todo: Omit<Todo, "id" | "created_at">) => {
      const { data, error } = await supabase.from("todos").insert(todo);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const completeTodoMutation = useMutation(
    async (todo: { id: string; isDone: boolean }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ isDone: !todo.isDone })
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const updateTodoMutation = useMutation(
    async (todo: Todo) => {
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
      },
    }
  );

  const deleteTodoMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const soartTodoMutation = useMutation(
    async (todo: { id: string; index: number }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ index: todo.index })
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const moveTodoMutation = useMutation(
    async (todo: { id: string; dueDate: string }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ dueDate: todo.dueDate })
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  return {
    createTodoMutation,
    completeTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    soartTodoMutation,
    moveTodoMutation,
  };
};
