# 配置

环境变量由 Vite 构建配置和容器运行时共同使用。只记录变量名和职责，不在文档保存环境实际密钥或凭据。

| 变量 | 用途 |
| --- | --- |
| `VITE_APPLICATION_CODE` | Basis 资源加载使用的应用编码 |
| `VITE_CONTEXT_PATH` | Vite base、Router base 和代理前缀 |
| `VITE_BACKEND_ORIGIN` | 本地 Vite 代理目标 |
| `VITE_TOKEN_END_POINT`、`VITE_AUTH_END_POINT` | Token 与认证端点 |
| `VITE_SSO_BASE_URL`、`VITE_REDIRECT_URI` | 独立模式 SSO 与回调 |
| `VITE_MOCK_ENABLED` | 开发 Mock 开关，生产必须关闭 |
| `VITE_SERVER_PORT` | Vite 开发端口 |
| `VITE_RUN_MODE` | `alone` 表示独立模式；默认集成意图 |
| `VITE_MAIN_SHELL_ORIGIN`、`VITE_MAIN_SHELL_REDIRECT_PREFIX` | 主应用入口跳转 |
| `VITE_I18N_TAGS` | 远程 i18n 消息标签 |

默认开发值包括应用编码 `g2rain-cms-app`、Context Path `/cms` 和端口 `3001`。Vite 构建会生成 `dist/env-config.js`，容器启动时仅用 `SSO_BASE_URL` 替换其中的占位符。

OpenResty 模板还需要 `GATEWAY_HOST`、`GATEWAY_PORT`、`IAM_HOST`、`IAM_PORT`、`SERVER_PORT` 和 `CONTEXT_PATH`。

