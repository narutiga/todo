import { useQuery } from "react-query";
import { Task } from "src/lib/useStore";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const useQueryTodos = () => {
  const getTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Task[], Error>({
    queryKey: ["todo"],
    queryFn: getTodos,
    staleTime: Infinity,
  });
};
