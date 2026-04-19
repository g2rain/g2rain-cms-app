/**
 * article_tag_relation相关 Mock 数据
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
 * 生成符合 ArticleTagRelation 类型的 Mock 数据模板
 */
function getArticleTagRelationTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'articleId': '@integer(1, 100)',
            'tagId': '@integer(1, 100)',
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * article_tag_relation相关的 Mock 数据映射
 */
export const ArticleTagRelationMockDataMap: MockDataMap = {
  // GET /article_tag_relation - 根据条件查询列表
  '/cms/article_tag_relation': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const articleId = query?.articleId;
    const tagId = query?.tagId;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleTagRelationTemplate({
          id: i + 1,
        }),
      );
      list.push(item);
    }

    let filteredList = list;
    if (articleId) {
      filteredList = filteredList.filter((item: any) => {
                return item.articleId === articleId;
              });
    }
    if (tagId) {
      filteredList = filteredList.filter((item: any) => {
                return item.tagId === tagId;
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article_tag_relation/list - 根据条件查询列表（兼容接口）
  '/cms/article_tag_relation/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const articleId = query?.articleId;
    const tagId = query?.tagId;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleTagRelationTemplate({
          id: i + 1,
        }),
      );
      list.push(item);
    }

    let filteredList = list;
    if (articleId) {
      filteredList = filteredList.filter((item: any) => {
                return item.articleId === articleId;
              });
    }
    if (tagId) {
      filteredList = filteredList.filter((item: any) => {
                return item.tagId === tagId;
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article_tag_relation/page - 根据条件分页查询
  '/cms/article_tag_relation/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const articleId = query?.query?.articleId || query?.articleId;
    const tagId = query?.query?.tagId || query?.tagId;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getArticleTagRelationTemplate()],
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

  // POST /cms/article_tag_relation/save - 保存（新增或更新）
  '/cms/article_tag_relation/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的article_tag_relation数据
    const ArticleTagRelationItem = Mock.mock(
      getArticleTagRelationTemplate({
        id,
        articleId: payload.articleId !== undefined ? payload.articleId : '@integer(1, 100)',
        tagId: payload.tagId !== undefined ? payload.tagId : '@integer(1, 100)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(ArticleTagRelationItem);
  },

  // DELETE /cms/article_tag_relation/:id - 删除
  '/cms/article_tag_relation/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(ArticleTagRelationMockDataMap);

