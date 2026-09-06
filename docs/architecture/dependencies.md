# 依赖与协作

公共规则以中央 `frontend-app 1.0.0` 为准。本项目使用 `@shared`、`@/components`、`@platform`、`@runtime` 和 `@` 别名表达依赖。

| 系统 | 本项目依赖内容 | 本项目不拥有 |
| --- | --- | --- |
| `g2rain-cms` | `/cms/*` 业务 API | 数据模型的权威规则、事务和持久化 |
| `g2rain-basis` | `/basis/authority/resources`、机构搜索等平台资源 | 应用权限资源的治理与持久化 |
| `g2rain-iam` | SSO、Token、公开密钥与客户端认证 | 会话和令牌签发规则 |
| Gateway | `/api/` 统一入口、鉴权与转发 | 网关路由及授权策略 |
| `g2rain-main-shell` | qiankun 属性、Locale、Token、路由事件 | 全局菜单、Tab 与子应用注册 |

跨层反向依赖必须记录在[偏差](deviations.md)。新增功能优先把平台相关实现放在 `platform/runtime`，避免让基础组件直接感知业务页面。

