import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Quote, QuoteWithClientAndCompany } from "@/orcamentos/types";
const sb = supabase as any;

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
			const { data, error } = await sb
				.from("quotes")
				.select("*")
				.is("deleted_at", null)
				.order("created_at", { ascending: false });

			if (error) throw error;
			return data || [];
		},
	});
}

export function useQuote(id: string | undefined) {
	return useQuery<QuoteWithClientAndCompany>({
		queryKey: queryKeys.quote(id),
		queryFn: async () => {
			const sb = supabase as any;
			const { data: baseQuote, error } = await sb
				.from("quotes")
				.select("*")
				.eq("id", id)
				.is("deleted_at", null)
				.maybeSingle();

			if (error) throw error;
			if (!baseQuote) return null;

			// Manual relations fetch (no FK required)
			let client = null;
			let company = null;

			if (baseQuote.client_id) {
				const { data: c } = await sb
					.from("clients")
					.select("*")
					.eq("id", baseQuote.client_id)
					.maybeSingle();
				client = c || null;
			}

			if (baseQuote.company_id) {
				const { data: co } = await sb
					.from("companies")
					.select("*")
					.eq("id", baseQuote.company_id)
					.maybeSingle();
				company = co || null;
			}

			return { ...baseQuote, client, company };
		},
		enabled: !!id,
	});
}

// Clients queries
export function useClients() {
	return useQuery({
		queryKey: queryKeys.clients,
		queryFn: async () => {
			const { data, error } = await sb
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
			const { data, error } = await sb
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
			const { data, error } = await sb
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
			const { data, error } = await sb
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
	return useQuery<QuoteWithClientAndCompany[] | undefined>({
		queryKey: ["quotes", "with-relations"] as const,
		queryFn: async () => {
			const { data, error } = await sb
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

			const parsedData = data.map((quote) => ({
				client: quote.clients ?? undefined,
				company: quote.companies ?? undefined,
				...quote,
			}));

			return parsedData || [];
		},
	});
}
