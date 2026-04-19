/**
 * page相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * page接口
 */
export interface Page extends BaseVo {
  organId: number;
  spaceId: number;
  pageName: string;
  pageCode: string | null;
  path: string | null;
  content: string;
  status: string;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface PagePayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  spaceId?: number;
  pageName?: string;
  pageCode?: string | null;
  path?: string | null;
  content?: string;
  status?: string;
}

/**
 * page查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface PageQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  spaceId?: number;
  pageName?: string;
  pageCode?: string | null;
  path?: string | null;
  content?: string;
  status?: string;
}

