# 部署

## 静态构建

```bash
npm ci --legacy-peer-deps
npm run build
```

产物位于 `dist`，同时生成运行时 `env-config.js`。

## 容器镜像

```bash
./build.sh --image ghcr.io/g2rain/g2rain-cms-app --tag 1.0.0 --build-mode production
```

本地脚本与 CI 都使用根目录 Dockerfile、`VITE_BUILD_MODE=production`、`IMAGE_VERSION` 和 `VCS_REF` 构建参数。Docker 使用 Node 22 Alpine 执行 `npm run build`（包括 `vue-tsc`），再由 OpenResty Alpine 提供静态资源；`create-g2rain-app` 使用最小 stub 满足镜像内的 `npm ci`。镜像构建不运行 `build:config`，因此修改路由或权限资源后必须先在本地运行并审查 `npm run build:config`。Dockerfile 声明端口 8080，但 Nginx 默认监听 `SERVER_PORT=80`，部署平台应显式完成端口映射。

OpenResty 提供：静态资源与 SPA fallback；`/api/`、`/doc/` 到 Gateway 的代理；`/auth/` 到 IAM 的代理；公开密钥读取及 `/lua/sign_code` 签名辅助端点。

发布前验证 Context Path、Gateway/IAM 解析、SSO 回调、密钥挂载、静态缓存、页面刷新和容器健康。`lua/keys` 下的真实密钥必须由部署系统注入，不能进入镜像上下文或 Git。

## GitHub Container Registry（GHCR）

镜像地址是 `ghcr.io/g2rain/g2rain-cms-app`。本地容器构建、CI 构建/类型检查、容器构建、GHCR 推送、匿名拉取和实际部署验证是不同活动：本地 Docker 成功不等于 CI、推送、公开拉取或部署已经成功。

工作流 `.github/workflows/image.yml` 只在推送精确格式的稳定 tag（例如 `v1.0.0`）时触发，不响应分支推送、Pull Request 或手动触发。它严格校验 tag 格式、tag 提交已进入 `origin/main`、同名非空发布说明存在，以及 `package.json` / `package-lock.json` 版本与 tag 一致；随后运行 `npm ci --legacy-peer-deps` 和 `npm run build`。仓库没有 `test` 或 `lint` 脚本，故当前 CI 自动验证范围仅为依赖安装、类型检查和生产构建。

工作流使用 GitHub 自动提供的 `GITHUB_TOKEN` 登录 GHCR，权限仅为 `contents: read` 与 `packages: write`。仅当 `1.0.0` 与 `sha-<完整提交 SHA>` 两个标签均推送成功后，Actions Summary 才会记录发布成功；失败时工作流会失败，不会把登录、构建或部分 layer 上传当作发布成功。它不会创建 GitHub Release、部署服务或更新 `latest`。

本仓采用 `feature/* → develop → main` 流程。先将版本、工作流和 `docs/releases/v<版本>.md` 通过该流程合入 `main`，验证该提交后再创建版本 tag：

```bash
git tag v1.0.0
git push origin v1.0.0
```

首次成功推送后，如需匿名拉取，请在 GitHub Packages 打开该包，然后进入 **Package settings → Change visibility → Public**。如果组织管理员禁止修改可见性，应联系管理员。已有 GHCR 包还可能需要在 **Package settings → Actions access** 中授予本仓库写权限；若出现 `denied`，先检查此设置和组织 Packages 策略，不能仅凭 workflow 的 `packages: write` 断言权限已足够。

最终镜像包含 `dist`、Nginx 模板、启动脚本、Lua 代码和离线 luaossl 构建结果；不包含源码与 Node 依赖。已跟踪的 `.env.production` 会进入 Docker 构建上下文，当前仅含构建占位符和路径配置，维护者应在发布前复核其中是否出现私有地址或凭据。`.dockerignore` 排除 `lua/keys/`，Dockerfile 只创建空目录；生产私钥、IAM 公钥和 key ID 应通过受控 volume 或 Secret 在运行时注入。Docker 忽略规则不改变 Git 中已跟踪文件的可见性。

