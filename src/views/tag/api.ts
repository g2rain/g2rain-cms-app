/**
 * tag相关 API 服务
 * 提供tag数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { Tag, TagPayload, TagQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * tag API 服务类
 */
export class TagApi {
  /**
   * 获取tag列表
   * @param params 查询参数（可选）
   * @returns tag列表
   */
  static async list(params?: TagQuery): Promise<Tag[]> {
    const http = getHttpClient('default');
    const res = await http.get<Tag[]>('/cms/tag/list', params);
    return res.data || [];
  }

  /**
   * 分页查询tag列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(params: TagQuery & PageSelectListDto): Promise<PageData<Tag>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<Tag>>('/cms/tag/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id tag ID
   * @returns tag详情
   */
  static async getById(id: number): Promise<Tag> {
    const http = getHttpClient('default');
    const res = await http.get<Tag>(`/cms/tag/${id}`);
    return res.data;
  }

  /**
   * 保存tag（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload tag数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的tag
   */
  static async save(payload: TagPayload): Promise<Tag> {
    const http = getHttpClient('default');
    const res = await http.post<Tag>('/cms/tag/save', payload);
    return res.data;
  }

  /**
   * 删除tag
   * @param id tag ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/tag/${id}`);
  }
}

