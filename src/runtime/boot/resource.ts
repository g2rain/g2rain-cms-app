/**
 * 应用资源管理
 * 负责加载和管理应用资源（页面、页面元素、API端点）
 */

import type {
  ApplicationResources,
  ResourcePage,
  ResourcePageElement,
  ResourceApiEndpoint,
} from './types';
import { getHttpClient } from '@/components/http';

import { env } from '@shared/env';
import { ApiPermission, PageElementPermission, type ApiPermissionProvider, type PageElementPermissionProvider } from '@/components/permission';
import type { PageElementStatus } from '@/components/permission';

/**
 * 资源接口路径
 */
export const RESOURCES_API_PATH = '/basis/authority/resources';

/**
 * 资源管理器
 */
class ResourceManager {
  private resources: ApplicationResources | null = null;
  private initialized: boolean = false;

  /**
   * 初始化资源（从后端加载）
   */
  async init(): Promise<void> {
    await this.loadResources();
    this.initialized = true;
  }

  /**
   * 加载资源数据
   */
  private async loadResources(): Promise<void> {
    if (!env.VITE_APPLICATION_CODE) {
      throw new Error('应用编码未设置，请检查环境变量 VITE_APPLICATION_CODE');
    }

    try {
      // 通过单个接口加载所有资源
      const http = getHttpClient('default');
      // DEV 临时措施：强制资源接口走本地 mock（与 http 拦截器约定 header 一致）
      // 注意：这里不读取任何 mock 相关 env 开关，仅判断是否为开发模式
      const response = await http.get<ApplicationResources>(
        RESOURCES_API_PATH,
        undefined,
        import.meta.env.DEV
          ? {
              headers: {
                'x-g2rain-mock': 'true',
              },
            }
          : undefined,
      );

      this.resources = {
        pages: response.data?.pages || [],
        pageElements: response.data?.pageElements || [],
        apiEndpoints: response.data?.apiEndpoints || [],
      };

      console.log('[ResourceManager] 资源加载完成:', {
        applicationCode: env.VITE_APPLICATION_CODE,
        pages: this.resources.pages.length,
        pageElements: this.resources.pageElements.length,
        apiEndpoints: this.resources.apiEndpoints.length,
      });

      if (import.meta.env.DEV) {
        const body = response as unknown as Record<string, unknown>;
        const inner = body?.data as Record<string, unknown> | undefined;
        console.log('[ResourceManager][DEV] Result 结构自检', {
          topLevelKeys: body ? Object.keys(body) : [],
          dataKeys: inner && typeof inner === 'object' ? Object.keys(inner) : [],
          linkPaths: this.resources.pages.map((p) => p.linkPath),
        });
        if (this.resources.pages.length === 0) {
          console.warn(
            '[ResourceManager][DEV] pages 为空：动态路由不会注册。若使用 Mock，请确认 /basis/authority/resources 命中且 data.pages 非空；并确认 Result 未多包一层。',
          );
        }
      }
    } catch (error) {
      console.error('[ResourceManager] 资源加载失败:', error);
      throw error;
    }
  }

  /**
   * 获取所有页面资源
   */
  getPages(): ResourcePage[] {
    return this.resources?.pages || [];
  }

  /**
   * 根据页面编码获取页面资源
   */
  getPageByCode(pageCode: string): ResourcePage | undefined {
    return this.resources?.pages.find(p => p.pageCode === pageCode);
  }

  /**
   * 根据路径获取页面资源
   */
  getPageByPath(linkPath: string): ResourcePage | undefined {
    return this.resources?.pages.find(p => p.linkPath === linkPath);
  }

  /**
   * 获取指定页面的所有元素
   */
  getPageElements(pageCode: string): ResourcePageElement[] {
    return (
      this.resources?.pageElements.filter(e => e.pageCode === pageCode) || []
    );
  }

  /**
   * 根据元素编码获取页面元素
   */
  getPageElementByCode(elementCode: string): ResourcePageElement | undefined {
    return this.resources?.pageElements.find(e => e.pageElementCode === elementCode);
  }

  /**
   * 检查页面元素权限
   * @param elementCode 元素编码
   * @returns 是否有权限（元素存在）
   */
  hasPageElementPermission(elementCode: string): boolean {
    const element = this.getPageElementByCode(elementCode);
    return element !== undefined;
  }

  /**
   * 获取页面元素状态
   * @param elementCode 元素编码
   * @returns 元素状态：'visible' | 'enabled' | undefined（不存在）
   */
  getPageElementStatus(elementCode: string): PageElementStatus | undefined {
    const element = this.getPageElementByCode(elementCode);
    return element?.status;
  }

  /**
   * 获取所有API端点资源
   */
  getApiEndpoints(): ResourceApiEndpoint[] {
    return this.resources?.apiEndpoints || [];
  }

  /**
   * 检查API调用权限
   * @param apiUrl API路径
   * @param requestMethod 请求方法
   * @returns 是否有权限
   */
  hasApiPermission(apiUrl: string, requestMethod: string): boolean {
    return true;
  }

  /**
   * 刷新资源（重新加载）
   */
  async refresh(): Promise<void> {
    if (this.initialized) {
      await this.loadResources();
    }
  }

  /**
   * 获取所有资源
   */
  getResources(): ApplicationResources | null {
    return this.resources;
  }
}

// 导出单例实例
export const resourceManager = new ResourceManager();

// 将 ResourceManager 作为 permission 数据提供者注册（platform -> components 合法依赖）
const pageElementProvider: PageElementPermissionProvider = {
  hasPageElementPermission: (elementCode: string) =>
    resourceManager.hasPageElementPermission(elementCode),
  getPageElementStatus: (elementCode: string) =>
    resourceManager.getPageElementStatus(elementCode),
};
PageElementPermission.registerProvider(pageElementProvider);

const apiProvider: ApiPermissionProvider = {
  hasApiPermission: (apiUrl: string, requestMethod: string) =>
    resourceManager.hasApiPermission(apiUrl, requestMethod),
};
ApiPermission.registerProvider(apiProvider);

