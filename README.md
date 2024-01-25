<img src='./public/logo.svg' width='180'/>

A front-end template that considers itself excellent for building web applications with Vue.

[Live preview](https://frontend-clean-architecture.vercel.app/)

[Create a repo from this template on GitHub.](https://github.com/copofe/frontend-clean-architecture/generate)

## Features

- Preconfigured with code quality tools: ESLint, TypeScript, Vitest, etc.
- Preconfigured with workflow tools: commitlint, husky, etc.
- Preconfigured with VSCode code snippets and other VSCode settings.
- Auto imports components.
- Auto imports APIs (Vue, Vue Router, Vue I18n).
- I18n ready.
- Mocking ready.

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
- [msw.js](https://mswjs.io/)
