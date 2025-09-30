# 🚨 Troubleshooting: "Resource not accessible by integration"

## 🎯 Problema

```
RequestError [HttpError]: Resource not accessible by integration
Status: 403
URL: https://api.github.com/repos/owner/repo/issues/X/comments
```

## 🔍 Causa Raiz

O `github.token` padrão do GitHub Actions tem **permissões limitadas** e não pode:
- ✅ Criar PRs (funciona)
- ❌ **Comentar em PRs/Issues** (falha com 403)
- ❌ Triggerar workflows subsequentes
- ❌ Acessar repositórios privados com permissões avançadas

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