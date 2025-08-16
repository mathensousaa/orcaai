import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Orcamento, FormOrcamento, OrcamentoContextType } from '../types';
import { mockOrcamentos } from '../utils/mockData';

const OrcamentoContext = createContext<OrcamentoContextType | undefined>(undefined);

export const useOrcamento = () => {
  const context = useContext(OrcamentoContext);
  if (!context) {
    throw new Error('useOrcamento deve ser usado dentro de OrcamentoProvider');
  }
  return context;
};

interface OrcamentoProviderProps {
  children: ReactNode;
}

export const OrcamentoProvider: React.FC<OrcamentoProviderProps> = ({ children }) => {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>(mockOrcamentos);
  const [orcamentoAtual, setOrcamentoAtual] = useState<Orcamento | null>(null);

  const adicionarOrcamento = (form: FormOrcamento) => {
    const novoOrcamento: Orcamento = {
      id: Date.now().toString(),
      ...form,
      valorFinal: calcularValorFinal(form.quantidade, form.margemLucro),
      dataCreated: new Date().toISOString(),
      status: 'draft'
    };

    setOrcamentos(prev => [novoOrcamento, ...prev]);
    setOrcamentoAtual(novoOrcamento);
  };

  const calcularValorFinal = (quantidade: number, margemLucro: number): number => {
    // Lógica básica de cálculo - pode ser expandida
    const valorBase = quantidade * 100; // Valor base fictício
    return valorBase * (1 + margemLucro / 100);
  };

  const value: OrcamentoContextType = {
    orcamentos,
    orcamentoAtual,
    adicionarOrcamento,
    setOrcamentoAtual
  };

  return (
    <OrcamentoContext.Provider value={value}>
      {children}
    </OrcamentoContext.Provider>
  );
};