# 🔐 Configuração de PAT e Environment para Auto-PR

Este documento explica como configurar o Personal Access Token (PAT) e environment necessários para o workflow de Auto-PR funcionar corretamente.

## 🎯 Por que usar PAT?

### **Limitações do `github.token` padrão:**
- ❌ **Não pode criar PRs** que triggem outros workflows
- ❌ **Permissions limitadas** em repositórios privados
- ❌ **Não persiste** entre jobs

### **Vantagens do PAT:**
- ✅ **Permissions completas** configuráveis
- ✅ **Trigger workflows** subsequentes
- ✅ **Funciona em repos privados**
- ✅ **Controle granular** de acesso

## 🛠️ Configuração Passo a Passo

### **1. Criar Personal Access Token**

1. **Acesse GitHub Settings**
   ```
   GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   ```

2. **Gerar novo token**
   - Click em "Generate new token (classic)"
   - **Note**: `rfritas-library-hub-auto-pr`
   - **Expiration**: 90 days (ou conforme política)

3. **Configurar Scopes**
   ```
   ✅ repo (Full control of private repositories)
     ✅ repo:status
     ✅ repo_deployment  
     ✅ public_repo
     ✅ repo:invite
     ✅ security_events
   
   ✅ workflow (Update GitHub Action workflows)
   
   ✅ write:packages (Write packages to GitHub Package Registry)
   ✅ read:packages (Read packages from GitHub Package Registry)
   ```

4. **Copiar o token** (será mostrado apenas uma vez!)

### **2. Configurar Repository Secret**

1. **Navegar para Repository Settings**
   ```
   Repository → Settings → Secrets and variables → Actions
   ```

2. **Adicionar Repository Secret**
   - **Name**: `PAT`
   - **Secret**: `cole_o_token_aqui`
   - Click "Add secret"

### **3. Criar Environment (Opcional mas Recomendado)**

1. **Navegar para Environments**
   ```
   Repository → Settings → Environments
   ```

2. **Criar novo environment**
   - **Name**: `pull_request`
   - Click "Configure environment"

3. **Configurar Environment Rules**
   ```
   ✅ Required reviewers: (opcional)
   ✅ Wait timer: 0 minutes
   ✅ Deployment branches: Selected branches
     - main
     - feat/**
     - fix/**
     - docs/**
   ```

4. **Environment Secrets** (opcional)
   - Pode sobrescrever o PAT específico para este environment
   - **Name**: `PAT`
   - **Value**: `token_específico_do_environment`

## 🔍 Verificação da Configuração

### **Teste 1: Verificar Secret**
```bash
# No workflow, será exibido nos logs (mascarado):
echo "PAT configured: ${{ secrets.PAT != '' }}"
```

### **Teste 2: Testar Permissions**
```bash
# Criar branch de teste
git checkout -b feat/test-auto-pr
git commit --allow-empty -m "feat: test auto-pr workflow"
git push origin feat/test-auto-pr

# Verificar se PR foi criada automaticamente
```

### **Teste 3: Logs do Workflow**
```yaml
# No workflow, adicionar para debug:
- name: Debug PAT
  run: |
    if [ -n "${{ secrets.PAT }}" ]; then
      echo "✅ PAT is configured"
    else  
      echo "❌ PAT is missing"
    fi
```

## 🚨 Troubleshooting

### **Erro: "Resource not accessible by integration"**
```
❌ Problema: github.token sendo usado sem PAT
✅ Solução: Verificar se PAT está configurado corretamente
```

### **Erro: "Bad credentials"**
```
❌ Problema: PAT expirado ou inválido
✅ Solução: Gerar novo PAT com scopes corretos
```

### **Erro: "Environment protection rules"**
```
❌ Problema: Environment configurado com regras restritivas
✅ Solução: Ajustar deployment branches no environment
```

### **PR não é criada**
```bash
# Verificar nos logs do Actions:
1. Se o workflow foi executado
2. Se PAT está sendo usado
3. Se branch segue padrão (feat/*, fix/*, docs/*)
4. Se há diferenças da branch main
```

## 🔄 Fallback Automático

O workflow está configurado para fallback automático:

```yaml
github-token: ${{ secrets.PAT || github.token }}
```

### **Comportamento:**
- ✅ **Se PAT existe**: Usa PAT (funcionalidade completa)
- ⚠️ **Se PAT não existe**: Usa github.token (funcionalidade limitada)

## 🛡️ Segurança

### **Boas Práticas:**
- ✅ **Usar scopes mínimos** necessários
- ✅ **Renovar tokens** regularmente
- ✅ **Monitorar uso** via GitHub audit log
- ✅ **Revogar tokens** não utilizados

### **Permissions Mínimas:**
```
repo:status     # Para verificar status dos commits
public_repo     # Para repos públicos
pull_requests   # Para criar/atualizar PRs
contents:read   # Para ler conteúdo do repo
```

### **Environment Protection:**
```yaml
environment: pull_request  # Isola execution context
```

## 📊 Monitoramento

### **GitHub Audit Log:**
```
Settings → Audit log → Filter by "token"
```

### **Workflow Usage:**
```
Actions → Auto Create Pull Request → Runs
```

### **Token Usage:**
```
Settings → Developer settings → Personal access tokens → PAT → View usage
```

## 🚀 Próximos Passos

Após configuração:

1. ✅ **Testar workflow** com branch feat/test
2. ✅ **Verificar PR criada** automaticamente  
3. ✅ **Confirmar labels** aplicadas
4. ✅ **Testar update** com novos commits
5. ✅ **Documentar processo** para equipe