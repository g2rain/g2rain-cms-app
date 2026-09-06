# 本地开发

## 准备

- Node.js 22 或更高版本
- npm（以 `package-lock.json` 为准）
- 可访问的 IAM、Gateway、Basis 与 CMS 服务；或仅在本地使用 Mock

```bash
npm ci --legacy-peer-deps
npm run dev
```

默认 `.env` 使用应用编码 `g2rain-cms-app`、Context Path `/cms`、端口 `3001` 和独立模式。环境文件可能包含环境地址，提交前必须检查，禁止写入 Token 与私钥。

## 联调

- 独立模式：确认 SSO 回调、资源加载、Web History 与刷新行为。
- 集成模式：由 main-shell 注册子应用，确认 `appKey`、Token、Locale、初始路由、路由事件和卸载清理。
- CMS 页面：至少覆盖查询、保存、删除，并验证状态更新或批量标签等领域动作。

完成修改后运行 `npm run build`。项目暂时没有自动化 test/lint 命令。

