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

## 架构

[关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)是最重要的原则。通过将业务对象、业务流程和视图分开来，简化了程序的开发和维护。Clean Architecture 由 Robert C. Martin 在 2012 年提出，包含四个层级：实体、用例、接口适配器、框架和驱动。这些层次之间遵循着严格的依赖原则：

- 源代码中的依赖关系只能从外层指向内层，它们都应依赖于抽象概念。
- 抽象不应依赖于具体实现，具体实现应依赖于抽象。

所以，我们决定将应用分为四层：

- 实体（Entity）：包含核心业务数据和逻辑的对象，这些是业务领域的基础。实体不能有任何外部依赖。
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
- [nitro](https://nitro.unjs.io/)

## 脚本

- `dev` 启动开发服务
- `dev:mock` 启动开发服务，同时启动 mock 服务
- `server` 启动 mock 服务
- `build` 构建项目
- `type-check` 类型检查
- `lint:fix` 代码检查修复
- `test` 执行测试
- `coverage` 执行测试并生成覆盖率报告
- `prepare` 配置 git hooks

## Mock

我们使用 nitro 作为 mock 服务，支持全局和局部 mock。项目中硬编码了 mock 服务端口为8080，如果存在冲突，可修改以下文件内容

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

### 使用

- 开启/关闭 mock 功能： .env文件 `VITE_MOCK_ENABLE=true/false`
- 开启/关闭全局 mock: .env文件 `VITE_MOCK_GLOBAL=true/false`
- 局部 mock: 请求头中添加 `x-mock: true`

### 优势

- 无侵入性
- 独立服务
- 完整 server 端能力，支持中间件/插件/存储，能够完美模拟服务端数据变更
- 可用 typescript，复用业务类型定义
- 支持热更新

## 检查清单

使用这个模板时，请按照以下清单确保你的信息更新正确：

- [ ] 在 `LICENSE` 文件中更改作者名字
- [ ] 在 `index.html` 文件中更改网站标题
- [ ] 更换 `public` 目录下的 `logo.svg` 文件
- [ ] 修改 `.env.development` 文件中的 `VITE_API_BASE_URL` 为开发环境接口域名
- [ ] 创建 `.env.production` 文件， 修改 `VITE_API_BASE_URL` 为生产环境接口域名
