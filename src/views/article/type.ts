/**
 * article相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * article接口
 */
export interface Article extends BaseVo {
  organId: number;
  spaceId: number;
  categoryId: number;
  sourceApplicationId: number | null;
  sourceTraceId: string | null;
  title: string;
  summary: string | null;
  cover: string | null;
  contentType: string;
  content: string;
  author: string | null;
  status: string;
  publishTime: string | null;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface ArticlePayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  spaceId?: number;
  categoryId?: number;
  sourceApplicationId?: number | null;
  sourceTraceId?: string | null;
  title?: string;
  summary?: string | null;
  cover?: string | null;
  contentType?: string;
  content?: string;
  author?: string | null;
  status?: string;
  publishTime?: string | null;
}

/**
 * article查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface ArticleQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  spaceId?: number;
  categoryId?: number;
  sourceApplicationId?: number | null;
  sourceTraceId?: string | null;
  title?: string;
  summary?: string | null;
  cover?: string | null;
  contentType?: string;
  author?: string | null;
  status?: string;
  publishTime?: string | null;
}

