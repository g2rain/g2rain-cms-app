/**
 * article_category相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * article_category接口
 */
export interface ArticleCategory extends BaseVo {
  organId: number;
  spaceId: number;
  categoryName: string;
  categoryCode: string | null;
  status: string;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface ArticleCategoryPayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  spaceId?: number;
  categoryName?: string;
  categoryCode?: string | null;
  status?: string;
}

/**
 * article_category查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface ArticleCategoryQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  spaceId?: number;
  categoryName?: string;
  categoryCode?: string | null;
  status?: string;
}

