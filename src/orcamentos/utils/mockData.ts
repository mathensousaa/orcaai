import { Orcamento } from '../types';

export const mockOrcamentos: Orcamento[] = [
  {
    id: '1',
    cliente: 'João Silva',
    produto: 'Website Institucional',
    quantidade: 1,
    descricao: 'Desenvolvimento de website institucional responsivo com 5 páginas, sistema de contato e integração com redes sociais.',
    prazo: '15 dias',
    margemLucro: 25,
    observacoes: 'Inclui hospedagem por 1 ano e domínio .com.br',
    valorFinal: 2500.00,
    dataCreated: '2024-01-15T10:30:00.000Z',
    status: 'approved'
  },
  {
    id: '2',
    cliente: 'Maria Santos',
    produto: 'Sistema de Gestão',
    quantidade: 1,
    descricao: 'Sistema completo de gestão empresarial com módulos de vendas, estoque, financeiro e relatórios.',
    prazo: '45 dias',
    margemLucro: 30,
    observacoes: 'Treinamento da equipe incluso. Suporte técnico por 6 meses.',
    valorFinal: 8750.00,
    dataCreated: '2024-01-10T14:15:00.000Z',
    status: 'sent'
  },
  {
    id: '3',
    cliente: 'Tech Solutions LTDA',
    produto: 'Aplicativo Mobile',
    quantidade: 2,
    descricao: 'Desenvolvimento de aplicativo móvel para Android e iOS com backend completo, sistema de login e notificações push.',
    prazo: '60 dias',
    margemLucro: 35,
    observacoes: 'Publicação nas lojas Apple Store e Google Play incluída.',
    valorFinal: 15000.00,
    dataCreated: '2024-01-08T09:00:00.000Z',
    status: 'draft'
  }
];