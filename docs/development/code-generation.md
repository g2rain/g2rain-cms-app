# 代码生成

命令：

```bash
npm run build:generate -- --tables=article,tag
```

## 输入与输出

- 必填输入：`--tables=<逗号分隔表名>` 或 `--tables <逗号分隔表名>`。
- 表结构来源：`src/shared/generator/database.sql`。
- 输出：`src/views/<table>/index.vue`、`api.ts`、`type.ts`、`mock.ts`。
- 路由输出：更新 `src/views/route-map.ts`。

默认生成全部内容。可用开关 `--no-view`、`--no-api`、`--no-mock`、`--no-route` 分别关闭一类输出。

## 覆盖风险

生成实现使用直接写文件，会无提示覆盖同名页面、API、类型和 Mock。路由更新也会改现有 route-map。因此：

1. 只在干净或已安全保存的工作区执行。
2. 先确认 SQL 中表结构与后端契约一致。
3. 对已有业务页面优先使用 `--no-*` 缩小范围。
4. 生成后逐文件审查，不把生成结果视为架构事实。
5. 运行 `npm run build` 并人工验证业务流程。

