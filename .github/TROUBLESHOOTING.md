# 🚨 Troubleshooting: Erros Comuns dos Workflows

## 🎯 "Resource not accessible by integration"

### **Problema**
```
RequestError [HttpError]: Resource not accessible by integration
Status: 403
URL: https://api.github.com/repos/owner/repo/issues/X/comments
```

### **Causa e Solução**
O `github.token` padrão tem permissões limitadas. Consulte [PAT-SETUP.md](PAT-SETUP.md) para configurar PAT com permissões adequadas.

---

## 🚀 "Get Pages site failed" / GitHub Pages

### **Problema**
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
Error: HttpError: Not Found
```

### **Causa**
GitHub Pages não está configurado ou habilitado no repositório.

### **✅ Solução**

#### **Opção 1: Configuração Manual (Recomendada)**
1. **Acesse as configurações do repositório**
   ```
   Repository → Settings → Pages
   ```

2. **Configure a source**
   ```
   Source: Deploy from a branch → GitHub Actions
   ```

3. **Salve as configurações**
   - Aguarde alguns minutos para ativação
   - Status aparecerá como "Ready" quando configurado

4. **Teste o workflow**
   ```bash
   git push origin main
   ```

#### **Opção 2: Aguardar Configuração Automática**
- O workflow `deploy.yml` tem `enablement: true`
- Deve configurar automaticamente na primeira execução
- Se falhar, use a Opção 1

### **🔍 Verificações**

#### **Repositório Público**
- GitHub Pages gratuito requer repositório público
- Para repos privados, é necessário GitHub Pro/Team

#### **Permissions do Workflow**
```yaml
permissions:
  contents: read
  pages: write      # ← Necessário
  id-token: write   # ← Necessário
```

#### **Branch Configurada**
- Workflow executa apenas em push para `main`
- Certifique-se que está na branch correta

### **📊 Status do Pages**
```
Repository → Settings → Pages → Status
```
- ✅ **Active**: Configurado e funcionando
- ⚠️ **Building**: Configuração em andamento  
- ❌ **Not configured**: Precisa configurar manualmente

---

## 🔧 Permissões e Tokens

### **Problema: Insufficient Permissions**
```
Error: Resource not accessible by integration
```

### **Soluções Implementadas**

#### **1. Permissões Explícitas nos Workflows**
```yaml
permissions:
  contents: read
  pull-requests: write  # ← Necessário para comentários
  issues: write         # ← Necessário para comentários
  pages: write          # ← Necessário para GitHub Pages
  id-token: write       # ← Necessário para OIDC
```

#### **2. Fallback com PAT**
```yaml
github-token: ${{ secrets.PAT || github.token }}
```

#### **3. Tratamento de Erro Gracioso**
```javascript
try {
  await github.rest.issues.createComment({...});
  console.log('✅ Comment created successfully');
} catch (error) {
  console.log('⚠️ Failed to create comment:', error.message);
  // Não falha o workflow
}
```

## 💡 Dicas Gerais

### **Verificar Logs do Workflow**
```
Actions → [Nome do Workflow] → [Run específico] → [Job] → [Step]
```

### **Status dos Workflows**
| Workflow | Função | Requer PAT |
|----------|--------|------------|
| **deploy.yml** | Deploy automático | ❌ Não |
| **pr-preview.yml** | Build + Comentário | ⚠️ Opcional |
| **auto-pr.yml** | Criar PR + Comentário | ⚠️ Opcional |

### **Para Mais Informações**
- 📋 [Workflows](.github/README.md) - Documentação completa
- 🔐 [PAT Setup](PAT-SETUP.md) - Configuração detalhada
- 🤖 [Auto-PR Examples](AUTO-PR-EXAMPLES.md) - Exemplos práticos

## ✅ Soluções Implementadas

### **1. Permissões Explícitas nos Workflows**

```yaml
permissions:
  contents: read
  pull-requests: write  # ← Necessário para comentários
  issues: write         # ← Necessário para comentários
```

### **2. Fallback com PAT**

```yaml
github-token: ${{ secrets.PAT || github.token }}
```

### **3. Tratamento de Erro Gracioso**

```javascript
try {
  await github.rest.issues.createComment({...});
  console.log('✅ Comment created successfully');
} catch (error) {
  console.log('⚠️ Failed to create comment:', error.message);
  // Não falha o workflow
}
```

## 🛠️ Como Resolver Completamente

### **Opção 1: Configurar PAT (Recomendado)**

1. **Criar Personal Access Token**
   ```
   GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   ```

2. **Scopes necessários:**
   ```
   ✅ repo (Full control of private repositories)
   ✅ workflow (Update GitHub Action workflows)
   ```

3. **Adicionar como Secret**
   ```
   Repository → Settings → Secrets and variables → Actions
   Name: PAT
   Secret: seu_token_aqui
   ```

### **Opção 2: Aceitar Limitações**

- ✅ Build e deploy funcionam normalmente
- ⚠️ Comentários automáticos não funcionam
- 📝 Logs mostram avisos mas não falham

## 🔧 Verificação

### **Teste se PAT está configurado:**
```bash
# Nos logs do workflow você verá:
✅ PAT is configured: true
# ou
⚠️ PAT is configured: false - using github.token
```

### **Comportamento esperado:**
- **Com PAT**: Comentários funcionam ✅
- **Sem PAT**: Comentários falham mas workflow continua ⚠️

## 📊 Status Atual dos Workflows

| Workflow | Função | Status sem PAT | Status com PAT |
|----------|--------|----------------|----------------|
| **deploy.yml** | Deploy automático | ✅ Funciona | ✅ Funciona |
| **pr-preview.yml** | Build + Comentário | ⚠️ Build OK, sem comentário | ✅ Completo |
| **auto-pr.yml** | Criar PR + Comentário | ✅ Cria PR, ⚠️ sem comentário | ✅ Completo |

## 🎯 Próximos Passos

1. **Imediato**: Workflows funcionam mas sem comentários automáticos
2. **Recomendado**: Configure PAT seguindo [PAT-SETUP.md](PAT-SETUP.md)
3. **Alternativo**: Aceite limitação e monitore pelos logs

## 💡 Dica

O erro **não quebra** os workflows principais (build, deploy, criação de PR). 
Apenas os comentários automáticos ficam indisponíveis até configurar o PAT.