import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CreateClientData {
  name: string;
  phone?: string;
  email?: string;
}

export const useClients = (search?: string) => {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      let query = supabase
        .from("clients")
        .select("*")
        .order("name");

      if (search && search.trim()) {
        query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !search || search.length >= 2, // Só busca se tiver pelo menos 2 caracteres
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateClientData) => {
      const { data: client, error } = await supabase
        .from("clients")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};