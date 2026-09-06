# 资源配置生成

```bash
npm run build:config
```

工具读取：

- `src/views/route-map.ts`：生成页面资源。
- `src/views/**/*.vue`：解析权限指令，生成页面元素。

输出到忽略跟踪的 `src/shared/config-util/config`：

- `resources.json`
- `pages.json`
- `page-elements.json`

输出目录及文件会被创建或覆盖。当前主流程已注释 API 文件解析与 `api-endpoints.json` 输出，因此 `resources.json.apiEndpoints` 为空；不能把本命令当成完整 API 权限配置生成器。

Docker 构建会先运行此命令，因为本地 Mock 静态导入 `resources.json`。修改路由或权限指令后必须重新生成、检查差异/内容并运行构建。

