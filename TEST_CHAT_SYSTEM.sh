#!/bin/bash
# 🧪 GUIA DE TESTES - SISTEMA DE CHAT

# Este arquivo contém exemplos de testes para validar o sistema de chat

echo "================================"
echo "TESTES DO SISTEMA DE CHAT"
echo "================================"
echo ""

# ============================================
# TESTE 1: Verificar se todos os arquivos foram criados
# ============================================
echo "✅ TESTE 1: Verificar arquivos"
echo "Verificando se todos os arquivos foram criados..."

FILES_TO_CHECK=(
  "supabase/migrations/20251123000000_enhance_chat_system.sql"
  "src/integrations/supabase/chatService.ts"
  "src/pages/ChatInbox.tsx"
  "CHAT_SYSTEM_DOCS.md"
  "CHAT_IMPLEMENTATION_SUMMARY.md"
)

for file in "${FILES_TO_CHECK[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file encontrado"
  else
    echo "  ✗ $file NÃO encontrado"
  fi
done

echo ""
echo "================================"
echo "TESTES MANUAIS A REALIZAR"
echo "================================"
echo ""

# ============================================
# TESTE 2: Verificar Migration
# ============================================
echo "📋 TESTE 2: Executar Migration"
echo ""
echo "INSTRUÇÕES:"
echo "1. Acesse https://app.supabase.com"
echo "2. Selecione seu projeto 'save-a-pet'"
echo "3. Vá a 'SQL Editor'"
echo "4. Crie uma nova query"
echo "5. Cole todo o conteúdo de: supabase/migrations/20251123000000_enhance_chat_system.sql"
echo "6. Clique em 'Run'"
echo "7. Aguarde a mensagem de sucesso"
echo ""
echo "ESPERADO: Sucesso sem erros"
echo ""

# ============================================
# TESTE 3: Verificar RLS e Realtime
# ============================================
echo "⚙️  TESTE 3: Verificar RLS e Realtime"
echo ""
echo "INSTRUÇÕES:"
echo "1. Vá a 'Authentication' > 'Row Level Security'"
echo "2. Verifique se as tabelas têm RLS ATIVADO:"
echo "   - chats ✓"
echo "   - messages ✓"
echo "   - profiles ✓"
echo ""
echo "3. Vá a 'Settings' > 'Realtime'"
echo "4. Verifique se Realtime está ATIVADO"
echo "5. Verifique se as tabelas estão replicadas:"
echo "   - chats"
echo "   - messages"
echo ""

# ============================================
# TESTE 4: Testar Criar Chat
# ============================================
echo "💬 TESTE 4: Testar Criar Chat"
echo ""
echo "INSTRUÇÕES:"
echo "1. Abra o navegador e vá a http://localhost:5173"
echo "2. Faça login como Usuário A"
echo "3. Vá para '/adotar'"
echo "4. Clique em qualquer pet (que não seja seu)"
echo "5. Clique em 'Iniciar Conversa'"
echo ""
echo "ESPERADO:"
echo "  ✓ Redirecionar para /chat/:id"
echo "  ✓ Carregar a página do chat"
echo "  ✓ Mostrar nome do pet e outro usuário"
echo ""

# ============================================
# TESTE 5: Testar Enviar Mensagem
# ============================================
echo "📤 TESTE 5: Testar Enviar Mensagem"
echo ""
echo "INSTRUÇÕES:"
echo "1. Na página do chat, digite uma mensagem"
echo "2. Clique em 'Enviar' (ou pressione Enter)"
echo ""
echo "ESPERADO:"
echo "  ✓ Mensagem aparece imediatamente no chat"
echo "  ✓ Campo de input limpa"
echo "  ✓ Timestamp relativo aparece"
echo "  ✓ Mensagem aparece à direita (seu envio)"
echo ""

# ============================================
# TESTE 6: Testar Realtime
# ============================================
echo "⚡ TESTE 6: Testar Realtime"
echo ""
echo "INSTRUÇÕES:"
echo "1. Abra duas abas do navegador"
echo "2. Aba 1: Faça login como Usuário A"
echo "3. Aba 2: Faça login como Usuário B (em navegador privado se possível)"
echo "4. Aba 1: Vá para um chat"
echo "5. Aba 2: Vá para o MESMO chat"
echo "6. Aba 1: Envie uma mensagem"
echo ""
echo "ESPERADO:"
echo "  ✓ Mensagem aparece em tempo real na Aba 2"
echo "  ✓ Sem necessidade de refresh"
echo "  ✓ Timestamp correto"
echo ""

# ============================================
# TESTE 7: Testar Inbox
# ============================================
echo "📬 TESTE 7: Testar Inbox de Chats"
echo ""
echo "INSTRUÇÕES:"
echo "1. Clique em 'Chats' no Header"
echo "2. Verifique se todos os chats aparecem"
echo "3. Clique em um chat para abrir"
echo ""
echo "ESPERADO:"
echo "  ✓ Redirecionar para /chat/:id"
echo "  ✓ Carregar mensagens do chat"
echo "  ✓ Contador de não lidas desaparece"
echo ""

