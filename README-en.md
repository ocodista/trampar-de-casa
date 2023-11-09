# Trampar de Casa 💻🏠

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ocodista/trampar-de-casa/main)
![GitHub contributors](https://img.shields.io/github/contributors/ocodista/trampar-de-casa)
![Website](https://img.shields.io/website?up_message=online&up_color=green&down_message=offline&down_color=red&url=https%3A%2F%2Fwww.trampardecasa.com.br%2F)
![GitHub license](https://img.shields.io/github/license/ocodista/trampar-de-casa)

![Static Badge](https://img.shields.io/badge/nextjs-white?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=black&color=white)
![Static Badge](https://img.shields.io/badge/typescript-%2306B6D4?style=for-the-badge&logo=typescript&labelColor=white&color=%233178C6)
![Static Badge](https://img.shields.io/badge/vite-%23646CFF?style=for-the-badge&logo=vite&labelColor=black)
![Static Badge](https://img.shields.io/badge/tailwindcss-%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=black&color=%2306B6D4)

[Versão em português](./README.md)

## About the project 🎯

The Trampar de Casa is an open-source
an initiative dedicated to connecting Brazilian developers to remote work opportunities, encouraging inclusion, diversity, and through geographical boundaries.

Weekly, we send one email with job opportunities and 100% remotes matching our subscribers' profiles.

## [Manifest about remote work](./manifesto.md)

## Roadmap of the project 🚧

- [ ] **Preference Registration**: Define the preference of work of our users.
- [ ] **Select and send personalized job opportunities**: Send selected job opportunities with the user's preferences.
- [ ] **Automatic send job opportunity**: Send job opportunities regularly with no actively searching.
- [ ] **A page for partner companies**: Show more info about partner companies.

---

## How to Contribute 🚀

1. **Fork** of the repository.
2. **Clone** of the repository in your local development environment.
3. **Create** a new branch to your new function or correction.
4. **Implement** your changes and add unit tests, if applicable.
5. **Push** to your branch in your fork.
6. Send a **Pull Request** to the main repository.

---

## How to execute in a local environment

1. After the clone of the repository from your fork, go to the main folder.
2. Run the command `yarn`.
3. If you don't have `yarn` installed, run `npm install --global yarn`.
4. To run the app locally, run `turbo dev`.
5. If you don't have `turbo` installed, run `npm install --global turbo`.
6. A application will be available at http://localhost:3000.

## How to set up the database locally

1. Be sure you have the [docker](https://www.docker.com/) installed on your machine.
2. Navigate to the `apps/web` folder.
3. Run the command `npm install` to install all the project dependencies.
4. In the folder packages/db (`cd packages/db`), run the command `npm run db-start` to create the folder `prisma/client` and set up a local instance of Supabase.
5. You will see info about your local Supabase credentials in the terminal.
6. In the folder apps/web (`cd apps/web`), create a `.env` file.
7. Copy the content of `.env.example` to your `.env` file, and fill in the `SUPABASE_URL` and the `SUPABASE_SERVICE_ROLE` with the credentials of the 5 step.
8. Run the command `npm run db-seed` if you want to populate your database.
9. In case of any doubts, you can consult the official documentation of the [supabase](https://supabase.com/docs/guides/getting-started/local-development) and [prisma](https://www.prisma.io/docs/guides/migrate/seed-database).

## Contributors ✨

<a href="https://github.com/ocodista/trampar-de-casa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ocodista/trampar-de-casa&anon=0&columns=20&max=100" />
</a>

Any contribution is very much appreciated.
