/**
 * page相关 API 服务
 * 提供page数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { Page, PagePayload, PageQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * page API 服务类
 */
export class PageApi {
  /**
   * 获取page列表
   * @param params 查询参数（可选）
   * @returns page列表
   */
  static async list(params?: PageQuery): Promise<Page[]> {
    const http = getHttpClient('default');
    const res = await http.get<Page[]>('/cms/page/list', params);
    return res.data || [];
  }

  /**
   * 分页查询page列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(params: PageQuery & PageSelectListDto): Promise<PageData<Page>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<Page>>('/cms/page/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id page ID
   * @returns page详情
   */
  static async getById(id: number): Promise<Page> {
    const http = getHttpClient('default');
    const res = await http.get<Page>(`/cms/page/${id}`);
    return res.data;
  }

  /**
   * 保存page（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload page数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的page
   */
  static async save(payload: PagePayload): Promise<Page> {
    const http = getHttpClient('default');
    const res = await http.post<Page>('/cms/page/save', payload);
    return res.data;
  }

  /**
   * 删除page
   * @param id page ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/page/${id}`);
  }
}

