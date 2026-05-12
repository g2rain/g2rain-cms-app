/**
 * space相关 API 服务
 * 提供space数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { Space, SpacePayload, SpaceQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * space API 服务类
 */
export class SpaceApi {
  /**
   * 获取space列表
   * @param params 查询参数（可选）
   * @returns space列表
   */
  static async list(params?: { organId?: number; page?: number; size?: number }): Promise<Space[]> {
    const http = getHttpClient('default');
    const res = await http.get<Space[]>('/cms/space/list', params);
    return res.data || [];
  }

  /**
   * 分页查询space列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(
    params: SpaceQuery & PageSelectListDto,
  ): Promise<PageData<Space>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<Space>>('/cms/space/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id space ID
   * @returns space详情
   */
  static async getById(id: number): Promise<Space> {
    const http = getHttpClient('default');
    const res = await http.get<Space>(`/cms/space/${id}`);
    return res.data;
  }

  /**
   * 保存space（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload space数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的space
   */
  static async save(payload: SpacePayload): Promise<Space> {
    const http = getHttpClient('default');
    const res = await http.post<Space>('/cms/space/save', payload);
    return res.data;
  }

  /**
   * 删除space
   * @param id space ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/space/${id}`);
  }

  /**
   * 更新space状态
   * @param params 状态更新参数
   */
  static async updateStatus(params: { id: number; status: string }): Promise<void> {
    const http = getHttpClient('default');
    await http.post('/cms/space/update_status', params);
  }
}

