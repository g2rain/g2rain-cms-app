/**
 * space相关类型定义
 */

import type { BaseSelectListDto, BaseVo } from '@platform/types/api.type';

/**
 * space接口
 */
export interface Space extends BaseVo {
  organId: number;
  spaceName: string;
  spaceCode: string;
  spaceType: string;
  status: string;
}

/**
 * 用于创建 / 更新时提交的负载（不包含审计字段）
 */
export interface SpacePayload {
  id?: number; // 更新时传入 ID，新增时不传
  organId?: number;
  spaceName?: string;
  spaceCode?: string;
  spaceType?: string;
  status?: string;
}

/**
 * space查询条件
 * 用于分页查询时的业务查询参数
 * 包含业务查询字段和基础查询字段（BaseSelectListDto）
 */
export interface SpaceQuery extends BaseSelectListDto {
  // 业务查询字段
  organId?: number;
  spaceName?: string;
  spaceCode?: string;
  spaceType?: string;
  status?: string;
}

