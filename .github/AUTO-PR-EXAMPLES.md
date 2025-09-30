# 🤖 Auto-PR Workflow Examples

Este documento mostra exemplos práticos de como usar o workflow de criação automática de Pull Requests.

## 📋 Cenários de Uso

### ✨ Desenvolvimento de Feature

```bash
# 1. Criar e mudar para branch de feature
git checkout -b feat/user-dashboard

# 2. Desenvolver e fazer commits
git add .
git commit -m "feat: add user dashboard layout"
git commit -m "feat: implement dashboard data fetching"

# 3. Push para o repositório
git push origin feat/user-dashboard

# ✅ Resultado: PR automática criada com:
# - Título: "✨ feat: User Dashboard"
# - Label: "feat", "enhancement"
# - Template completo com checklists
```

### 🐛 Correção de Bug

```bash
# 1. Criar branch de fix
git checkout -b fix/login-validation-error

# 2. Corrigir o problema
git add .
git commit -m "fix: resolve login validation edge case"

# 3. Push
git push origin fix/login-validation-error

# ✅ Resultado: PR automática com:
# - Título: "🐛 fix: Login Validation Error"
# - Label: "fix", "bug"
# - Template de bugfix
```

### 📚 Atualização de Documentação

```bash
# 1. Branch de docs
git checkout -b docs/api-documentation

# 2. Atualizar documentação
git add .
git commit -m "docs: update API reference with new endpoints"

# 3. Push
git push origin docs/api-documentation

# ✅ Resultado: PR automática com:
# - Título: "📚 docs: Api Documentation"
# - Label: "docs", "documentation"
# - Template de documentação
```

## 🔄 Comportamento com Commits Adicionais

### Primeira vez (cria PR)

```bash
git push origin feat/new-feature
# → Cria nova PR automaticamente
```

### Commits subsequentes (atualiza PR)

```bash
git commit -m "feat: add unit tests"
git push origin feat/new-feature

# → Adiciona comentário na PR existente:
# "🔄 New commits pushed!"
# "Latest commit: feat: add unit tests"
# "Total commits: 3"
```

## 📝 Padrões de Nomenclatura

### ✅ Padrões Aceitos

| Padrão             | Exemplo                    | Resultado                    |
| ------------------ | -------------------------- | ---------------------------- |
| `feat/description` | `feat/user-authentication` | ✨ feat: User Authentication |
| `feat-description` | `feat-shopping-cart`       | ✨ feat: Shopping Cart       |
| `fix/description`  | `fix/memory-leak`          | 🐛 fix: Memory Leak          |
| `fix-description`  | `fix-responsive-layout`    | 🐛 fix: Responsive Layout    |
| `docs/description` | `docs/setup-guide`         | 📚 docs: Setup Guide         |
| `docs-description` | `docs-readme-update`       | 📚 docs: Readme Update       |

### ❌ Padrões NÃO Suportados

- `feature/new-component` (use `feat/`)
- `bugfix/login-issue` (use `fix/`)
- `documentation/api` (use `docs/`)
- `chore/cleanup` (não configurado)

## 🏷️ Labels Automáticas

### Por Tipo de Branch

- **feat/** → `feat`, `enhancement`
- **fix/** → `fix`, `bug`
- **docs/** → `docs`, `documentation`

### Customização

Para adicionar mais labels, edite o workflow em `.github/workflows/auto-pr.yml`:

```yaml
# Adicionar labels personalizadas
const labels = [type];
if (type === 'feat') labels.push('enhancement', 'frontend');
if (type === 'fix') labels.push('bug', 'priority-high');
if (type === 'docs') labels.push('documentation', 'help-wanted');
```

## 🛠️ Troubleshooting

### PR não foi criada

1. **Verifique o nome da branch** - deve começar com `feat/`, `fix/` ou `docs/`
2. **Permissions** - repositório deve ter permissões de Pull Request
3. **Branch base** - deve haver commits diferentes da `main`

### Comentários não aparecem

1. **Verifique se a PR já existe** - workflow só comenta em PRs existentes
2. **Permissions** - precisa de acesso a `issues: write`
3. **Logs do workflow** - verifique na aba Actions

### Personalizar template

Edite a seção `Generate PR description` no arquivo `auto-pr.yml`.

## 🚀 Próximas Melhorias

- [ ] Suporte para `chore/`, `refactor/`, `test/`
- [ ] Integração com issue tracking
- [ ] Templates por tipo de projeto
- [ ] Assignees automáticos
- [ ] Reviewers sugeridos
- [ ] Milestone automático
