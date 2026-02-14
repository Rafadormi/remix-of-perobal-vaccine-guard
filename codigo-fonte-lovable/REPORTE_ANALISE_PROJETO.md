# Relatórios de Análise de Projeto: SGI Perobal V2 🚀

## 1. Visão Geral

O **SGI Perobal V2** (Sistema de Gestão de Imunobiológicos) é uma aplicação web premium projetada para gerenciar o ciclo de vida de vacinas em Unidades Básicas de Saúde. O sistema foca em usabilidade, precisão de dados e auditoria, utilizando o ecossistema Google como infraestrutura de baixo custo e alta disponibilidade.

---

## 2. Tecnologias e Arquitetura

### Stack Tecnológica

- **Frontend**:
  - **Framework**: React 18 com Vite.
  - **Linguagem**: TypeScript para tipagem estrita e segurança.
  - **Estilização**: Tailwind CSS com componentes [shadcn/ui](https://ui.shadcn.com/).
  - **Ícones**: Lucide React.
  - **Animações**: Framer Motion (substituindo animações CSS padrão onde necessário).
  - **Gráficos**: Recharts.
- **Backend/Hospedagem**:
  - **Google Apps Script (GAS)**: Atua como o servidor e motor de lógica.
  - **Google Sheets**: Utilizado como banco de dados relacional.
- **Build & Cloud**:
  - **CJS Bridge**: Script customizado (`merge-build.cjs`) para converter o build do Vite em um arquivo único `.html` compatível com o GAS.

### Fluxo de Dados

O sistema opera em um modelo híbrido:

1. O frontend é injetado como um Web App do Google.
2. A comunicação ocorre via `google.script.run` para chamadas assíncronas ao motor `.gs` (Backend).
3. Os dados são persistidos em abas estruturadas do Google Sheets.

---

## 3. Análise de Funcionalidades

### 📊 Dashboard Inteligente

Interface centralizada com indicadores de performance (KPIs):

- Total de doses disponíveis e lotes ativos.
- Volume de aplicações diárias com indicadores de tendência.
- Alertas de vencimento (30 dias) e estoque crítico.
- Widget de temperatura em tempo real com status de segurança.

### 💉 Registro de Aplicações

Módulo robusto para entrada de dados de vacinação:

- Validação automática de lotes (apenas lotes com estoque e dentro da validade são exibidos).
- Cadastro por faixa etária e tipo de dose (D1, D2, Reforço, etc.).
- Histórico detalhado de aplicações com auditoria de aplicador.

### 📦 Gestão de Lotes (Estoque)

- Controle de entrada de novas remessas.
- Monitoramento de saldo atual vs. saldo inicial.
- Status visual de validade (Normal, Alerta, Crítico, Vencido).

### 🌡️ Monitoramento de Temperatura

- Registro sistemático de temperaturas de câmaras/geladeiras.
- Gráficos de oscilação para conformidade com normas técnicas da ANVISA/PNI.

### 📉 Controle de Perdas

- Registro de perdas técnicas (sobras de frasco) e não técnicas (falta de energia, quebra de frasco).
- Relatórios de eficiência para gestão da UBS.

---

## 4. Estado Atual e Observações

### Pontos Fortes

- **Design de Elite**: Interface moderna com layout "Glassmorphism" e paleta de cores voltada para saúde (*Deep Healthcare Blue* e *Soft Teal*).
- **Facilidade de Instalação**: O guia `LEIA_ME_INSTALACAO.md` fornece um roteiro claro de 5 passos para deployment.
- **Performance**: O build otimizado (~2.9 MB) garante carregamento rápido mesmo em conexões instáveis.

### Pontos de Atenção (Dívida Técnica)

- **Integração Backend**: Atualmente, os componentes React (`Aplicações.tsx`, `Dashboard.tsx`) ainda dependem de `mockData.ts`. É necessário conectar o estado global do React às funções `getDataFromSheet` e `syncDataFromApp` do backend GAS.
- **Auditoria**: O motor de backend já possui `logAction`, mas a exibição destes logs para o administrador ainda não está implementada no frontend.

---

## 5. Próximos Passos Recomendados

1. **Conectividade Real**: Substituir os dados estáticos (`mockData.ts`) por chamadas reais ao backend.
2. **Modo Offline**: Implementar persistência local (`localStorage` ou `IndexedDB`) para permitir registros durante instabilidades de internet, sincronizando quando houver conexão.
3. **Segurança**: Implementar o fluxo de login real integrado ao backend, substituindo o check estático (admin/admin123).
4. **Relatórios PDF**: Adicionar funcionalidade para gerar relatórios de fechamento mensal em PDF diretamente do navegador.

---
**Relatório gerado por Antigravity AI em 14 de Fevereiro de 2026.**
