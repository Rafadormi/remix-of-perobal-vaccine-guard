# Dados Reais - Sala de Vacina de Perobal

Estes arquivos contêm dados reais da Sala de Vacina da Prefeitura Municipal de Perobal.
São a base para popular o banco de dados do sistema.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `catalogo-vacinas-soros-imunoglobulinas.csv` | Catálogo completo de vacinas, soros e imunoglobulinas do PNI com composição, fabricantes, apresentação, dose, grupos-alvo e esquema |
| `entrada-e-saida-estoque.txt` | Movimentação de estoque (entradas/saídas/perdas) do mês de outubro/2025 |
| `controle-estoque-mensal.txt` | Formulário de controle de estoque mensal com saldo anterior e atual |
| `estoque-atual-07-02-2026.txt` | Snapshot do estoque em 07/02/2026 |
| `lista-laboratorios.txt` | Lista de todos os laboratórios/fabricantes cadastrados |
| `modelo-solicitacao-imunos.txt` | Modelo do formulário de solicitação mensal de imunos e insumos |
| `vacinas-estoque-minimo.txt` | Estoque mínimo definido para cada vacina/insumo |

## Estrutura de Banco de Dados Sugerida

Esses dados mapeiam para as seguintes tabelas:

### `vacinas` (Catálogo)
- id, nome, tipo_composicao, fabricante, apresentacao, doses_por_frasco, volume_dose, grupos_alvo, esquema_dosagem

### `laboratorios`
- id, nome

### `lotes_estoque`
- id, vacina_id, laboratorio_id, lote, validade, frascos_entrada, doses_entrada, frascos_saida, doses_saida, frascos_perda, doses_perda, frascos_saldo, doses_saldo, mes_referencia

### `estoque_minimo`
- id, vacina_id, quantidade_minima

### `solicitacoes`
- id, mes_referencia, data, responsavel, vacina_id, estoque_atual, quantidade_solicitada, data_recebimento, responsavel_recebimento

### `movimentacoes`
- id, lote_id, tipo (entrada/saída/perda), quantidade_frascos, quantidade_doses, data, responsavel, observacao
