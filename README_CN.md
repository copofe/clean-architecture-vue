<img src='./public/logo.svg' width='180'/>

一个专为构建基于 Vue 的 Web 应用程序而设计的前端模板。

[在线演示](https://frontend-clean-architecture.vercel.app/)

[在 GitHub 上基于此模板创建你的仓库。](https://github.com/copofe/frontend-clean-architecture/generate)

## 特性

- 预先配置了多种代码质量工具，如 ESLint、TypeScript、Vitest 等。
- 预先配置了多种工作流工具，如 commitlint、husky 等。
- 预先设置了 VSCode 的代码片段和其他相关配置。
- 支持自动导入组件。
- 支持自动导入 APIs（Vue、Vue Router、Vue I18n）。
- 已准备好国际化功能。
- 已准备好模拟数据功能。

## 原则

[关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)是最关键的原则。它通过将业务对象、业务流程和视图分开来，简化了程序的开发和维护。Clean Architecture 由 Robert C. Martin 在 2012 年提出，包含四个层次：实体、用例、接口适配器、框架和驱动。这些层次之间遵循着严格的依赖原则：

- 源代码中的依赖关系只能从外层指向内层，它们都应依赖于抽象概念。
- 抽象不应依赖于具体实现，具体实现应依赖于抽象。

基于这些原则，模板分为四个层次：

- 实体（Entity）：包含核心业务数据和逻辑的对象，这些是业务领域的基础。
- 仓库（Repository）：负责从业务对象中分离数据访问和存储职责，处理数据的增删改查操作和持久化存储的查询。
- 用例（Use Case）：包含应用程序特定的业务规则和流程，协调实体和仓库的工作，实现应用程序的特定目标。
- 视图（View）：负责渲染用户界面组件和展示职责，与用例交互以展示信息和收集用户输入。

## 技术栈

- [Vue 3](https://github.com/vuejs/core)、[Vue Router](https://router.vuejs.org/)、[Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Shadcn-Vue](https://www.shadcn-vue.com/)
- [Vue I18n](https://vue-i18n.intlify.dev/)、[@intlify/unplugin-vue-i18n](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n)
- [Vitest](https://vitest.dev/)
- [msw.js](https://mswjs.io/)

## 检查清单

使用这个模板时，请按照以下清单确保你的信息更新正确：

- [ ] 在 `LICENSE` 文件中更改作者名字。
- [ ] 在 `index.html` 文件中更改网站标题。
- [ ] 更换 `public` 目录下的 `logo.svg` 文件。
