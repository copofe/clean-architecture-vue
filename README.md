<img src='./public/logo.svg' width='180'/>

A front-end template designed for building web applications with Vue.js.

[Live Demo](https://frontend-clean-architecture.vercel.app/)

[Create a repo from this template on GitHub.](https://github.com/copofe/frontend-clean-architecture/generate)

[中文介绍](./README-zh_CN.md)

## Features

- Preconfigured with code quality tools: ESLint, TypeScript, Vitest, etc.
- Preconfigured with workflow tools: commitlint, husky, etc.
- Preconfigured with VSCode code snippets and other VSCode settings.
- Auto imports components.
- Auto imports APIs (Vue, Vue Router, Vue I18n).
- I18n ready.
- Mock ready.

## Principles

[Separation Of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) is most important. By separating business objects, business workflows, and views, the development and maintenance of the program is simplified. Clean Architecture was proposed by Robert C. Martin in 2012. It is divided into four levels in total (Entities, Use Cases, Interface Adapters, Frameworks and Drivers). There is a dependency principle between layers:

The dependency relationships in the source code can only point to the inner layer of the same concentric circle, that is, low-level mechanisms point to high-level policies:

- High-level modules should not depend on low-level modules, both should depend on their abstractions.
- Abstractions should not depend on details, details should depend on abstractions.

Based on these principles, we decided to split into four layers:

- Entity: Business objects that encapsulate core business data and logic that are essential to the business domain.
- Repository: Abstracts data access and storage responsibilities away from business objects, handles CRUD operations and queries against persistence storage.
- Use Case: Contains application-specific business rules and workflows, coordinates work across entities and repositories to perform specific application goals.
- View: Renders UI components and handles presentation responsibilities, communicates with use cases to display information and collect user input.

## Tech Stack

- [Vue 3](https://github.com/vuejs/core), [Vue Router](https://router.vuejs.org/), [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Shadcn-Vue](https://www.shadcn-vue.com/)
- [Vue I18n](https://vue-i18n.intlify.dev/), [@intlify/unplugin-vue-i18n](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n)
- [Vitest](https://vitest.dev/)
- [nitro](https://nitro.unjs.io/)

## Scripts

- `dev` : Start development server
- `dev:mock` : Start development server with mock server
- `server` : Start mock server
- `build` : Build production files
- `type-check` : Check types
- `lint:fix` : Lint check and fix
- `lint-staged` : Lint staged files
- `test` : Run tests
- `coverage` : Run tests and generate coverage report
- `prepare` : Configure husky hooks

### Mocking

We use nitro as mock service, supporting global and local mocking. The mock server port is hardcoded as 8080 in the project. If there is a conflict, you can modify the following:

- `package.json`
```json
{
  "scripts": {
    "server": "nitro dev --port <your port>"
  }
}
```

- `.env`
```env
VITE_MOCK_SERVER=http://localhost:<your port>
```

#### Usage

- Enable/disable mock: .env file `VITE_MOCK_ENABLE=true/false`
- Enable/disable global mock: .env file `VITE_MOCK_GLOBAL=true/false`
- Local mock: Add `x-mock: true` in request header

#### Benefits

- Non-invasive
- Independent service
- Complete server capabilities, supports middleware/plugins/storage, perfectly simulate server data changes
- Use TypeScript, reuse business type definitions
- Support hot updates

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `index.html`
- [ ] Change the `logo.svg` in `public`
- [ ] Change the `VITE_API_BASE_URL` in `.env` file to the dev environment API domain
- [ ] Create `.env.production` file and modify `VITE_API_BASE_URL` to the production API domain
