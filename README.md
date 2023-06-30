# Trampar de Casa 👨💻🏠

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ocodista/trampar-de-casa/main)
![GitHub contributors](https://img.shields.io/github/contributors/ocodista/trampar-de-casa)
![Vercel](https://vercelbadge.vercel.app/api/ocodista/trampar-de-casa)
![Website](https://img.shields.io/website?up_message=online&up_color=green&down_message=offline&down_color=red&url=https%3A%2F%2Fwww.trampardecasa.com.br%2F)
![GitHub license](https://img.shields.io/github/license/ocodista/trampar-de-casa)

![Static Badge](https://img.shields.io/badge/nextjs-white?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=black&color=white)
![Static Badge](https://img.shields.io/badge/typescript-%2306B6D4?style=for-the-badge&logo=typescript&labelColor=white&color=%233178C6)
![Static Badge](https://img.shields.io/badge/vite-%23646CFF?style=for-the-badge&logo=vite&labelColor=black)
![Static Badge](https://img.shields.io/badge/tailwindcss-%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=black&color=%2306B6D4)

---

> Conexão definitiva entre desenvolvedores brasileiros e oportunidades de trabalho remoto.

## Sobre o Projeto 🎯

O Trampar de Casa é uma iniciativa open-source dedicada a conectar desenvolvedores brasileiros a oportunidades de trabalho remoto, incentivando a inclusão, diversidade e quebrando barreiras geográficas.

Semanalmente, compartilhamos um boletim via e-mail, contendo vagas selecionadas que correspondem ao perfil de nossos inscritos.

---

## 🚧 Funcionalidades em Desenvolvimento 🚧

Estamos trabalhando para implementar novas funcionalidades que vão tornar o Trampar de Casa ainda melhor. Aqui estão algumas que estão em nosso roadmap:

- [ ] **Cron Job para Envio de Emails**: Implementação de um Cron Job que enviará emails semanalmente (quarta-feira às 11h) para nossos usuários com as melhores oportunidades de trabalho remoto.

Pretendemos usar a combinação de Vercel (conforme este [guia](https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel)), react.email para construção dos emails e Supabase para o banco de dados.

- [ ] **Formulário de Cadastro para Empresas**: Desenvolvimento de um formulário de cadastro de empresas para tornar o processo de postagem de vagas mais eficiente. As empresas poderão preencher seus dados, como nome, site e link do logo.

- [ ] **Login de Usuários**: Adição de um sistema de login para usuários utilizando o supabase auth com magic link.

---

## Como Contribuir 🚀

1. **Fork** do repositório.
2. **Clone** do fork em seu ambiente de desenvolvimento local.
3. **Criação** de uma nova branch para sua funcionalidade ou correção.
4. **Implementação** de suas alterações e adição de testes, se aplicável.
5. **Push** para a sua branch no seu fork.
6. Envio de um **Pull Request** para o repositório principal.

---

## Como executar a aplicação localmente

1. Após clonar o repositório localmente, a partir do seu fork, entre na pasta criada.
2. Execute o comando `yarn`.
3. Se você não tiver o yarn instalado, execute `npm install --global yarn`.
4. Para executar a aplicação no ambiente de desenvolvimento, execute o comando `turbo dev`.
5. Se você não tiver o turbo instalado, execute `npm install --global turbo`.
6. A aplicação estará disponível em http://localhost:3000.

## Como subir o banco de dados localmente

1. Certifique-se de ter o [docker](https://www.docker.com/) instalado na sua máquina.
2. Navegue até a pasta `apps/web`.
3. Execute o comando `npm install` para instalar as dependências do projeto.
4. Execute o comando `npm run db-start` para gerar a pasta `prisma/client` e subir uma instância local do Supabase.
5. Você verá informações no terminal sobre as credenciais da sua instância local do Supabase.
6. Adicine as credenciais no arquivo `.env`.
7. Execute o comando `npm run db-seed` caso queira popular sua base de dados.
8. Caso tenha alguma dúvida consulta a [documentação oficial do supabase](https://supabase.com/docs/guides/getting-started/local-development) e a [documentação oficial do prisma](https://www.prisma.io/docs/guides/migrate/seed-database).

## Contribuidores ✨

<a href="https://github.com/ocodista/trampar-de-casa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ocodista/trampar-de-casa&anon=0&columns=20&max=100" />
</a>

Toda e qualquer contribuição é muito bem-vinda!
