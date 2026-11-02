# 分层

目标顺序是 `shared -> components -> platform -> runtime -> views`，依赖方向为 `views -> runtime -> platform -> components -> shared`。

| 层 | 当前职责 | 典型内容 |
| --- | --- | --- |
| `shared` | 无业务状态的环境、URL、加密辅助与构建期工具 | `env.ts`、`utils`、`generator`、`config-util` |
| `components` | 可复用 UI 与底层前端能力 | HTTP、错误、权限、RemoteSelect、MarkdownEditor、TableSort |
| `platform` | 平台语义与宿主适配 | Store、i18n、Locale、qiankun adapter |
| `runtime` | 应用启动和运行编排 | auth、boot、router、resource、micro-shells |
| `views` | CMS 业务用例 | 站点、空间、栏目、页面、文章、分类、标签 |

`src/main.ts` 与 `src/App.vue` 是组合根。生成器虽然位于 `shared`，但其模板依赖上层类型和组件，因此只可视为构建期遗留工具，不能作为运行时分层范例。

