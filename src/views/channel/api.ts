/**
 * channel相关 API 服务
 * 提供channel数据的 CRUD 操作接口
 */

import { getHttpClient } from '@/components/http';
import type { Channel, ChannelPayload, ChannelQuery } from './type';
import type { PageData, PageSelectListDto } from '@platform/types/api.type';

// 导入 mock 数据以触发自动注册（副作用导入）
import './mock';

/**
 * channel API 服务类
 */
export class ChannelApi {
  /**
   * 获取channel列表
   * @param params 查询参数（可选）
   * @returns channel列表
   */
  static async list(params?: ChannelQuery): Promise<Channel[]> {
    const http = getHttpClient('default');
    const res = await http.get<Channel[]>('/cms/channel/list', params);
    return res.data || [];
  }

  /**
   * 分页查询channel列表
   * @param params 查询参数（继承PageSelectListDto，包含基础查询和业务查询条件）
   * @returns 分页数据
   */
  static async page(params: ChannelQuery & PageSelectListDto): Promise<PageData<Channel>> {
    const http = getHttpClient('default');
    const res = await http.get<PageData<Channel>>('/cms/channel/page', params);
    return res.data;
  }

  /**
   * 按 ID 查询单条明细
   * @param id channel ID
   * @returns channel详情
   */
  static async getById(id: number): Promise<Channel> {
    const http = getHttpClient('default');
    const res = await http.get<Channel>(`/cms/channel/${id}`);
    return res.data;
  }

  /**
   * 保存channel（新增或更新）
   * 如果 payload 中包含 id，则为更新；否则为新增
   * @param payload channel数据（包含 id 时为更新，不包含时为新增）
   * @returns 保存后的channel
   */
  static async save(payload: ChannelPayload): Promise<Channel> {
    const http = getHttpClient('default');
    const res = await http.post<Channel>('/cms/channel/save', payload);
    return res.data;
  }

  /**
   * 删除channel
   * @param id channel ID
   */
  static async remove(id: number): Promise<void> {
    const http = getHttpClient('default');
    await http.delete(`/cms/channel/${id}`);
  }
}

