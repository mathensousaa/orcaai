import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// @ts-ignore - Ignore Supabase type errors temporarily
const supabaseAny = supabase as any;

// Query keys
export const queryKeys = {
  quotes: ["quotes"] as const,
  quote: (id: string) => ["quotes", id] as const,
  clients: ["clients"] as const,
  client: (id: string) => ["clients", id] as const,
  companies: ["companies"] as const,
  company: (id: string) => ["companies", id] as const,
};

// Quotes queries
export function useQuotes() {
  return useQuery({
    queryKey: queryKeys.quotes,
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("quotes")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: queryKeys.quote(id),
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("quotes")
        .select("*")
        .eq("id", id)
        .is("deleted_at", null)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Clients queries
export function useClients() {
  return useQuery({
    queryKey: queryKeys.clients,
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("clients")
        .select("*")
        .is("deleted_at", null)
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: queryKeys.client(id),
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("clients")
        .select("*")
        .eq("id", id)
        .is("deleted_at", null)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Companies queries
export function useCompanies() {
  return useQuery({
    queryKey: queryKeys.companies,
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("companies")
        .select("*")
        .is("deleted_at", null)
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: queryKeys.company(id),
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("companies")
        .select("*")
        .eq("id", id)
        .is("deleted_at", null)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Quotes with relations
export function useQuotesWithRelations() {
  return useQuery({
    queryKey: ["quotes", "with-relations"] as const,
    queryFn: async () => {
      const { data, error } = await supabaseAny
        .from("quotes")
        .select(`
          *,
          clients (
            id,
            name,
            email,
            phone
          ),
          companies (
            id,
            name,
            email,
            logo_url
          )
        `)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}