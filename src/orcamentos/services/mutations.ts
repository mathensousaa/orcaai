import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FormOrcamento } from "../types";
import { queryKeys } from "./queries";


const WEBHOOK_URL = "https://n8n.matheusousa.dev/webhook-test/2d6dc45e-3582-4527-a639-ef248068022b" as const;

// Webhook function
async function postEnviarOrcamento(payload: FormOrcamento) {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(errorText || `Falha ao enviar webhook: ${res.status}`);
  }

  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
}

// Database mutations
async function createQuote(data: any) {
  // Generate quote number
  const quoteNumber = `ORÇ-${Date.now()}`;
  
  const sb = supabase as any;
  const { data: quote, error } = await sb
    .from("quotes")
    .insert({
      ...data,
      quote_number: quoteNumber,
    })
    .select()
    .single();

  if (error) throw error;
  return quote;
}

async function createClient(data: any) {
  const sb = supabase as any;
  const { data: client, error } = await sb
    .from("clients")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return client;
}

async function createCompany(data: any) {
  const sb = supabase as any;
  const { data: company, error } = await sb
    .from("companies")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return company;
}

async function deleteQuote(id: string) {
  const sb = supabase as any;
  const { error } = await sb
    .from("quotes")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

// Mutation hooks
export function useCreateQuoteMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes });
    },
  });
}

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients });
    },
  });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies });
    },
  });
}

export function useDeleteQuoteMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes });
    },
  });
}

export function useEnviarOrcamentoMutation() {
  return useMutation({
    mutationKey: ["orcamentos", "enviar-webhook"],
    mutationFn: postEnviarOrcamento,
  });
}
