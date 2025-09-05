## 📖 Introdução

O **Orça Aí** é um sistema que permite gerar orçamentos de forma rápida e prática utilizando Inteligência Artificial.

Ele foi desenvolvido para atender profissionais de diferentes nichos que precisam criar orçamentos de maneira eficiente e acessível.

O foco da **UX** é a simplicidade, proporcionando uma experiência intuitiva e direta.

---

## 🏗️ Arquitetura

O front-end segue uma arquitetura de **monolito modular**, onde cada módulo possui sua própria estrutura organizada de **componentes, serviços, contextos, types e utils**.

### Estrutura de Pastas

```bash
src
 ┣ components/       # Componentes de UI (baseados em Shadcn + Radix UI)
 ┣ hooks/            # Hooks customizados
 ┣ integrations/     # Integrações externas (Supabase, N8N, etc.)
 ┣ lib/              # Funções utilitárias
 ┣ orcamentos/       # Módulo principal do sistema de orçamentos
 ┃ ┣ components/     # Componentes relacionados a orçamentos
 ┃ ┣ contexts/       # Context API para estado global
 ┃ ┣ services/       # Lógica de requisições e regras de negócio
 ┃ ┣ types/          # Tipagens relacionadas a orçamentos
 ┃ ┗ utils/          # Dados mockados e funções auxiliares
 ┣ pages/            # Páginas principais do sistema
 ┣ shared/           # Componentes e layouts compartilhados
 ┣ App.tsx           # Ponto de entrada principal
 ┣ main.tsx          # Renderização inicial
 ┣ index.css         # Estilos globais
 ┗ vite-env.d.ts     # Tipos do Vite

```

---

## 🛠️ Tecnologias Utilizadas

- **React 18 + TypeScript**
- **TailwindCSS** – Padronização de estilos
- **Radix UI + Shadcn** – Componentes reutilizáveis e acessíveis
- **React Router DOM** – Roteamento
- **React Query** – Gerenciamento de estados assíncronos
- **React Hook Form + Zod** – Criação e validação de formulários
- **Supabase & N8N** – Integrações de APIs externas

---

## 🔗 Integrações

O sistema consome **APIs REST**:

- **Supabase** → Persistência de dados e banco
- **N8N** → Integração com automações e IA

Todas as chamadas são encapsuladas em `services/`, com tratamento de erros exibido via **toasts**.

---

## 🎨 Design System

- Baseado em **Radix UI** e **Shadcn**
- Estilização com **TailwindCSS**
- Componentes reutilizáveis centralizados em `src/components/ui/`

---

## 📄 Páginas e Fluxos

- **Página de Criação de Orçamento**
    - Formulário construído com **React Hook Form + Zod** para validação
- **Página de Orçamento Gerado**
    - Exibição do orçamento pronto gerado pela IA
- **Página de Histórico de Orçamentos**
    - Listagem dos orçamentos já criados

---

## ⚙️ Convenções de Código

- **Prettier + ESLint** → Garantem consistência no código
- **Conventional Commits** → Padrão de mensagens de commit

---

## 🚀 Deploy e Build

- **Plataforma**: Vercel
- **Build Tool**: Vite (executado via `npm run build`)
- **Ambiente**: Não utiliza variáveis de ambiente atualmente

---

## 🧪 Testes

- **Não implementados** nesta versão do sistema

---

## 📈 Futuro e Escalabilidade

- Adicionar **autenticação** (JWT ou OAuth)
- Implementar **testes unitários e e2e** (Jest, Cypress ou Vitest)
- Melhorar modularização com **camadas de domínio**
- Expandir design system com **documentação de componentes**
- Integração com **analytics** para acompanhamento de uso

---

# 📂 Guia Rápido para Desenvolvedores

### Instalação

```bash
git clone <repo-url>
cd orca-ai
npm install
npm run dev

```

### Build

```bash
npm run build

```

### Estrutura Modular

- **UI Components**: `src/components/ui`
- **Módulo Orçamentos**: `src/orcamentos`
- **Layouts e compartilhados**: `src/shared`

---

# ✨ Conclusão

O front-end do **Orça Aí** foi desenvolvido com foco em **rapidez, organização e escalabilidade**.

Seguindo boas práticas de código e arquitetura modular, o sistema está preparado para crescer e receber novas funcionalidades no futuro.
