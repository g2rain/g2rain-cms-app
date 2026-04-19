/**
 * web_site相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * web_site接口
 */
export interface WebSite extends BaseVo {
  organId: number;
  siteName: string;
  siteCode: string;
  domain: string | null;
  description: string | null;
  status: string;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface WebSitePayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  siteName?: string;
  siteCode?: string;
  domain?: string | null;
  description?: string | null;
  status?: string;
}

/**
 * web_site查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface WebSiteQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  siteName?: string;
  siteCode?: string;
  domain?: string | null;
  description?: string | null;
  status?: string;
}

