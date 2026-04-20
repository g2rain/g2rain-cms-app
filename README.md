# g2rain-cms-app

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

基于 Vue 3 + TypeScript + Vite + Element Plus + qiankun 的 **CMS 业务**微前端子应用，可作为子应用被主应用加载，或独立运行。

**生态**：主壳 [g2rain-main-shell](https://github.com/g2rain/g2rain-main-shell)；通用子应用模板 [g2rain-app-template](https://github.com/g2rain/g2rain-app-template) 与脚手架 [create-g2rain-app](https://github.com/g2rain/g2rain-app-cli)；基建/平台能力子应用 [g2rain-infra-app](https://github.com/g2rain/g2rain-infra-app)。**本仓库**侧重 **CMS 内容管理**相关页面与生成器产出，与上述仓库同属 G2rain 前端体系。

## 目录

- [快速开始](#快速开始)
- [构建与 Docker](#构建与-docker)
- [代码与配置生成](#代码与配置生成)
- [文档](#文档)
- [贡献指南](#贡献指南)
- [安全](#安全)
- [许可证](#许可证)
- [联系我们](#联系我们)

## 快速开始

### 环境

- Node.js >= 18（与 `package.json` 中 `engines` 一致）
- npm >= 9

### 安装

```bash
npm install
```

### `.env` 最小配置

```env
VITE_APPLICATION_CODE=g2rain-cms-app
VITE_BASE_URL=/test/
VITE_BACKEND_ORIGIN=http://localhost:8080
VITE_APPLICATION_CONTEXT=/test
VITE_IAM_ORIGIN=http://localhost:8080
VITE_REFRESH_TOKEN_URL=/auth/refresh-token
VITE_GENERATE_TOKEN_URL=/auth/token
VITE_SSO_BASE_URL=https://sso.example.com
VITE_AUTH_END_POINT=/auth/authorize
VITE_REDIRECT_URI=http://localhost:3000/test/sso_callback
VITE_SERVER_PORT=3000
```

### 启动

```bash
npm run dev
```

### 构建与预览

```bash
npm run build
npm run preview
```

## 构建与 Docker

```bash
docker build -t g2rain-cms-app .
docker run -d -p 8080:8080 g2rain-cms-app
```

也可使用根目录 `build.sh` 构建镜像（镜像名默认取自 `package.json` 的 `name`）。

## 代码与配置生成

```bash
npm run build:generate -- --tables=dict
```

可选参数：`--no-view` `--no-api` `--no-mock` `--no-route`

```bash
npm run build:config
```

输出目录：`src/shared/config-util/config/`（该目录已在 `.gitignore` 中忽略，勿提交生成物）。

## 文档

- 架构：`ARCHITECHTURE.md`、`ARCHITECTURE_SPEC.md`
- 代码生成器：`src/shared/generator/README.md`
- 配置生成器：`src/shared/config-util/README.md`

## 贡献指南

我们欢迎所有形式的贡献。

**Issue 与讨论**请统一到主仓库 [g2rain/g2rain/issues](https://github.com/g2rain/g2rain/issues) 提交，便于集中跟踪；请在标题或正文中注明与 **g2rain-cms-app** 相关。

1. Fork 本仓库  
2. 创建分支：`git checkout -b feature/your-feature-name`  
3. 本地执行 `npm run build`，确保可通过编译  
4. 提交并推送后发起 **Pull Request**

维护者信息与 `package.json` 中 `contributors` 字段一致。

## 安全

安全相关问题请见 [SECURITY.md](SECURITY.md)。

## 许可证

本项目基于 [Apache 2.0 许可证](LICENSE) 开源。

## 联系我们

- **Issues**：[g2rain/g2rain/issues](https://github.com/g2rain/g2rain/issues)（集中受理；请标注子项目名）  
- **Discussions**：[g2rain/g2rain/discussions](https://github.com/g2rain/g2rain/discussions)  
- **邮箱**：g2rain_developer@163.com  

---

若本项目对你有帮助，欢迎点亮 Star。
