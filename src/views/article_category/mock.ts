/**
 * article_category相关 Mock 数据
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
 * 生成符合 ArticleCategory 类型的 Mock 数据模板
 */
function getArticleCategoryTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'organId': '@integer(1, 100)',
            'spaceId': '@integer(1, 100)',
            'categoryName|1': ['@word(3,10)', '@word(3,10)'],
            'categoryCode|1': ['@word(3,10)', null],
            'status|1': ['@word(3,10)', '@word(3,10)'],
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * article_category相关的 Mock 数据映射
 */
export const ArticleCategoryMockDataMap: MockDataMap = {
  // GET /article_category - 根据条件查询列表
  '/cms/article_category': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const categoryName = query?.categoryName;
    const categoryCode = query?.categoryCode;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleCategoryTemplate({
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
    if (spaceId) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceId === spaceId;
              });
    }
    if (categoryName) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryName && item.categoryName.includes(categoryName);
              });
    }
    if (categoryCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryCode && item.categoryCode.includes(categoryCode);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article_category/list - 根据条件查询列表（兼容接口）
  '/cms/article_category/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const categoryName = query?.categoryName;
    const categoryCode = query?.categoryCode;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleCategoryTemplate({
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
    if (spaceId) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceId === spaceId;
              });
    }
    if (categoryName) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryName && item.categoryName.includes(categoryName);
              });
    }
    if (categoryCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryCode && item.categoryCode.includes(categoryCode);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article_category/page - 根据条件分页查询
  '/cms/article_category/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const organId = query?.query?.organId || query?.organId;
    const spaceId = query?.query?.spaceId || query?.spaceId;
    const categoryName = query?.query?.categoryName || query?.categoryName;
    const categoryCode = query?.query?.categoryCode || query?.categoryCode;
    const status = query?.query?.status || query?.status;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getArticleCategoryTemplate()],
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

  // POST /cms/article_category/save - 保存（新增或更新）
  '/cms/article_category/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的article_category数据
    const ArticleCategoryItem = Mock.mock(
      getArticleCategoryTemplate({
        id,
        organId: payload.organId !== undefined ? payload.organId : '@integer(1, 100)',
        spaceId: payload.spaceId !== undefined ? payload.spaceId : '@integer(1, 100)',
        categoryName: payload.categoryName !== undefined ? payload.categoryName : '@word(3,10)',
        categoryCode: payload.categoryCode !== undefined ? payload.categoryCode : null,
        status: payload.status !== undefined ? payload.status : '@word(3,10)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(ArticleCategoryItem);
  },

  // DELETE /cms/article_category/:id - 删除
  '/cms/article_category/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(ArticleCategoryMockDataMap);

