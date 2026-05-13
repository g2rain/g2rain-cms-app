/**
 * article_tag_relation相关 API 服务
 * 提供article_tag_relation数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { ArticleTagRelation, ArticleTagRelationPayload, ArticleTagRelationQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * article_tag_relation API 服务类
 */
export class ArticleTagRelationApi {
  /**
   * 获取article_tag_relation列表
   * @param params 查询参数（可选）
   * @returns article_tag_relation列表
   */
  static async list(params?: ArticleTagRelationQuery): Promise<ArticleTagRelation[]> {
    const http = getHttpClient('default');
    const res = await http.get<ArticleTagRelation[]>('/cms/article_tag_relation/list', params);
    return res.data || [];
  }

  /**
   * 分页查询article_tag_relation列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(params: ArticleTagRelationQuery & PageSelectListDto): Promise<PageData<ArticleTagRelation>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<ArticleTagRelation>>('/cms/article_tag_relation/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id article_tag_relation ID
   * @returns article_tag_relation详情
   */
  static async getById(id: number): Promise<ArticleTagRelation> {
    const http = getHttpClient('default');
    const res = await http.get<ArticleTagRelation>(`/cms/article_tag_relation/${id}`);
    return res.data;
  }

  /**
   * 保存article_tag_relation（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload article_tag_relation数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的article_tag_relation
   */
  static async save(payload: ArticleTagRelationPayload): Promise<ArticleTagRelation> {
    const http = getHttpClient('default');
    const res = await http.post<ArticleTagRelation>('/cms/article_tag_relation/save', payload);
    return res.data;
  }

  /**
   * 删除article_tag_relation
   * @param id article_tag_relation ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/article_tag_relation/${id}`);
  }

  /**
   * 为文章批量添加标签
   * @param payload 文章ID与标签ID列表
   */
  static async batchAddTags(payload: { articleId: number; tagIds: number[] }): Promise<void> {
    const http = getHttpClient('default');
    await http.post('/cms/article_tag_relation/batch_add_tags', payload);
  }
}

