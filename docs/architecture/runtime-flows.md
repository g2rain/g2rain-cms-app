# 运行流程

## 独立模式

1. `mode=alone` 或 `VITE_RUN_MODE=alone` 使入口直接渲染。
2. 应用创建 Store、i18n、Element Plus 与权限插件。
3. Mock 开启时可建立本地模拟会话；否则未登录跳转 IAM SSO。
4. 从 `/basis/authority/resources` 加载资源并创建 Web History 路由。
5. 本地 route-map 将获准路径解析为 CMS 页面。

## 集成模式

1. qiankun 调用 bootstrap/mount，并通过 props 提供 `appKey`、Token、Locale、初始路由等。
2. 应用先创建空的系统路由，再初始化 Token 与资源路由。
3. 使用 Memory History；子应用路由变化通过 `g2rain:sub-app:route-change` 通知主应用。
4. update 可刷新 Token、Locale、资源路由和初始路由。
5. unmount 按 `appKey` 清理 Vue、Router、shell 与 Token 失效监听。

资源加载失败时应用可能触发 SSO 或仅保留系统路由。前端资源权限不能替代服务端校验。

