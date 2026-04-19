/**
 * article_tag_relation相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * article_tag_relation接口
 */
export interface ArticleTagRelation extends BaseVo {
  articleId: number;
  tagId: number;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface ArticleTagRelationPayload {
  id?: number; // 更新时传入 ID，新增时不传
  articleId?: number;
  tagId?: number;
}

/**
 * article_tag_relation查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface ArticleTagRelationQuery extends BaseSelectListDto {
  // 业务查询字段
  articleId?: number;
  tagId?: number;
}

