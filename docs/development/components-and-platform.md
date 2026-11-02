# 组件与平台能力

## components

- `http`：Axios Client、认证拦截器、刷新屏障、签名、参数序列化与 Mock。
- `permission`：页面元素与 API 权限接口。
- `RemoteSelect`：远程选择、机构选择、字典选择/显示与状态开关。
- `TableSort`、`QueryForm`：列表查询、列配置与排序交互。
- `MarkdownEditor`：文章或页面内容编辑。
- `micro-app`：主子应用消息与窗口事件适配原语。

## platform

- `stores`：Token 与 Locale 状态。
- `i18n`、`locale`：远程多语言消息、Element Plus Locale 与持久化。
- `apps`：qiankun 生命周期、Token 初始化、路由同步与主应用事件。

基础组件当前仍有对 platform/runtime 的反向依赖，详见[架构偏差](../architecture/deviations.md)。新增组件不得继续扩大该耦合。

