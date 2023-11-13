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

The Trampar de Casa is an open-source initiative dedicated to connecting Brazilian developers to remote work opportunities, encouraging inclusion, diversity, and eradicating geographical boundaries.

On Wednesdays, we send one email with 100% remote job opportunities. National (🇧🇷) or International (🌍).

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

## How to execute

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose (2.20 or newer)](https://docs.docker.com/compose/install/)

1. After the clone of the repository from your fork, go to the main folder.
2. Run the command `make setup-env` to create the `.env` files.  
  2.! If you're not running from a GNU-based system, copy the `.env.example` to `.env`,
  and `docker/.env.example` to `docker/.env`. Then fill the property `INCLUDE_PATH` with
  the result of the `pwd` command.  
3. Run the command `docker-compose up -d` and after it finished, run the command `make migrate`.  
  3.! If you're not running from a GNU-based system, run `docker-compose exec app sh -c 'turbo run db:migrate --filter=db -- --db-url="$$DATABASE_URL"'`.
6. An application will be available at http://localhost:3000.
7. If you have any doubts, open an _issue_ in this repository.

## How to execute in a local environment

### Prerequisites

- [Docker](https://www.docker.com/)
- [Supabase CLI](https://supabase.com/docs/reference/cli/introduction)
- [Yarn](https://yarnpkg.com/)
- [Turbo](https://turbo.build/)

1. After the clone of the repository from your fork, go to the main folder.
2. Run the command `yarn`.
3. Then, run `yarn setup`.  
   3.a Copy the value from `service_role key`.  
   3.b Create a copy from the file `apps/web/.env.example` called `apps/web/.env`.  
   3.b.! If your system is GNU-based, run: `cp apps/web/.env.example apps/web/env`.  
   3.c Copy the value from `service_role key` to the `SUPABASE_SERVICE_ROLE` property.  
4. Then, run `yarn dev`.
5. An application will be available at http://localhost:3000.
6. If you have any doubts, open an _issue_ in this repository.

## Contributors ✨

<a href="https://github.com/ocodista/trampar-de-casa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ocodista/trampar-de-casa&anon=0&columns=20&max=100" />
</a>

Any contribution is very much appreciated.
