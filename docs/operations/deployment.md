# 部署

## 静态构建

```bash
npm ci --legacy-peer-deps
npm run build
```

产物位于 `dist`，同时生成运行时 `env-config.js`。

## 容器镜像

```bash
./build.sh --image g2rain/g2rain-cms-app --tag <tag> --build-mode production
```

脚本默认镜像 `g2rain/g2rain-cms-app:latest`。Docker builder 安装锁定依赖，运行 `npm run build:config`，再按 `VITE_BUILD_MODE` 调用 Vite。运行镜像基于 OpenResty，对外声明端口 8080，但 Nginx 默认监听 `SERVER_PORT=80`，部署平台应显式完成端口映射。

OpenResty 提供：静态资源与 SPA fallback；`/api/`、`/doc/` 到 Gateway 的代理；`/auth/` 到 IAM 的代理；公开密钥读取及 `/lua/sign_code` 签名辅助端点。

发布前验证 Context Path、Gateway/IAM 解析、SSO 回调、密钥挂载、静态缓存、页面刷新和容器健康。`lua/keys` 下的真实密钥必须由部署系统注入，不能进入镜像上下文或 Git。

