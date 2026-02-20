# SGI PNI Perobal — Arquitetura do Projeto

> Sistema de Gestão de Imunização do Programa Nacional de Imunização
> Sala de Vacina — Prefeitura Municipal de Perobal, PR

---

## 🎯 Objetivo

Sistema web para gerenciar a sala de vacina municipal, controlando:
- Estoque de vacinas, soros, imunoglobulinas e insumos
- Aplicações de vacinas por dose, faixa etária e profissional
- Registro de perdas (vencimento, quebra, cadeia de frio)
- Monitoramento de temperatura dos equipamentos
- Solicitações mensais de imunobiológicos
- Relatórios e auditoria

---

## 🏗️ Arquitetura

### Frontend (React + Vite + TypeScript)
```
src/
├── pages/           → Páginas da aplicação
├── components/
│   ├── ui/          → Componentes shadcn/ui
│   ├── layout/      → Header, Sidebar, MainLayout
│   └── dashboard/   → Widgets do dashboard
├── data/            → Dados mock (a ser substituído por banco)
├── types/           → Interfaces TypeScript
├── config/          → Configuração da API
└── hooks/           → Hooks customizados
```

### Backend (planejado: Lovable Cloud)
```
Tabelas planejadas:
├── vacinas           → Catálogo de vacinas/soros/imunoglobulinas
├── laboratorios      → Fabricantes/laboratórios
├── lotes_estoque     → Lotes com controle de estoque
├── estoque_minimo    → Quantidades mínimas por item
├── aplicacoes        → Registro de aplicações
├── perdas            → Registro de perdas
├── temperaturas      → Leituras de temperatura
├── checklist_diario  → Verificação de rotinas
├── solicitacoes      → Pedidos mensais
├── movimentacoes     → Entradas/saídas/transferências
├── auditoria         → Log de ações do sistema
└── usuarios          → Profissionais da sala de vacina
```

### Dados Reais
```
dados-reais/          → Dados reais da sala de vacina (base para seed do banco)
```

---

## 📋 Funcionalidades

### ✅ Implementado
| Funcionalidade | Status | Página |
|---|---|---|
| Layout principal (sidebar + header) | ✅ Completo | MainLayout |
| Dashboard com estatísticas | ✅ Completo (mock) | `/` |
| Widget de temperatura | ✅ Completo (mock) | `/` |
| Tabela de status de lotes | ✅ Completo (mock) | `/` |
| Ações rápidas | ✅ Completo | `/` |
| Aplicações recentes | ✅ Completo (mock) | `/` |
| Gestão de lotes | ✅ Completo (mock) | `/lotes` |
| Registro de aplicações | ✅ Completo (mock) | `/aplicacoes` |
| Registro de perdas | ✅ Completo (mock) | `/perdas` |
| Monitoramento de temperatura | ✅ Completo (mock) | `/temperatura` |
| Navegação entre páginas | ✅ Completo | Sidebar |

### 🔲 A Fazer
| Funcionalidade | Prioridade | Descrição |
|---|---|---|
| **Banco de dados real** | 🔴 Alta | Conectar Lovable Cloud, criar tabelas, migrar dados reais |
| **Autenticação** | 🔴 Alta | Login por email/senha para profissionais |
| **Dados reais nas telas** | 🔴 Alta | Substituir mockData por consultas ao banco |
| **Cadastro de pacientes** | 🟡 Média | Vincular aplicações a pacientes |
| **Solicitação de imunos** | 🟡 Média | Formulário mensal de pedidos |
| **Checklist diário** | 🟡 Média | Verificação de rotinas |
| **Relatórios** | 🟡 Média | Relatórios gerenciais e de auditoria |
| **Alertas de vencimento** | 🟡 Média | Notificações para lotes próximos ao vencimento |
| **Alertas de estoque mínimo** | 🟡 Média | Avisos quando estoque abaixo do mínimo |
| **Dashboard com gráficos reais** | 🟢 Baixa | Gráficos de tendências com Recharts |
| **Responsividade mobile** | 🟢 Baixa | Otimizar para tablets e celulares |
| **Exportar PDF/Excel** | 🟢 Baixa | Exportar relatórios |
| **Modo offline** | 🟢 Baixa | PWA com sincronização |

---

## 🗂️ Dados Reais Disponíveis

Os dados reais da sala de vacina estão em `dados-reais/`:
- **68 vacinas/soros/imunoglobulinas** catalogados com composição, fabricante e esquema
- **78 itens** no controle de estoque com lotes e validades
- **37 laboratórios** cadastrados
- **72 itens** com estoque mínimo definido
- **Modelo de solicitação** com 79 itens padrão

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Estilização | Tailwind CSS, shadcn/ui |
| Gráficos | Recharts |
| Formulários | React Hook Form + Zod |
| Roteamento | React Router v6 |
| Backend (planejado) | Lovable Cloud (Supabase) |
| Deploy | Lovable hosting |

---

## 🔄 Próximos Passos Recomendados

1. **Ativar Lovable Cloud** → banco de dados + autenticação
2. **Criar tabelas** com base nos dados reais
3. **Seed do banco** com dados de `dados-reais/`
4. **Substituir mockData** por queries ao banco
5. **Implementar autenticação** para profissionais
6. **Implementar alertas** de vencimento e estoque mínimo
