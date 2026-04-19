/**
 * channel相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * channel接口
 */
export interface Channel extends BaseVo {
  organId: number;
  spaceId: number;
  siteId: number;
  parentId: number;
  channelName: string;
  channelCode: string | null;
  channelType: string;
  path: string | null;
  categoryId: number | null;
  pageId: number | null;
  linkUrl: string | null;
  sortOrder: number;
  visible: number;
  status: string;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface ChannelPayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  spaceId?: number;
  siteId?: number;
  parentId?: number;
  channelName?: string;
  channelCode?: string | null;
  channelType?: string;
  path?: string | null;
  categoryId?: number | null;
  pageId?: number | null;
  linkUrl?: string | null;
  sortOrder?: number;
  visible?: number;
  status?: string;
}

/**
 * channel查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface ChannelQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  spaceId?: number;
  siteId?: number;
  parentId?: number;
  channelName?: string;
  channelCode?: string | null;
  channelType?: string;
  path?: string | null;
  categoryId?: number | null;
  pageId?: number | null;
  linkUrl?: string | null;
  sortOrder?: number;
  visible?: number;
  status?: string;
}

