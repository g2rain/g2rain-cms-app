# g2rain-cms-app

## 1. 环境
- Node.js >= 18
- npm >= 9

## 2. 安装
```bash
npm install
```

## 3. `.env` 最小配置
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

## 4. 启动
```bash
npm run dev
```

## 5. 构建与预览
```bash
npm run build
npm run preview
```

## 6. Docker
```bash
docker build -t g2rain-cms-app .
docker run -d -p 8080:8080 g2rain-cms-app
```

## 7. 生成代码
```bash
npm run build:generate -- --tables=dict
```
可选：`--no-view` `--no-api` `--no-mock` `--no-route`

## 8. 生成配置
```bash
npm run build:config
```
输出：`src/shared/config-util/config/`

## 9. 文档
- 架构：`ARCHITECHTURE.md`
- 代码生成器：`src/shared/generator/README.md`
- 配置生成器：`src/shared/config-util/README.md`

# g2rain-cms-app

模板项目超短 onboarding（<100 行）。

## 1. 环境
- Node.js >= 18
- npm >= 9

## 2. 安装
```bash
npm install
```

## 3. `.env` 最小配置
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

## 4. 启动
```bash
npm run dev
```

## 5. 构建与预览
```bash
npm run build
npm run preview
```

## 6. Docker
```bash
docker build -t g2rain-cms-app .
docker run -d -p 8080:8080 g2rain-cms-app
```

## 7. 生成代码
```bash
npm run build:generate -- --tables=dict
```
可选：`--no-view` `--no-api` `--no-mock` `--no-route`

## 8. 生成配置
```bash
npm run build:config
```
输出：`src/shared/config-util/config/`

## 9. 文档
- 架构：`ARCHITECHTURE.md`
- 代码生成器：`src/shared/generator/README.md`
- 配置生成器：`src/shared/config-util/README.md`

