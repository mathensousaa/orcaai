import type { Quote, Client, Company } from "./index";

export type QuoteWithRelations = Quote & {
  client?: Client | null;
  company?: Company | null;
};
