/**
 * channel相关 Mock 数据
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
 * 生成符合 Channel 类型的 Mock 数据模板
 */
function getChannelTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'organId': '@integer(1, 100)',
            'spaceId': '@integer(1, 100)',
            'siteId': '@integer(1, 100)',
            'parentId': '@integer(1, 100)',
            'channelName|1': ['@word(3,10)', '@word(3,10)'],
            'channelCode|1': ['@word(3,10)', null],
            'channelType|1': ['@word(3,10)', '@word(3,10)'],
            'path|1': ['@word(3,10)', null],
            'categoryId|1': ['@integer(1, 100)', null],
            'pageId|1': ['@integer(1, 100)', null],
            'linkUrl|1': ['@url', null],
            'sortOrder': '@integer(1, 100)',
            'visible': '@integer(1, 100)',
            'status|1': ['@word(3,10)', '@word(3,10)'],
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * channel相关的 Mock 数据映射
 */
export const ChannelMockDataMap: MockDataMap = {
  // GET /channel - 根据条件查询列表
  '/cms/channel': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const siteId = query?.siteId;
    const parentId = query?.parentId;
    const channelName = query?.channelName;
    const channelCode = query?.channelCode;
    const channelType = query?.channelType;
    const path = query?.path;
    const categoryId = query?.categoryId;
    const pageId = query?.pageId;
    const linkUrl = query?.linkUrl;
    const sortOrder = query?.sortOrder;
    const visible = query?.visible;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getChannelTemplate({
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
    if (siteId) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteId === siteId;
              });
    }
    if (parentId) {
      filteredList = filteredList.filter((item: any) => {
                return item.parentId === parentId;
              });
    }
    if (channelName) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelName && item.channelName.includes(channelName);
              });
    }
    if (channelCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelCode && item.channelCode.includes(channelCode);
              });
    }
    if (channelType) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelType && item.channelType.includes(channelType);
              });
    }
    if (path) {
      filteredList = filteredList.filter((item: any) => {
                return item.path && item.path.includes(path);
              });
    }
    if (categoryId) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryId === categoryId;
              });
    }
    if (pageId) {
      filteredList = filteredList.filter((item: any) => {
                return item.pageId === pageId;
              });
    }
    if (linkUrl) {
      filteredList = filteredList.filter((item: any) => {
                return item.linkUrl && item.linkUrl.includes(linkUrl);
              });
    }
    if (sortOrder) {
      filteredList = filteredList.filter((item: any) => {
                return item.sortOrder === sortOrder;
              });
    }
    if (visible) {
      filteredList = filteredList.filter((item: any) => {
                return item.visible === visible;
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/channel/list - 根据条件查询列表（兼容接口）
  '/cms/channel/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceId = query?.spaceId;
    const siteId = query?.siteId;
    const parentId = query?.parentId;
    const channelName = query?.channelName;
    const channelCode = query?.channelCode;
    const channelType = query?.channelType;
    const path = query?.path;
    const categoryId = query?.categoryId;
    const pageId = query?.pageId;
    const linkUrl = query?.linkUrl;
    const sortOrder = query?.sortOrder;
    const visible = query?.visible;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getChannelTemplate({
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
    if (siteId) {
      filteredList = filteredList.filter((item: any) => {
                return item.siteId === siteId;
              });
    }
    if (parentId) {
      filteredList = filteredList.filter((item: any) => {
                return item.parentId === parentId;
              });
    }
    if (channelName) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelName && item.channelName.includes(channelName);
              });
    }
    if (channelCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelCode && item.channelCode.includes(channelCode);
              });
    }
    if (channelType) {
      filteredList = filteredList.filter((item: any) => {
                return item.channelType && item.channelType.includes(channelType);
              });
    }
    if (path) {
      filteredList = filteredList.filter((item: any) => {
                return item.path && item.path.includes(path);
              });
    }
    if (categoryId) {
      filteredList = filteredList.filter((item: any) => {
                return item.categoryId === categoryId;
              });
    }
    if (pageId) {
      filteredList = filteredList.filter((item: any) => {
                return item.pageId === pageId;
              });
    }
    if (linkUrl) {
      filteredList = filteredList.filter((item: any) => {
                return item.linkUrl && item.linkUrl.includes(linkUrl);
              });
    }
    if (sortOrder) {
      filteredList = filteredList.filter((item: any) => {
                return item.sortOrder === sortOrder;
              });
    }
    if (visible) {
      filteredList = filteredList.filter((item: any) => {
                return item.visible === visible;
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/channel/page - 根据条件分页查询
  '/cms/channel/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const organId = query?.query?.organId || query?.organId;
    const spaceId = query?.query?.spaceId || query?.spaceId;
    const siteId = query?.query?.siteId || query?.siteId;
    const parentId = query?.query?.parentId || query?.parentId;
    const channelName = query?.query?.channelName || query?.channelName;
    const channelCode = query?.query?.channelCode || query?.channelCode;
    const channelType = query?.query?.channelType || query?.channelType;
    const path = query?.query?.path || query?.path;
    const categoryId = query?.query?.categoryId || query?.categoryId;
    const pageId = query?.query?.pageId || query?.pageId;
    const linkUrl = query?.query?.linkUrl || query?.linkUrl;
    const sortOrder = query?.query?.sortOrder || query?.sortOrder;
    const visible = query?.query?.visible || query?.visible;
    const status = query?.query?.status || query?.status;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getChannelTemplate()],
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

  // POST /cms/channel/save - 保存（新增或更新）
  '/cms/channel/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的channel数据
    const ChannelItem = Mock.mock(
      getChannelTemplate({
        id,
        organId: payload.organId !== undefined ? payload.organId : '@integer(1, 100)',
        spaceId: payload.spaceId !== undefined ? payload.spaceId : '@integer(1, 100)',
        siteId: payload.siteId !== undefined ? payload.siteId : '@integer(1, 100)',
        parentId: payload.parentId !== undefined ? payload.parentId : '@integer(1, 100)',
        channelName: payload.channelName !== undefined ? payload.channelName : '@word(3,10)',
        channelCode: payload.channelCode !== undefined ? payload.channelCode : null,
        channelType: payload.channelType !== undefined ? payload.channelType : '@word(3,10)',
        path: payload.path !== undefined ? payload.path : null,
        categoryId: payload.categoryId !== undefined ? payload.categoryId : null,
        pageId: payload.pageId !== undefined ? payload.pageId : null,
        linkUrl: payload.linkUrl !== undefined ? payload.linkUrl : null,
        sortOrder: payload.sortOrder !== undefined ? payload.sortOrder : '@integer(1, 100)',
        visible: payload.visible !== undefined ? payload.visible : '@integer(1, 100)',
        status: payload.status !== undefined ? payload.status : '@word(3,10)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(ChannelItem);
  },

  // DELETE /cms/channel/:id - 删除
  '/cms/channel/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(ChannelMockDataMap);

