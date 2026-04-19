/**
 * web_site相关 Mock 数据
 */

import type { AxiosRequestConfig } from 'axios';
import type { MockDataMap } from '@/components/http/mock-data';
import type { Result } from '@/components/http/types';
import Mock from 'mockjs';
import { mockManager } from '@/components/http/mock-data';

/**
 * 生成符合 Result 格式的响应
 */
function createResult<T>(data: T, status: number = 200): Result<T> {
  // 先使用 Mock.mock 生成元数据，然后直接设置 data，避免 data 被 mock 处理
  const result = Mock.mock({
    requestId: '@guid',
    requestTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    status,
    errorCode: status === 200 ? '' : '@word(5,10)',
    errorMessage: status === 200 ? '' : '@cword(5,15)',
  }) as Result<T>;
  
  // 直接设置 data，不经过 Mock.mock 处理
  result.data = data;
  
  return result;
}

/**
 * 生成符合 WebSite 类型的 Mock 数据模板
 */
function getWebSiteTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'organId': '@integer(1, 100)',
            'siteName|1': ['@word(3,10)', '@word(3,10)'],
            'siteCode|1': ['@word(3,10)', '@word(3,10)'],
            'domain|1': ['@word(3,10)', null],
            'description|1': ['@word(3,10)', null],
            'status|1': ['@word(3,10)', '@word(3,10)'],
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * web_site相关的 Mock 数据映射
 */
export const WebSiteMockDataMap: MockDataMap = {
  // GET /web_site - 根据条件查询列表
  '/cms/web_site': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const siteName = query?.siteName;
    const siteCode = query?.siteCode;
    const domain = query?.domain;
    const description = query?.description;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getWebSiteTemplate({
          id: i + 1,
        }),
      );
      list.push(item);
    }

    let filteredList = list;
    if (organId) {
      filteredList = filteredList.filter((item: any) => {
                return item.organId === organId;
              });
    }
    if (siteName) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteName && item.siteName.includes(siteName);
              });
    }
    if (siteCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteCode && item.siteCode.includes(siteCode);
              });
    }
    if (domain) {
      filteredList = filteredList.filter((item: any) => {
                return item.domain && item.domain.includes(domain);
              });
    }
    if (description) {
      filteredList = filteredList.filter((item: any) => {
                return item.description && item.description.includes(description);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/web_site/list - 根据条件查询列表（兼容接口）
  '/cms/web_site/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const siteName = query?.siteName;
    const siteCode = query?.siteCode;
    const domain = query?.domain;
    const description = query?.description;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getWebSiteTemplate({
          id: i + 1,
        }),
      );
      list.push(item);
    }

    let filteredList = list;
    if (organId) {
      filteredList = filteredList.filter((item: any) => {
                return item.organId === organId;
              });
    }
    if (siteName) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteName && item.siteName.includes(siteName);
              });
    }
    if (siteCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteCode && item.siteCode.includes(siteCode);
              });
    }
    if (domain) {
      filteredList = filteredList.filter((item: any) => {
                return item.domain && item.domain.includes(domain);
              });
    }
    if (description) {
      filteredList = filteredList.filter((item: any) => {
                return item.description && item.description.includes(description);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/web_site/page - 根据条件分页查询
  '/cms/web_site/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const organId = query?.query?.organId || query?.organId;
    const siteName = query?.query?.siteName || query?.siteName;
    const siteCode = query?.query?.siteCode || query?.siteCode;
    const domain = query?.query?.domain || query?.domain;
    const description = query?.query?.description || query?.description;
    const status = query?.query?.status || query?.status;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getWebSiteTemplate()],
    };

    const result = Mock.mock(template);

    // 计算总页数
    const totalPages = Math.ceil(total / pageSize);

    const pageData = {
      pageNum,
      pageSize,
      total,
      totalPages,
      records: result.records,
    };

    return createResult(pageData);
  },

  // POST /cms/web_site/save - 保存（新增或更新）
  '/cms/web_site/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的web_site数据
    const WebSiteItem = Mock.mock(
      getWebSiteTemplate({
        id,
        organId: payload.organId !== undefined ? payload.organId : '@integer(1, 100)',
        siteName: payload.siteName !== undefined ? payload.siteName : '@word(3,10)',
        siteCode: payload.siteCode !== undefined ? payload.siteCode : '@word(3,10)',
        domain: payload.domain !== undefined ? payload.domain : null,
        description: payload.description !== undefined ? payload.description : null,
        status: payload.status !== undefined ? payload.status : '@word(3,10)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(WebSiteItem);
  },

  // DELETE /cms/web_site/:id - 删除
  '/cms/web_site/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(WebSiteMockDataMap);

