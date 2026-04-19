/**
 * space相关 Mock 数据
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
 * 生成符合 Space 类型的 Mock 数据模板
 */
function getSpaceTemplate(overrides: Partial<any> = {}): any {
  return {
    'id|+1': 1,
        'organId': '@integer(1, 100)',
            'spaceName|1': ['@word(3,10)', '@word(3,10)'],
            'spaceCode|1': ['@word(3,10)', '@word(3,10)'],
            'spaceType|1': ['@word(3,10)', '@word(3,10)'],
            'status|1': ['@word(3,10)', '@word(3,10)'],
        version: '@integer(1, 100)',
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ...overrides,
  };
}

/**
 * space相关的 Mock 数据映射
 */
export const SpaceMockDataMap: MockDataMap = {
  // GET /space - 根据条件查询列表
  '/cms/space': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceName = query?.spaceName;
    const spaceCode = query?.spaceCode;
    const spaceType = query?.spaceType;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getSpaceTemplate({
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
    if (spaceName) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceName && item.spaceName.includes(spaceName);
              });
    }
    if (spaceCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceCode && item.spaceCode.includes(spaceCode);
              });
    }
    if (spaceType) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceType && item.spaceType.includes(spaceType);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/space/list - 根据条件查询列表（兼容接口）
  '/cms/space/list': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const organId = query?.organId;
    const spaceName = query?.spaceName;
    const spaceCode = query?.spaceCode;
    const spaceType = query?.spaceType;
    const status = query?.status;

    const count = 15;

    const list: any[] = [];
    for (let i = 0; i < count; i++) {
      const item = Mock.mock(
        getSpaceTemplate({
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
    if (spaceName) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceName && item.spaceName.includes(spaceName);
              });
    }
    if (spaceCode) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceCode && item.spaceCode.includes(spaceCode);
              });
    }
    if (spaceType) {
      filteredList = filteredList.filter((item: any) => {
                return item.spaceType && item.spaceType.includes(spaceType);
              });
    }
    if (status) {
      filteredList = filteredList.filter((item: any) => {
                return item.status && item.status.includes(status);
              });
    }

    return createResult(filteredList);
  },

  // GET /cms/space/page - 根据条件分页查询
  '/cms/space/page': (config: AxiosRequestConfig) => {
    const query = config.params || {};
    const pageNum = parseInt(query?.pageNum || query?.page || '1', 10);
    const pageSize = parseInt(query?.pageSize || query?.size || '10', 10);
    const organId = query?.query?.organId || query?.organId;
    const spaceName = query?.query?.spaceName || query?.spaceName;
    const spaceCode = query?.query?.spaceCode || query?.spaceCode;
    const spaceType = query?.query?.spaceType || query?.spaceType;
    const status = query?.query?.status || query?.status;

    const total = 50;
    const count = Math.min(pageSize, total - (pageNum - 1) * pageSize);
    const template: any = {
      [`records|${count}`]: [getSpaceTemplate()],
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

  // POST /cms/space/save - 保存（新增或更新）
  '/cms/space/save': (config: AxiosRequestConfig) => {
    const payload = config.data || {};
    const isUpdate = payload.id !== undefined && payload.id !== null;
    
    // 如果是更新，使用传入的 id；如果是新增，生成新 id
    const id = isUpdate ? payload.id : Mock.Random.integer(1000, 9999);
    
    // 生成完整的space数据
    const SpaceItem = Mock.mock(
      getSpaceTemplate({
        id,
        organId: payload.organId !== undefined ? payload.organId : '@integer(1, 100)',
        spaceName: payload.spaceName !== undefined ? payload.spaceName : '@word(3,10)',
        spaceCode: payload.spaceCode !== undefined ? payload.spaceCode : '@word(3,10)',
        spaceType: payload.spaceType !== undefined ? payload.spaceType : '@word(3,10)',
        status: payload.status !== undefined ? payload.status : '@word(3,10)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createTime: isUpdate ? '@datetime("yyyy-MM-dd HH:mm:ss")' : '@datetime("yyyy-MM-dd HH:mm:ss")',
      }),
    );
    
    return createResult(SpaceItem);
  },

  // DELETE /cms/space/:id - 删除
  '/cms/space/:id': (config: AxiosRequestConfig) => {
    const deletedRows = 1;
    return createResult(deletedRows);
  },
};

// 模块加载时自动注册到 mockManager
mockManager.registerAll(SpaceMockDataMap);

