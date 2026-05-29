# Git Workflow

## Objetivo
- Padronizar commits para CI
- Garantir organização por funcionalidade
- Controlar execução (commit/push só com solicitação)

## Regras Gerais
- Commit apenas quando solicitado explicitamente
- Nunca agrupar mudanças não relacionadas
- Sempre separar commits por contexto (feature, fix, etc)
- Nunca fazer push automático
- Sempre perguntar antes de push

## Padrão de Commit (Conventional Commits)
Formato:

```
type(scope): descrição
```

Tipos permitidos:
- feat
- fix
- chore
- refactor
- docs
- test
- style
- perf
- ci
- build

Exemplos:

```
feat(button): add basic component structure
fix(header): correct alignment issue
chore(deps): update dependencies
refactor(card): simplify component structure
```

## Regras de Escrita
- Mensagens curtas e objetivas
- Inglês obrigatório
- Sem emojis
- Sem frases longas
- Foco no que foi feito

## Fluxo de Commit
Quando solicitado:
1. Analisar alterações atuais
2. Agrupar por contexto
3. Criar commits separados e semânticos
4. Não executar push

## Regra de Push
- Sempre perguntar antes
- Só executar se houver confirmação explícita
- Caso contrário, não fazer nada