# ============================================
# TESTE 8: Testar Busca
# ============================================
echo "🔍 TESTE 8: Testar Busca no Inbox"
echo ""
echo "INSTRUÇÕES:"
echo "1. Vá para o Inbox (/chat)"
echo "2. Digite o nome de um pet no campo de busca"
echo "3. Verifique se apenas aquele chat aparece"
echo "4. Limpe a busca"
echo "5. Digite o nome de um usuário"
echo "6. Verifique se apenas aquele chat aparece"
echo ""
echo "ESPERADO:"
echo "  ✓ Filtro funciona em tempo real"
echo "  ✓ Mensagem 'Nenhuma conversa' se nenhum resultado"
echo ""

# ============================================
# TESTE 9: Testar Filtro de Não Lidas
# ============================================
echo "🔔 TESTE 9: Testar Filtro de Não Lidas"
echo ""
echo "INSTRUÇÕES:"
echo "1. Vá para o Inbox"
echo "2. Clique no botão 'Não Lidas (X)'"
echo "3. Verifique se apenas chats com não lidas aparecem"
echo "4. Clique em um chat"
echo "5. Volte para Inbox"
echo "6. Verifique se o chat desapareceu do filtro (pois foi lido)"
echo ""
echo "ESPERADO:"
echo "  ✓ Filtro funciona corretamente"
echo "  ✓ Contador atualiza quando entra no chat"
echo ""

# ============================================
# TESTE 10: Testar Atualização de Inbox
# ============================================
echo "🔄 TESTE 10: Testar Atualização em Realtime no Inbox"
echo ""
echo "INSTRUÇÕES:"
echo "1. Aba 1: Abra o Inbox (/chat)"
echo "2. Aba 2: Abra um chat e envie uma mensagem"
echo "3. Aba 1: Observe"
echo ""
echo "ESPERADO:"
echo "  ✓ Chat sobe para o topo (por last_message_at)"
echo "  ✓ Prévia da mensagem atualiza"
echo "  ✓ Contador de não lidas aparece"
echo "  ✓ Sem necessidade de refresh"
echo ""

# ============================================
# TESTE 11: Testar PetDetails
# ============================================
echo "🐾 TESTE 11: Testar Botão em PetDetails"
echo ""
echo "INSTRUÇÕES:"
echo "1. Faça login como Usuário A"
echo "2. Vá para /adotar"
echo "3. Clique em um pet"
echo "4. Clique em 'Iniciar Conversa'"
echo ""
echo "ESPERADO:"
echo "  ✓ Se chat não existe: criar e redirecionar"
echo "  ✓ Se chat existe: redirecionar direto"
echo "  ✓ Mensagem 'Você não pode conversar consigo mesmo' se for seu pet"
echo ""

# ============================================
# TESTE 12: Testar Persistência
# ============================================
echo "💾 TESTE 12: Testar Persistência de Dados"
echo ""
echo "INSTRUÇÕES:"
echo "1. Envie uma mensagem em um chat"
echo "2. Feche o navegador completamente"
echo "3. Abra novamente em http://localhost:5173"
echo "4. Faça login"
echo "5. Vá para o Inbox"
echo "6. Clique no chat"
echo ""
echo "ESPERADO:"
echo "  ✓ Todas as mensagens anteriores aparecem"
echo "  ✓ Dados persistem no Supabase"
echo ""

# ============================================
# TESTE 13: Testar Diferentes Usuários
# ============================================
echo "👥 TESTE 13: Testar com 2 Usuários"
echo ""
echo "INSTRUÇÕES:"
echo "1. Navegador 1: Login como Usuário A (email: a@test.com)"
echo "2. Navegador 2: Login como Usuário B (email: b@test.com)"
echo "3. Usuário B: Vá para /adotar e encontre um pet de A"
echo "4. Usuário B: Clique em 'Iniciar Conversa'"
echo "5. Usuário B: Envie uma mensagem: 'Olá, tudo bem?'"
echo "6. Usuário A: Vá para /chat"
echo "7. Usuário A: Verifique se o chat aparece com '1' não lido"
echo "8. Usuário A: Clique no chat"
echo "9. Usuário A: Veja a mensagem de B"
echo "10. Usuário A: Responda com 'Oi! Tudo certo!'"
echo "11. Usuário B: Observe em realtime"
echo ""
echo "ESPERADO:"
echo "  ✓ Conversa funciona nos dois sentidos"
echo "  ✓ Mensagens aparecem em tempo real"
echo "  ✓ Contador de não lidas funciona"
echo "  ✓ Nomes dos usuários aparecem corretamente"
echo ""

# ============================================
# TESTE 14: Verificar Erros
# ============================================
echo "🔧 TESTE 14: Verificar Erros no Console"
echo ""
echo "INSTRUÇÕES:"
echo "1. Abra DevTools (F12)"
echo "2. Vá para a aba 'Console'"
echo "3. Execute todos os testes anteriores"
echo "4. Verifique se há erros em vermelho"
echo ""
echo "ESPERADO:"
echo "  ✓ Nenhum erro no console"
echo "  ✓ Apenas warnings são aceitáveis"
echo ""

echo ""
echo "================================"
echo "✅ TODOS OS TESTES CONCLUÍDOS"
echo "================================"
echo ""
echo "Se todos passaram, o sistema está 100% funcional!"
echo "Se algum falhou, consulte a documentação em CHAT_SYSTEM_DOCS.md"
