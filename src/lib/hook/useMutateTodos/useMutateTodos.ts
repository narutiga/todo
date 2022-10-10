import { useMutation, useQueryClient } from "react-query";
import { EditingTask, Task, useStore } from "src/lib/hook/useStore";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const useMutateTodos = () => {
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditingTask);

  const createTodoMutation = useMutation(
    async (todo: Omit<Task, "id" | "created_at">) => {
      const { data, error } = await supabase.from("todos").insert(todo);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          queryClient.setQueriesData(["todos"], [...previousTodos, res[0]]);
        }
        reset();
      },
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
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          const newTodos = previousTodos.map((todo) =>
            todo.id === res[0].id ? { ...todo, isDone: !todo.isDone } : todo
          );
          queryClient.setQueriesData(["todos"], newTodos);
        }
        reset();
      },
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
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["todos"],
            previousTodos.filter((todo) => todo.id !== variables.id)
          );
        }
      },
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
