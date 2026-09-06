/**
 * Mock 模式下的本地认证引导（独立运行 + VITE_MOCK_ENABLED）
 * 跳过真实 SSO，直接使用 mock token，便于本地开发调试动态路由与业务页。
 */

import { fetchIamKeyId, fetchIamPublicKey, getHttpClient } from '@/components/http';
import { IAM_KEY_ID, IAM_PUBLIC_KEY, MOCK_ACCESS_TOKEN } from '@/components/http/mock-data/data/auth.data';
import { useAccessTokenStore } from '@platform/stores';
import { isMockEnabled } from '@shared/env';
import { isAloneMode } from '@shared/utils/mode.util';
import { generateClient } from '@shared/utils/jwt.util';

/**
 * 独立 + Mock 模式下，若尚未登录则注入 mock client / token。
 * 真实集成环境或生产环境不执行。
 */
export async function ensureMockAuthSession(): Promise<void> {
  if (!isAloneMode() || !isMockEnabled()) {
    return;
  }

  const store = useAccessTokenStore();
  if (store.isLogin) {
    return;
  }

  if ((import.meta.env as any).DEV) {
    console.log('[mock-auth] 独立 Mock 模式：注入本地 mock 会话');
  }

  if (!store.client) {
    store.client = await generateClient();
  }

  const http = getHttpClient('auth');
  const iamKeyId = await fetchIamKeyId(http);
  const publicKey = await fetchIamPublicKey(http);

  await store.setTokens(MOCK_ACCESS_TOKEN, IAM_KEY_ID, iamKeyId, publicKey);
}
