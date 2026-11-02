# 业务页面约定

每个 CMS 领域通常位于 `src/views/<domain>`：

| 文件 | 职责 |
| --- | --- |
| `index.vue` | 查询、表格、编辑对话框和领域交互 |
| `api.ts` | 对 `/cms/<domain>` 的请求封装 |
| `type.ts` | 页面使用的实体、查询和表单类型 |
| `mock.ts` | 仅开发 Mock 的内存数据与请求处理 |

当前 route-map 注册 `space`、`channel`、`article`、`page`、`tag`、`article_tag_relation`、`web_site` 和 `article_category`。`dict` 与 `organ` 是辅助 API/类型，不是 CMS 主路由页面。

新增或修改页面时：

1. 核对后端 API 路径、字段、状态值和并发版本字段。
2. 保持查询参数、分页结果和保存 DTO 类型明确。
3. 补齐加载、空数据、错误、权限不足和重复提交反馈。
4. 同步 route-map、Basis 资源配置与 i18n 文案。
5. 逐项验证新增、编辑、删除和领域特有操作。

