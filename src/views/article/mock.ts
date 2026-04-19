/**
 * article相关 Mock 数据
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
 * 生成符合 Article 类型的 Mock 数据模板
 */
function getArticleTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'organId': '@integer(1, 100)',
            'spaceId': '@integer(1, 100)',
            'categoryId': '@integer(1, 100)',
            'sourceApplicationId': '@integer(1, 100)',
            'sourceTraceId|1': ['@word(3,10)', null],
            'title|1': ['@word(3,10)', '@word(3,10)'],
            'summary|1': ['@word(3,10)', null],
            'cover|1': ['@word(3,10)', null],
            'contentType|1': ['@word(3,10)', '@word(3,10)'],
            'content|1': ['@word(3,10)', '@word(3,10)'],
            'author|1': ['@word(3,10)', null],
            'status|1': ['@word(3,10)', '@word(3,10)'],
            'publishTime|1': ['@word(3,10)', null],
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * article相关的 Mock 数据映射
 */
export const ArticleMockDataMap: MockDataMap = {
  // GET /article - 根据条件查询列表
  '/cms/article': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const categoryId = query?.categoryId;
    const sourceApplicationId = query?.sourceApplicationId;
    const sourceTraceId = query?.sourceTraceId;
    const title = query?.title;
    const summary = query?.summary;
    const cover = query?.cover;
    const contentType = query?.contentType;
    const content = query?.content;
    const author = query?.author;
    const status = query?.status;
    const publishTime = query?.publishTime;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleTemplate({
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
    if (categoryId) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryId === categoryId;
              });
    }
    if (sourceApplicationId) {
      filteredList = filteredList.filter((item: any) => {
                return item.sourceApplicationId === sourceApplicationId;
              });
    }
    if (sourceTraceId) {
      filteredList = filteredList.filter((item: any) => {
                return item.sourceTraceId && item.sourceTraceId.includes(sourceTraceId);
              });
    }
    if (title) {
      filteredList = filteredList.filter((item: any) => {
                return item.title && item.title.includes(title);
              });
    }
    if (summary) {
      filteredList = filteredList.filter((item: any) => {
                return item.summary && item.summary.includes(summary);
              });
    }
    if (cover) {
      filteredList = filteredList.filter((item: any) => {
                return item.cover && item.cover.includes(cover);
              });
    }
    if (contentType) {
      filteredList = filteredList.filter((item: any) => {
                return item.contentType && item.contentType.includes(contentType);
              });
    }
    if (content) {
      filteredList = filteredList.filter((item: any) => {
                return item.content && item.content.includes(content);
              });
    }
    if (author) {
      filteredList = filteredList.filter((item: any) => {
                return item.author && item.author.includes(author);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }
    if (publishTime) {
      filteredList = filteredList.filter((item: any) => {
                return item.publishTime && item.publishTime.includes(publishTime);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article/list - 根据条件查询列表（兼容接口）
  '/cms/article/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const categoryId = query?.categoryId;
    const sourceApplicationId = query?.sourceApplicationId;
    const sourceTraceId = query?.sourceTraceId;
    const title = query?.title;
    const summary = query?.summary;
    const cover = query?.cover;
    const contentType = query?.contentType;
    const content = query?.content;
    const author = query?.author;
    const status = query?.status;
    const publishTime = query?.publishTime;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getArticleTemplate({
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
    if (categoryId) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryId === categoryId;
              });
    }
    if (sourceApplicationId) {
      filteredList = filteredList.filter((item: any) => {
                return item.sourceApplicationId === sourceApplicationId;
              });
    }
    if (sourceTraceId) {
      filteredList = filteredList.filter((item: any) => {
                return item.sourceTraceId && item.sourceTraceId.includes(sourceTraceId);
              });
    }
    if (title) {
      filteredList = filteredList.filter((item: any) => {
                return item.title && item.title.includes(title);
              });
    }
    if (summary) {
      filteredList = filteredList.filter((item: any) => {
                return item.summary && item.summary.includes(summary);
              });
    }
    if (cover) {
      filteredList = filteredList.filter((item: any) => {
                return item.cover && item.cover.includes(cover);
              });
    }
    if (contentType) {
      filteredList = filteredList.filter((item: any) => {
                return item.contentType && item.contentType.includes(contentType);
              });
    }
    if (content) {
      filteredList = filteredList.filter((item: any) => {
                return item.content && item.content.includes(content);
              });
    }
    if (author) {
      filteredList = filteredList.filter((item: any) => {
                return item.author && item.author.includes(author);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }
    if (publishTime) {
      filteredList = filteredList.filter((item: any) => {
                return item.publishTime && item.publishTime.includes(publishTime);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/article/page - 根据条件分页查询
  '/cms/article/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const organId = query?.query?.organId || query?.organId;
    const spaceId = query?.query?.spaceId || query?.spaceId;
    const categoryId = query?.query?.categoryId || query?.categoryId;
    const sourceApplicationId = query?.query?.sourceApplicationId || query?.sourceApplicationId;
    const sourceTraceId = query?.query?.sourceTraceId || query?.sourceTraceId;
    const title = query?.query?.title || query?.title;
    const summary = query?.query?.summary || query?.summary;
    const cover = query?.query?.cover || query?.cover;
    const contentType = query?.query?.contentType || query?.contentType;
    const content = query?.query?.content || query?.content;
    const author = query?.query?.author || query?.author;
    const status = query?.query?.status || query?.status;
    const publishTime = query?.query?.publishTime || query?.publishTime;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getArticleTemplate()],
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

  // POST /cms/article/save - 保存（新增或更新）
  '/cms/article/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的article数据
    const ArticleItem = Mock.mock(
      getArticleTemplate({
        id,
        organId: payload.organId !== undefined ? payload.organId : '@integer(1, 100)',
        spaceId: payload.spaceId !== undefined ? payload.spaceId : '@integer(1, 100)',
        categoryId: payload.categoryId !== undefined ? payload.categoryId : '@integer(1, 100)',
        sourceApplicationId: payload.sourceApplicationId !== undefined ? payload.sourceApplicationId : null,
        sourceTraceId: payload.sourceTraceId !== undefined ? payload.sourceTraceId : null,
        title: payload.title !== undefined ? payload.title : '@word(3,10)',
        summary: payload.summary !== undefined ? payload.summary : null,
        cover: payload.cover !== undefined ? payload.cover : null,
        contentType: payload.contentType !== undefined ? payload.contentType : '@word(3,10)',
        content: payload.content !== undefined ? payload.content : '@word(3,10)',
        author: payload.author !== undefined ? payload.author : null,
        status: payload.status !== undefined ? payload.status : '@word(3,10)',
        publishTime: payload.publishTime !== undefined ? payload.publishTime : null,
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(ArticleItem);
  },

  // POST /cms/article/batch_add_tags - 批量添加标签
  '/cms/article/batch_add_tags': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const articleId = payload?.articleId;
    const tagIds = Array.isArray(payload?.tagIds) ? payload.tagIds : [];
    const successCount = articleId ? tagIds.length : 0;
    return createResult({
      articleId,
      successCount,
    });
  },

  // DELETE /cms/article/:id - 删除
  '/cms/article/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(ArticleMockDataMap);

