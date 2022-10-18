import { useMutation, useQueryClient } from "react-query";
import { EditingTodo, Todo } from "src/lib/util/useStore/type";
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
      // onSuccess: (res) => {
      //   const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      //   if (previousTodos) {
      //     queryClient.setQueriesData(["todos"], [...previousTodos, res[0]]);
      //   }
      // },
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
      // onSuccess: (res) => {
      //   const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      //   if (previousTodos) {
      //     const newTodos = previousTodos.map((todo) =>
      //       todo.id === res[0].id ? { ...todo, isDone: !todo.isDone } : todo
      //     );
      //     queryClient.setQueriesData(["todos"], newTodos);
      //   }
      // },
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const updateTodoMutation = useMutation(
    async (todo: EditingTodo) => {
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
      // onSuccess: (_, variables) => {
      //   const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      //   if (previousTodos) {
      //     queryClient.setQueryData(
      //       ["todos"],
      //       previousTodos.filter((todo) => todo.id !== variables)
      //     );
      //   }
      // },
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
  };
};
