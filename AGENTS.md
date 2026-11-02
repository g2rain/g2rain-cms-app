# g2rain-cms-app Agent Instructions

本文件是 AI Coding 在本项目中的执行入口。事实来源位于 `docs`、当前源码、`package.json`、环境文件和部署文件。

## 项目定位

- 类型：Vue 3 CMS 业务微前端 App
- 项目事实：`docs/project.yaml`
- 文档入口：`docs/index.md`
- 目标中央 Profile：`frontend-app 1.0.0`
- 固定基线：`architecture-v1.1.0`
- 本项目偏差：`docs/architecture/deviations.md`

项目负责站点、空间、栏目、页面、文章、分类、标签和文章标签关系的管理界面。它不拥有 `g2rain-cms` 的领域数据和服务端规则，也不替代 IAM、Gateway 或 main-shell。

## 开始前

按任务范围读取 `docs/project.yaml`、中央 Profile、本项目偏差、架构说明、代码约定、测试规范和完成定义，再读取任务对应需求。

## 执行规则

- 目标依赖方向是 `views -> runtime -> platform -> components -> shared`；组合入口为 `src/main.ts` 与 `src/App.vue`。
- 新代码不得扩大 `components -> platform/runtime`、`platform -> runtime`、`shared -> components/runtime` 等已登记偏差。
- CMS 页面、页面 API、类型与 Mock 放在 `src/views/<domain>`，并同步 `src/views/route-map.ts`。
- 同时评估 qiankun 集成模式和独立模式；实例按 `appKey` 隔离，卸载时清理 App、Router 和监听器。
- 前端权限不能替代服务端授权；当前 `hasApiPermission` 直接返回 `true`，不可声称已实施 API 授权。
- 不提交 Token、私钥、真实凭据或生产敏感地址；生产环境禁用 Mock。
- `build:generate` 会覆盖文件。执行前确认工作区安全，执行后审查 view、API、type、mock 和 route-map。
- `build:config` 当前仅生成 pages 与 page-elements，API parser 未接入主流程。

## 完成前

检查修改范围与 `git diff --check`，执行 `npm run build`。涉及资源时审查 `npm run build:config` 输出；涉及运行时则分别验证独立与集成模式，并按 `docs/development/definition-of-done.md` 报告缺口。

