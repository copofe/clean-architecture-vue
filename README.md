# Frontend Clean Architecture Project Template

[Create a repo from this template on GitHub.](https://github.com/copofe/frontend-clean-architecture/generate)

## Principles

Domain-Driven Design (DDD) and Clean Architecture represent two fundamental principles in software design. DDD emphasizes creating a shared language with domain experts, translating domain models into code, and implementing domain logic using domain terms. Clean Architecture provides a layered structure that isolates core business logic from the external world, fostering testability and modularity. Their integration aims to establish a lucid software architecture and sustainable domain models.

## Application Architecture

### Entity Layer

- Represents core objects and data structures in the business domain.
- Includes business-related attributes, methods, identity, associations, and domain events.
- Primarily focuses on essential concepts in the business domain.

### Repository Layer

- Encapsulates access and operations on data storage, providing CRUD operations.
- Offers an abstract interface, concealing specific data storage implementation details.
- May include access logic for data caching, remote data sources, and local databases.

### Usecase Layer

- Implements specific business use cases, rules, and processes, coordinating interactions between entities and repositories.
- Contains concrete use cases, business rules, and processes, fulfilling specific business requirements.
- Typically encompasses logic and handling related to business processes.

### View Layer (with vue)

- Presents data in a user-friendly manner through graphical interfaces, web pages, or mobile app interfaces.
- Receives user input and forwards actions to other layers for processing.
- Manages user interactions, responds to actions, displays feedback, and handles user events.

## Technology Stack

- Typescript
- Vue 3
  - vite
  - pinia
  - vue Router
  - unplugin-auto-import
  - unplugin-vue-components
  - shadcn-vue
- TailwindCSS

## Developer Experience

- `unplugin-auto-import` - Directly use Vue Composition API and others without importing
- `unplugin-vue-components` - Auto import components
- `.vscode/workspace.code-snippets` - Quickly generate code snippets
- `.vscode/extensions` & `.vscode/settings.json`
  - Provide comprehensive type hints
  - automatically lint and format code.
  - i18n intellisense
