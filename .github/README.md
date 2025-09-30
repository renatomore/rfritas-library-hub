# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions para CI/CD do projeto.

## 📁 Workflows

### `deploy.yml` - Deploy Automático
- **Trigger**: Push na branch `main`
- **Função**: Build e deploy automático para GitHub Pages
- **Passos**:
  1. Checkout do código
  2. Setup Node.js 18 com cache npm
  3. Instalação de dependências
  4. Lint do código
  5. Build da aplicação
  6. Deploy para GitHub Pages

### `pr-preview.yml` - Preview de Pull Requests
- **Trigger**: Abertura/atualização de PRs para `main`
- **Função**: Validação e build de preview
- **Passos**:
  1. Checkout do código
  2. Setup Node.js 18 com cache npm
  3. Instalação de dependências
  4. Lint do código
  5. Build da aplicação
  6. Comentário no PR com status

### `auto-pr.yml` - Criação Automática de Pull Requests
- **Trigger**: Push em branches `feat/*`, `fix/*`, `docs/*`
- **Função**: Cria automaticamente PRs para desenvolvimento estruturado
- **Recursos**:
  1. **Detecção automática** do tipo de branch
  2. **PR personalizada** com template baseado no tipo
  3. **Labels automáticas** (enhancement, bug, documentation)
  4. **Checklists** de revisão incluídas
  5. **Atualização automática** de PRs existentes
  6. **Emojis** e formatação profissional

## ⚙️ Configuração

### Pré-requisitos
1. **GitHub Pages habilitado** no repositório
2. **Source configurado** para "GitHub Actions"
3. **Permissions** adequadas no repositório

### Variáveis de Ambiente
- `NODE_ENV`: Definida automaticamente como `production` no build
- Base path configurado no `vite.config.ts` para GitHub Pages

### Otimizações
- **Cache de dependências**: npm cache para builds mais rápidos
- **Manual chunks**: Separação de vendors para melhor caching
- **Lint automático**: Validação de código em todos os builds
- **Conditional deploy**: Deploy apenas na branch main

## 🚀 Como Usar

### Deploy Automático
1. Faça push na branch `main`
2. O workflow será executado automaticamente
3. Site estará disponível em: `https://renatomore.github.io/rfritas-library-hub/`

### Preview de PR
1. Abra um Pull Request para `main`
2. O workflow validará automaticamente
3. Comentário será adicionado com o status

### Auto-criação de PRs
O workflow `auto-pr.yml` automatiza a criação de Pull Requests seguindo convenções:

#### **📝 Padrões de Branch Suportados**
```bash
# Features
feat/add-new-component
feat/user-authentication
feat-shopping-cart

# Bug fixes  
fix/login-validation
fix/memory-leak-issue
fix-responsive-layout

# Documentation
docs/api-reference
docs/setup-guide
docs-readme-update
```

#### **🎯 Funcionalidades**
- **✨ Criação automática** de PR com título formatado
- **🏷️ Labels automáticas** baseadas no tipo
- **📋 Template personalizado** com checklists
- **🔄 Atualização automática** quando há novos commits
- **📊 Informações detalhadas** (commits, autor, estatísticas)

#### **📋 Template de PR Gerado**
```markdown
## ✨ Feature: Add New Component

**Branch:** `feat/add-new-component`  
**Type:** Feature  
**Author:** Developer Name  
**Commits:** 3

### 📝 Description
> **Latest commit:** Add component structure

### 🔄 Changes
- [ ] Feature implementation
- [ ] Tests added/updated  
- [ ] Documentation updated
- [ ] No breaking changes

### ✅ Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] No console.log or debug code
- [ ] Changes are backwards compatible
```

### Debug Local
```bash
# Build como será no GitHub Pages
npm run build:gh-pages

# Preview local com base path correto
npm run preview:gh-pages
```