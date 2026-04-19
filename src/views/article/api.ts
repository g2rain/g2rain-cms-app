/**
 * article相关 API 服务
 * 提供article数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { Article, ArticlePayload, ArticleQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * article API 服务类
 */
export class ArticleApi {
  /**
   * 获取article列表
   * @param params 查询参数（可选）
   * @returns article列表
   */
  static async list(params?: { organId?: number; page?: number; size?: number }): Promise<Article[]> {
    const http = getHttpClient('default');
    const res = await http.get<Article[]>('/cms/article/list', params);
    return res.data || [];
  }

  /**
   * 分页查询article列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(
    params: ArticleQuery & PageSelectListDto,
  ): Promise<PageData<Article>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<Article>>('/cms/article/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id article ID
   * @returns article详情
   */
  static async getById(id: number): Promise<Article> {
    const http = getHttpClient('default');
    const res = await http.get<Article>(`/cms/article/${id}`);
    return res.data;
  }

  /**
   * 保存article（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload article数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的article
   */
  static async save(payload: ArticlePayload): Promise<Article> {
    const http = getHttpClient('default');
    const res = await http.post<Article>('/cms/article/save', payload);
    return res.data;
  }

  /**
   * 删除article
   * @param id article ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/article/${id}`);
  }

}

