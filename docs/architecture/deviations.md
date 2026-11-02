# 架构偏差

本项目目标采用 `frontend-app 1.0.0`，当前登记以下源码事实。状态为“待迁移”不授权普通需求顺带重构。

| 偏差 | 证据 | 风险 | 状态 |
| --- | --- | --- | --- |
| components 依赖 platform/runtime | ErrorMessage、RemoteSelect、HTTP interceptor 与 mock-data 引用 i18n、Store 或 runtime 类型 | 基础组件难以独立复用，可能形成循环分块 | 待迁移 |
| platform 依赖 runtime | locale store/i18n 和 qiankun adapter 引用 runtime API、boot、router | 平台层与运行编排耦合 | 待迁移 |
| shared 生成工具依赖上层 | config-util 和 generator 模板引用 runtime/platform/components | `shared` 不是纯底层，生成结果可能固化偏差 | 待迁移 |
| API 权限校验未实施 | `ResourceManager.hasApiPermission` 直接返回 `true` | 前端不能准确呈现 API 权限；服务端必须兜底 | 已知限制 |
| 资源生成未启用 API parser | `generateConfig` 中 API 解析和输出被注释 | `apiEndpoints` 生成为空，不能用于完整权限登记 | 已知限制 |
| 自动化测试缺失 | 无 test 脚本与测试套件 | 双模式、认证和 CMS 操作依赖人工回归 | 待补充 |
| 构建警告 | 循环分块、MockJS eval、经典 env-config.js 和大分块 | 执行顺序、安全审计和加载性能风险 | 待评估 |

