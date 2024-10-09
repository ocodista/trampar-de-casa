# Guia de Sincronização do Supabase

## Cenário 1: Alterações Locais para Remoto

Se você fez alterações no seu banco de dados local e deseja aplicá-las ao banco de dados remoto no Supabase, siga estes passos:

1. **Gere um script de migração:**

   ```bash
   supabase db diff -f nome_da_migracao
   ```

   Isso criará um arquivo de migração na pasta `supabase/migrations`.

2. **Revise o script de migração:**
   Abra o arquivo gerado e verifique se as alterações estão corretas.

3. **Aplique a migração localmente (opcional, mas recomendado):**

   ```bash
   supabase db reset
   ```

   Isso aplicará todas as migrações localmente para garantir que funcionem.

4. **Envie as alterações para o banco de dados remoto:**

   ```bash
   supabase db push
   ```

5. **Verifique as alterações:**
   Acesse o painel do Supabase ou use `supabase db pull` para confirmar que as alterações foram aplicadas corretamente.

## Cenário 2: Alterações Remotas para Local

Se as alterações foram feitas diretamente no banco de dados remoto do Supabase e você precisa atualizá-las localmente:

1. **Puxe as alterações do banco de dados remoto:**

   ```bash
   supabase db pull
   ```

   Isso atualizará seu esquema local com as alterações do banco remoto.

2. **Gere um script de migração para as alterações:**

   ```bash
   supabase db diff -f nome_da_migracao
   ```

   Isso criará um arquivo de migração baseado nas diferenças entre seu banco local e o remoto.

3. **Revise o script de migração:**
   Verifique o arquivo gerado para garantir que as alterações estão corretas.

4. **Aplique a migração localmente:**

   ```bash
   supabase db reset
   ```

   Isso aplicará todas as migrações, incluindo a nova, ao seu banco local.

5. **Commit das alterações:**
   Adicione o novo arquivo de migração ao seu sistema de controle de versão:
   ```bash
   git add supabase/migrations/nome_da_migracao.sql
   git commit -m "Adiciona migração para alterações remotas"
   ```

## Notas Importantes:

- Sempre faça backup antes de aplicar alterações significativas.
- Use `supabase db reset` com cuidado, pois ele recria o banco de dados local.
- Se houver conflitos, você pode precisar resolver manualmente editando os scripts de migração.
- Mantenha sua CLI do Supabase atualizada para evitar problemas de compatibilidade.
