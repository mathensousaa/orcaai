import { useMutation } from "@tanstack/react-query";
import type { FormOrcamento } from "../types";

const WEBHOOK_URL = "https://matheussousa.app.n8n.cloud/webhook-test/2d6dc45e-3582-4527-a639-ef248068022b" as const;

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

  // Handle empty or non-JSON responses gracefully
  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
}

export function useEnviarOrcamentoMutation() {
  return useMutation({
    mutationKey: ["orcamentos", "enviar-webhook"],
    mutationFn: postEnviarOrcamento,
  });
}
