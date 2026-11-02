# 测试

## 当前状态

- `package.json` 未定义 `test` 或 `lint`。
- 仓库未发现自动化测试套件；`src/components/http/mock-data/data/test.api.ts` 是 Mock API 数据文件，不是测试。
- 2026-09-06 执行 `npm run build` 通过，自动化测试数为 0。

## 必做验证

| 变更 | 最低验证 |
| --- | --- |
| 任意 TypeScript/Vue 修改 | `npm run build` |
| 页面/接口 | 查询、保存、删除、错误态与权限态人工验证 |
| 路由/权限资源 | 运行并审查 `npm run build:config` |
| runtime/platform | 独立模式与 qiankun 集成模式回归 |
| 生成器 | 在可丢弃分支或临时副本生成并审查全部输出 |
| 部署 | 镜像构建、Context Path、代理和 SPA 刷新验证 |

## 已知构建警告

当前成功构建仍包含 auth re-export 循环分块、动态/静态混合导入、MockJS `eval`、非 module `env-config.js` 和超过 500 kB 的分块警告。修复前发布评审需显式接受这些风险。

