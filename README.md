# 🐾 Save a Pet

Plataforma moderna para adoção responsável de pets, conectando animais que precisam de um lar a famílias amorosas. Feita com React, Vite, TypeScript, Supabase, Tailwind CSS e shadcn-ui.

---

<p align="center">
  <img src="./public/placeholder.svg" alt="Save a Pet" width="200" />
</p>

---

## ✨ Visão Geral

O **Save a Pet** é uma plataforma completa para facilitar a adoção de cães e gatos, promovendo o bem-estar animal e a responsabilidade social. Permite que usuários encontrem pets para adoção, cadastrem animais, tirem dúvidas, leiam conteúdos educativos e se conectem de forma segura.

---

## 🚀 Funcionalidades

- **Catálogo de Pets**: Busque, filtre e visualize detalhes de cães e gatos disponíveis para adoção.
- **Cadastro de Animais**: Cadastre pets para adoção com fotos, histórico, temperamento e necessidades especiais.
- **Autenticação Segura**: Login, cadastro e gerenciamento de sessão via Supabase Auth.
- **Perfil do Usuário**: Gerencie informações pessoais e acompanhe pets cadastrados/adotados.
- **Chat Seguro**: Comunicação entre adotantes e responsáveis pelo pet.
- **Blog Educativo**: Conteúdos sobre adoção, cuidados, dicas e responsabilidade.
- **FAQ e Contato**: Tire dúvidas frequentes e envie mensagens para a equipe.
- **Design Responsivo**: Interface moderna, acessível e adaptada para dispositivos móveis.

---

## 🏗️ Arquitetura & Tecnologias

- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/), [shadcn-ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Backend as a Service**: [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Gerenciamento de Estado**: React Context, React Query
- **Validação de Formulários**: React Hook Form, Zod
- **Outros**: ESLint, PostCSS, Vite Plugins

---

## 📁 Estrutura de Pastas

```
src/
  components/        # Componentes reutilizáveis (UI, Header, Footer, etc)
  hooks/             # Hooks customizados (ex: useAuth, useToast)
  integrations/      # Integração com Supabase (client, types)
  lib/               # Utilitários
  pages/             # Páginas principais (Adotar, Cadastrar, FAQ, etc)
  assets/            # Imagens e mídias
public/              # Arquivos estáticos
supabase/            # Configuração e migrações do banco
```

---

## 🛠️ Como rodar o projeto localmente

1. **Clone o repositório:**
   ```sh
   git clone <URL_DO_REPO>
   cd save-a-pet
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure o Supabase:**
   - Crie um projeto no [Supabase](https://supabase.com/)
   - Configure as variáveis de ambiente (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
   - Execute as migrações SQL em `supabase/migrations/`
4. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```
5. **Acesse:**
   - [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploy

- Deploy automático via [Lovable](https://lovable.dev/) ou manual em plataformas como Vercel, Netlify, Render, etc.
- Para domínio próprio, configure em: `Project > Settings > Domains` no Lovable.

---

## 🔒 Segurança & Boas Práticas

- Autenticação e autorização via Supabase (RLS e Policies SQL)
- Dados sensíveis protegidos por triggers e policies no banco
- Validação de formulários e sanitização de dados
- Código modular, tipado e com linting

---

## 🤝 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para o fork: `git push origin minha-feature`
5. Abra um Pull Request

---

## ❓ FAQ

- **Adoção tem custo?**
  - Não, mas pode haver taxa simbólica para vacinas/castração.
- **Posso cadastrar qualquer pet?**
  - Sim, desde que seja para adoção responsável.
- **Como funciona o chat?**
  - Após interesse, o contato é feito via chat seguro na plataforma.
- **É seguro?**
  - Sim! Usamos autenticação, políticas de acesso e monitoramento.

---

## 📄 Licença

Este projeto é open-source sob a licença MIT.

---

## 👨‍💻 Créditos & Contato

- Desenvolvido por [Rafael Fonseca](mailto:rafafaelloso2007@gmail.com), [Davi Ramalho](mailto:daviramalho06@gmail.com), [Joao Freire](mailto:joaognfreire@gmail.com), [Daniel Souza](mailto:danielcsouza1010@gmail.com), [Guilherme Nogueira](guigui.nog12@gmail.com) e [Dante Cavalcante](Dantecas07@gmail.com).
- Design e UI: shadcn-ui, Tailwind CSS
- Backend: Supabase
- Dúvidas? Use a página de [Contato](./src/pages/Contato.tsx) ou envie um e-mail.

<p align="center">
  <b>Save a Pet — Conectando corações, transformando vidas! 🐶🐱</b>
</p>
