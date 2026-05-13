/**
 * web_site相关 API 服务
 * 提供web_site数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { WebSite, WebSitePayload, WebSiteQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * web_site API 服务类
 */
export class WebSiteApi {
  /**
   * 获取web_site列表
   * @param params 查询参数（可选）
   * @returns web_site列表
   */
  static async list(params?: WebSiteQuery): Promise<WebSite[]> {
    const http = getHttpClient('default');
    const res = await http.get<WebSite[]>('/cms/web_site/list', params);
    return res.data || [];
  }

  /**
   * 分页查询web_site列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(params: WebSiteQuery & PageSelectListDto): Promise<PageData<WebSite>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<WebSite>>('/cms/web_site/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id web_site ID
   * @returns web_site详情
   */
  static async getById(id: number): Promise<WebSite> {
    const http = getHttpClient('default');
    const res = await http.get<WebSite>(`/cms/web_site/${id}`);
    return res.data;
  }

  /**
   * 保存web_site（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload web_site数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的web_site
   */
  static async save(payload: WebSitePayload): Promise<WebSite> {
    const http = getHttpClient('default');
    const res = await http.post<WebSite>('/cms/web_site/save', payload);
    return res.data;
  }

  /**
   * 删除web_site
   * @param id web_site ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/web_site/${id}`);
  }
}

