import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";

export function getUser() {
  const { session, profile } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["profiles", { userId: id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}

export function useUpdateUser() {
  // queryClientL: tương tác và thực hiện truy vấn
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data) {
      const { error, data: updatedProduct } = await supabase
        .from("profiles")
        .update({
          username: data.username,
          full_name: data.full_name,
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },

    // Sau khi them thanh cong thi tai lai du lieu
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["profiles"]);
      await queryClient.invalidateQueries(["profiles", id]);
    },
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["profiles", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}
