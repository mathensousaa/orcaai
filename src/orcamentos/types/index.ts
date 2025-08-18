// Database types
export interface Database {
	quotes: Quote;
	clients: Client;
	companies: Company;
}

export interface QuoteResponse {
	quoteNumber: string;
	issueDate: string; // formato YYYY-MM-DD
	validUntil: string; // formato YYYY-MM-DD
	client: {
		name: string;
	};
	items: {
		description: string;
		quantity: number;
		unitPrice: number;
		subtotal: number;
	}[];
	financialSummary: {
		total: number;
		finalPrice: number;
	};
	termsAndConditions: {
		deliveryTime: string;
		additionalNotes: string;
	};
}

export interface Quote {
	id: string;
	quote_number: string;
	quote_name: string;
	valid_until: string | null;
	client_id: string | null;
	company_id: string | null;
	subtotal: number;
	total: number;
	profit_margin_percent: number;
	final_price: number;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

export interface Client {
	id: string;
	name: string;
	tax_id: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

export interface Company {
	id: string;
	name: string;
	tax_id: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	logo_url: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

// Form types for creating new records
export interface CreateQuoteForm {
	quote_name: string;
	client_id: string;
	company_id: string | null;
	subtotal: number;
	total: number;
	profit_margin_percent: number;
	final_price: number;
	valid_until?: string;
}

export interface CreateClientForm {
	name: string;
	tax_id?: string;
	email?: string;
	phone?: string;
	address?: string;
}

export interface CreateCompanyForm {
	name: string;
	tax_id?: string;
	email?: string;
	phone?: string;
	address?: string;
	logo_url?: string;
}

// Legacy types for backward compatibility - to be removed gradually
export interface Orcamento {
	id: string;
	cliente: string;
	produto: string;
	quantidade: number;
	descricao: string;
	prazo: string;
	margemLucro: number;
	observacoes: string;
	valorFinal: number;
	dataCreated: string;
	status: "draft" | "approved" | "sent";
}

export interface FormOrcamento {
	cliente: string;
	produto: string;
	quantidade: string;
	descricao: string;
	prazo: string;
	margemLucro: number;
	observacoes: string;
}

export interface OrcamentoContextType {
	orcamentos: Orcamento[];
	orcamentoAtual: Orcamento | null;
	adicionarOrcamento: (form: FormOrcamento) => void;
	setOrcamentoAtual: (orcamento: Orcamento | null) => void;
}
