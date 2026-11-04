# 代码生成

页面骨架由 **g2rain-app-cli**（`g2rain-app generate`）生成，不再使用本仓内嵌引擎。

## 输入和输出

输入：`scripts/database.sql`

默认输出：

```text
src/views/<table>/
├── index.vue
├── api.ts
├── type.ts
└── mock.ts
```

同时更新 `src/views/route-map.ts`。

## 命令

```bash
node ./scripts/run-generate.mjs --tables=<table>
```

可选：`--skip-view` / `--skip-api` / `--skip-mock` / `--skip-route`。

依赖：`devDependency` `create-g2rain-app`（本地可为 `file:../g2rain-app-cli`）。
