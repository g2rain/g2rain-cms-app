# 代码约定

- 使用 TypeScript 与 Vue `<script setup lang="ts">`，领域 DTO 放在对应 `views/<domain>/type.ts`。
- 页面只通过对应 `api.ts` 调用后端；统一使用项目 HTTP Client，不在页面重复实现认证、签名或错误解析。
- 路由组件必须登记在 `src/views/route-map.ts`，路径需与 Basis 下发的 `linkPath` 一致。
- 文案优先使用 i18n key，并提供合理默认文本。
- 页面操作使用统一权限指令/组件；但前端权限不可替代服务端授权。
- 复用能力先判断归属：通用无状态工具放 shared，UI 原语放 components，平台语义放 platform，启动编排放 runtime。
- 新代码遵守目标依赖方向，不复制当前已登记反向依赖。
- 不提交调试日志、构建产物、生成配置、密钥或真实认证数据。

历史文件存在不同格式和注释风格。修改时保持范围最小，不进行无关全库格式化。

