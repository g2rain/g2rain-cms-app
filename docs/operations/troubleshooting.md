# 故障排查

| 现象 | 检查 |
| --- | --- |
| 子应用无法加载 | main-shell entry/activeRule、`VITE_CONTEXT_PATH`、静态资源地址和 CORS |
| 页面为空或路由未匹配 | `/basis/authority/resources` 返回页面、`linkPath` 与 route-map 是否一致 |
| 独立模式反复跳 SSO | SSO 地址、redirect URI、Context Path、Token 端点和浏览器存储 |
| 集成模式请求 401 | qiankun props 中 Token/Client/KID、实例 `appKey` 以及刷新屏障 |
| CMS 请求 404 | `/cms` 路由前缀、Gateway 路由及后端部署状态 |
| 容器启动失败 | 必填 Gateway/IAM 变量、模板渲染后的 Nginx 配置和监听端口 |
| 签名或密钥端点失败 | 部署挂载的 key 文件名、格式、权限和 luaossl 加载状态 |
| 资源 JSON 漂移 | Docker 不自动生成；手工执行并审查 `npm run build:config` |

构建成功但出现警告时，先对照[测试说明](../development/testing.md)。循环分块警告可能影响执行顺序，不能只因退出码为 0 就忽略发布回归。

