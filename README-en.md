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

## About the Project 🎯

Work from Home is an open-source initiative dedicated to connecting Brazilian developers with remote work opportunities, encouraging inclusion, diversity, and breaking geographical barriers.

Every week, we send out an email with 100% remote job opportunities that match the profile of our subscribers.

## [Manifesto on Remote Work](./manifesto.md)

## Project Roadmap 🚧

- [ ] **Preference Registration**: Define users' work preferences.
- [ ] **Selection and Sending of Customized Job Positions**: Send selected job positions based on preferences.
- [ ] **Automating Job Postings**: Regularly send opportunities without active searching.
- [ ] **Page for Partner Companies**: Display more details about partner companies.

---

## How to Contribute 🚀

1. **Fork** the repository.
2. **Clone** your fork to your local development environment.
3. **Create** a new branch for your feature or fix.
4. **Implement** your changes and add tests, if applicable.
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
  and `supabase/.env.example` to `supabase/.env`. Then fill the property `INCLUDE_PATH`
  in the root `.env` file with the result of the `pwd` command.  
3. Run the command `docker-compose up -d` and after it finished, run the command `make migrate`.  
  3.! If you're not running from a GNU-based system, run `docker-compose exec app sh -c 'turbo run db:migrate --filter=db -- --db-url="$$DATABASE_URL"'`.
6. An application will be available at http://localhost:3000.
7. If you have any questions, open an _issue_ in this repository.

## How to Run the Application Locally

### Prerequisites

- [Docker](https://www.docker.com/)
- [Supabase CLI](https://supabase.com/docs/reference/cli/introduction)
- [Yarn](https://yarnpkg.com/)
- [Turbo](https://turbo.build/)

1. After cloning the repository locally from your fork, enter the created folder.
2. Run the command `yarn`.
3. Then, run the command `yarn setup`
4. Next, run the command `yarn dev`.
5. The application will be available at http://localhost:3000.
6. If you have any questions, open an _issue_ in this repository.

## Contributors ✨

<a href="https://github.com/ocodista/trampar-de-casa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ocodista/trampar-de-casa&anon=0&columns=20&max=100" />
</a>

All contributions are very welcome!
