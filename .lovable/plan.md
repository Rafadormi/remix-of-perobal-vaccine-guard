

# Corrigir Erros de Build - Página de Perdas

## Problema
O sistema não carrega porque a página `Perdas.tsx` tem erros de TypeScript que impedem a compilação. Os erros estao relacionados a:
1. Uso da biblioteca `zod` e `@hookform/resolvers/zod` (possivelmente nao instaladas)
2. Erros de tipagem no `z.enum()` - recebe um array onde espera um objeto
3. Erros de tipagem no `useForm` com o resolver do Zod

## Solucao

### Passo 1: Instalar dependencias faltantes
- `zod`
- `@hookform/resolvers`
- `date-fns` (se nao instalado)
- `lucide-react` (se nao instalado)

### Passo 2: Corrigir erros de tipagem em `Perdas.tsx`
- Linha 101: Corrigir o `z.enum()` - o problema e que a versao do zod/resolvers gera tipo `unknown` para `z.coerce.number()`. Solucao: ajustar o schema ou tipar explicitamente o formulario.
- Linhas 118-119: Corrigir a tipagem do `useForm` adicionando tipo generico explicitamente para garantir compatibilidade entre o resolver e o formulario.

### Detalhes tecnicos da correcao

No `useForm`, forcar a tipagem correta:

```typescript
const form = useForm<LossFormValues>({
  resolver: zodResolver(lossFormSchema) as any,
  defaultValues: { ... }
});
```

Ou alternativamente, remover `z.coerce` e usar `z.number()` diretamente, tratando a conversao no submit.

A correcao e simples e rapida - o sistema voltara a funcionar normalmente apos essas mudancas.

