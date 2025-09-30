# 🚀 rfritas-library-hub

Uma aplicação web moderna para visualizar e gerenciar componentes React reutilizáveis da biblioteca **rfritas-ui-libraries**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-teal.svg)

## 📖 Sobre o Projeto

O **rfritas-library-hub** é uma plataforma web que funciona como um catálogo interativo de componentes React modernos. A aplicação permite visualizar detalhes dos componentes, exemplos de uso, propriedades e estatísticas de download, oferecendo uma experiência similar ao npm.js para bibliotecas de componentes.

### 🎯 Objetivo

Facilitar a descoberta e utilização de componentes React da biblioteca rfritas, fornecendo documentação clara, exemplos práticos e informações técnicas em uma interface elegante e intuitiva.

## ✨ Funcionalidades Atuais

### 🏠 **Página Inicial**
- Lista completa de componentes disponíveis
- Cards informativos com versão, descrição e última atualização
- Design responsivo com animações suaves
- Navegação intuitiva entre componentes

### 📦 **Detalhes do Componente**
- **Informações Técnicas**: versão, tamanho do bundle, dependências
- **Instalação**: comando npm com botão de cópia
- **Exemplo de Uso**: código de exemplo com syntax highlighting
- **Documentação de Props**: tabela detalhada com tipos e descrições
- **Estatísticas**: downloads, versão atual, última atualização
- **Links Externos**: GitHub e npm.js

### 🎨 **Interface e UX**
- Design system consistente com tokens CSS customizados
- Tema claro/escuro automático
- Animações suaves e transições
- Toast notifications para feedback do usuário
- Navegação por URL amigável (`/package/:name`)

## 🛠️ Tecnologias Utilizadas

### **Frontend Core**
- **React 18.3.1** - Biblioteca principal
- **TypeScript 5.8.3** - Tipagem estática
- **Vite 5.4.19** - Build tool e dev server
- **React Router DOM 6.30.1** - Roteamento SPA

### **UI e Styling**
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis de base
- **Lucide React** - Ícones SVG otimizados
- **clsx & tailwind-merge** - Gerenciamento de classes CSS

### **Estado e Dados**
- **TanStack React Query 5.83.0** - Gerenciamento de estado servidor
- **Sonner** - Sistema de notificações toast

### **Desenvolvimento**
- **ESLint 9.32.0** - Linting e qualidade de código
- **PostCSS & Autoprefixer** - Processamento CSS

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── sonner.tsx
│   │   └── tooltip.tsx
│   └── PackageCard.tsx  # Card de componente
├── pages/               # Páginas da aplicação
│   ├── Home/           # Página inicial
│   └── PackageDetails/ # Detalhes do componente
├── utils/              # Funções utilitárias
│   ├── cn.ts          # Merge de classes CSS
│   └── index.ts       # Re-exports
├── App.tsx            # Componente raiz
├── main.tsx           # Entry point
└── index.css          # Estilos globais e design system
```

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação e Execução**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/renatomore/rfritas-library-hub.git
   cd rfritas-library-hub
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Build para produção**
   ```bash
   npm run build
   ```

5. **Preview da build**
   ```bash
   npm run preview
   ```

### 🔐 Configuração de CI/CD (Opcional)

Para habilitar workflows automáticos:

1. **Configure PAT para Auto-PR**
   - Consulte [PAT-SETUP.md](.github/PAT-SETUP.md) para instruções detalhadas
   - Necessário para criação automática de Pull Requests

2. **Configure GitHub Pages**
   - Habilite GitHub Pages nas configurações do repositório
   - Source: GitHub Actions
   - Deploy automático configurado no `main`

## 📋 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run build:dev` | Build de desenvolvimento |
| `npm run lint` | Executa linting do código |
| `npm run preview` | Preview da build local |

## � Deploy

### **GitHub Pages com GitHub Actions**

O projeto está configurado para deploy automático no GitHub Pages utilizando GitHub Actions. O workflow é executado automaticamente a cada push na branch `main`.

#### **Configuração do Workflow**

Criar o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'

  deploy:
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

#### **Configuração do Vite**

Adicionar ao `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/rfritas-library-hub/', // Nome do repositório
  // ... resto da configuração
});
```

## �🔮 Próximos Passos

### 🎯 **Fase 0: Infraestrutura e Deploy**

#### **🚀 GitHub Pages + Actions**
- [ ] Configuração de deploy automático via GitHub Actions
- [ ] Workflow de CI/CD para build e deploy
- [ ] Cache de dependências para builds mais rápidos
- [ ] Deploy preview para Pull Requests
- [ ] Configuração de domínio customizado
- [ ] SSL/HTTPS automático
- [ ] Otimização de assets para produção

### 🎯 **Fase 1: Integração com APIs Externas**

#### **GitHub API Integration**
- [ ] Integração com GitHub API para dados em tempo real
- [ ] Informações do repositório (stars, forks, issues)
- [ ] Histórico de commits e releases
- [ ] README.md automático dos componentes
- [ ] Badges dinâmicos de status

#### **NPM API Integration**  
- [ ] Dados reais de downloads via npm API
- [ ] Informações de versões e dependências atualizadas
- [ ] Estatísticas de popularidade
- [ ] Changelog automático

### 🎯 **Fase 2: Funcionalidades Avançadas**

#### **Busca e Filtros**
- [ ] Sistema de busca por nome/descrição
- [ ] Filtros por categoria, popularidade, data
- [ ] Tags e categorização automática
- [ ] Busca semântica

#### **Documentação Interativa**
- [ ] Playground de componentes em tempo real
- [ ] Editor de código integrado
- [ ] Preview ao vivo das modificações
- [ ] Exportação de exemplos

#### **Analytics e Métricas**
- [ ] Dashboard de uso dos componentes
- [ ] Tracking de popularidade
- [ ] Métricas de engagement
- [ ] Relatórios de uso

### 🎯 **Fase 3: Melhorias de UX**

#### **Performance**
- [ ] Lazy loading de componentes
- [ ] Cache inteligente
- [ ] Service Worker para offline
- [ ] Otimização de imagens

#### **Acessibilidade**
- [ ] Auditoria completa de acessibilidade
- [ ] Navegação por teclado melhorada
- [ ] Screen reader optimization
- [ ] Temas de alto contraste

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter PRs.

### **Como Contribuir**
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Renato Freitas** - [renatomore](https://github.com/renatomore)

- 🌐 Website: [rfritas-library-hub](https://renatomore.github.io/rfritas-library-hub)
- 📧 Email: [contato](mailto:contato@renatomore.dev)

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
  <p>Feito com ❤️ e ☕</p>
</div>
