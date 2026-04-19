/**
 * article_category相关 API 服务
 * 提供article_category数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { ArticleCategory, ArticleCategoryPayload, ArticleCategoryQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * article_category API 服务类
 */
export class ArticleCategoryApi {
  /**
   * 获取article_category列表
   * @param params 查询参数（可选）
   * @returns article_category列表
   */
  static async list(params?: { organId?: number; page?: number; size?: number }): Promise<ArticleCategory[]> {
    const http = getHttpClient('default');
    const res = await http.get<ArticleCategory[]>('/cms/article_category/list', params);
    return res.data || [];
  }

  /**
   * 分页查询article_category列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(
    params: ArticleCategoryQuery & PageSelectListDto,
  ): Promise<PageData<ArticleCategory>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<ArticleCategory>>('/cms/article_category/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id article_category ID
   * @returns article_category详情
   */
  static async getById(id: number): Promise<ArticleCategory> {
    const http = getHttpClient('default');
    const res = await http.get<ArticleCategory>(`/cms/article_category/${id}`);
    return res.data;
  }

  /**
   * 保存article_category（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload article_category数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的article_category
   */
  static async save(payload: ArticleCategoryPayload): Promise<ArticleCategory> {
    const http = getHttpClient('default');
    const res = await http.post<ArticleCategory>('/cms/article_category/save', payload);
    return res.data;
  }

  /**
   * 删除article_category
   * @param id article_category ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/article_category/${id}`);
  }
}

