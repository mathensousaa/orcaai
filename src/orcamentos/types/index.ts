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
  status: 'draft' | 'approved' | 'sent';
}

export interface FormOrcamento {
  cliente: string;
  produto: string;
  quantidade: number;
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