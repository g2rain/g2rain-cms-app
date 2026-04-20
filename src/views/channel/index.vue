<template>
  <div class="channel-page">
    <!-- 查询表单 -->
    <el-card class="channel-page__search" shadow="never">
      <!-- 基础查询表单（BaseSelectListDto） -->
      <QueryForm
        ref="queryFormRef"
        v-model="baseQueryForm"
        @search="handleSearch"
      >
        <!-- 业务特定查询字段 -->
        <el-form-item label="机构ID">
          <el-input v-model="queryForm.organId" placeholder="请输入机构ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="空间ID">
          <el-input v-model="queryForm.spaceId" placeholder="请输入空间ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="站点ID">
          <el-input v-model="queryForm.siteId" placeholder="请输入站点ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="父栏目ID">
          <el-input v-model="queryForm.parentId" placeholder="请输入父栏目ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="栏目名称">
          <el-input v-model="queryForm.channelName" placeholder="请输入栏目名称" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="栏目编码">
          <el-input v-model="queryForm.channelCode" placeholder="请输入栏目编码" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="栏目类型">
          <el-input v-model="queryForm.channelType" placeholder="请输入栏目类型" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="queryForm.path" placeholder="请输入访问路径" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="分类ID">
          <el-input v-model="queryForm.categoryId" placeholder="请输入分类ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="页面ID">
          <el-input v-model="queryForm.pageId" placeholder="请输入页面ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="外链URL">
          <el-input v-model="queryForm.linkUrl" placeholder="请输入外链URL" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="queryForm.sortOrder" placeholder="请输入排序" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-input v-model="queryForm.visible" placeholder="请输入是否显示" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="queryForm.status" placeholder="请输入状态" clearable style="width: 200px" />
        </el-form-item>

        <!-- 操作按钮 -->
        <template #actions>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </template>
      </QueryForm>
    </el-card>

    <!-- 标题和操作按钮 -->
    <div class="channel-page__header">
      <div class="channel-page__title-group">
        <h2>管理各类channel数据</h2>
      </div>
      <el-button type="primary" v-permission="'channel:add'" @click="handleCreate">新增channel</el-button>
    </div>

    <SortableTable
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :enable-multi-sort="true"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="organId" label="机构ID" width="140" />
      <el-table-column prop="spaceId" label="空间ID" width="140" />
      <el-table-column prop="siteId" label="站点ID" width="140" />
      <el-table-column prop="parentId" label="父栏目ID" width="140" />
      <el-table-column prop="channelName" label="栏目名称" width="180" />
      <el-table-column prop="channelCode" label="栏目编码" width="180" />
      <el-table-column prop="channelType" label="栏目类型" width="180" />
      <el-table-column prop="path" label="访问路径" width="180" />
      <el-table-column prop="categoryId" label="分类ID" width="140" />
      <el-table-column prop="pageId" label="页面ID" width="140" />
      <el-table-column prop="linkUrl" label="外链URL" width="220" />
      <el-table-column prop="sortOrder" label="排序" width="140" />
      <el-table-column prop="visible" label="是否显示" width="140" />
      <el-table-column prop="status" label="状态" width="180" />
      <TableColumn prop="createTime" label="创建时间" width="180" :sortable="true" />
      <TableColumn prop="updateTime" label="更新时间" width="180" :sortable="true" />
      <el-table-column label="操作" fixed="right" width="280">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleView(row)">明细</el-button>
          <el-button type="primary" v-permission="'channel:edit'" link size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" v-permission="'channel:delete'" link size="small" @click="handleDelete(row)">删除</el-button>
        </template>
        <template #header>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>操作</span>
            <SortManagerButton />
          </div>
        </template>
      </el-table-column>
    </SortableTable>

    <!-- 分页组件 -->
    <div class="channel-page__pagination">
      <el-pagination
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 新增 / 编辑弹窗 -->
    <el-dialog
      v-model="editDialogVisible"
      :title="isEdit ? '编辑channel' : '新增channel'"
      width="520px"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="机构ID" prop="organId">
          <el-input v-model="editForm.organId" placeholder="请输入机构ID" />
        </el-form-item>
        <el-form-item label="空间ID" prop="spaceId">
          <el-input v-model="editForm.spaceId" placeholder="请输入空间ID" />
        </el-form-item>
        <el-form-item label="站点ID" prop="siteId">
          <el-input v-model="editForm.siteId" placeholder="请输入站点ID" />
        </el-form-item>
        <el-form-item label="父栏目ID" prop="parentId">
          <el-input v-model="editForm.parentId" placeholder="请输入父栏目ID" />
        </el-form-item>
        <el-form-item label="栏目名称" prop="channelName">
          <el-input v-model="editForm.channelName" placeholder="请输入栏目名称" />
        </el-form-item>
        <el-form-item label="栏目编码" prop="channelCode">
          <el-input v-model="editForm.channelCode" placeholder="请输入栏目编码" />
        </el-form-item>
        <el-form-item label="栏目类型" prop="channelType">
          <el-input v-model="editForm.channelType" placeholder="请输入栏目类型" />
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="editForm.path" placeholder="请输入访问路径" />
        </el-form-item>
        <el-form-item label="分类ID" prop="categoryId">
          <el-input v-model="editForm.categoryId" placeholder="请输入分类ID" />
        </el-form-item>
        <el-form-item label="页面ID" prop="pageId">
          <el-input v-model="editForm.pageId" placeholder="请输入页面ID" />
        </el-form-item>
        <el-form-item label="外链URL" prop="linkUrl">
          <el-input v-model="editForm.linkUrl" placeholder="请输入外链URL" />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model="editForm.sortOrder" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="是否显示" prop="visible">
          <el-input v-model="editForm.visible" placeholder="请输入是否显示" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="editForm.status" placeholder="请输入状态" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">保 存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 明细弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="channel明细" width="520px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ currentRow?.id }}</el-descriptions-item>
        <el-descriptions-item label="机构ID">
          {{ currentRow?.organId }}
        </el-descriptions-item>
        <el-descriptions-item label="空间ID">
          {{ currentRow?.spaceId }}
        </el-descriptions-item>
        <el-descriptions-item label="站点ID">
          {{ currentRow?.siteId }}
        </el-descriptions-item>
        <el-descriptions-item label="父栏目ID">
          {{ currentRow?.parentId }}
        </el-descriptions-item>
        <el-descriptions-item label="栏目名称">
          {{ currentRow?.channelName }}
        </el-descriptions-item>
        <el-descriptions-item label="栏目编码">
          {{ currentRow?.channelCode }}
        </el-descriptions-item>
        <el-descriptions-item label="栏目类型">
          {{ currentRow?.channelType }}
        </el-descriptions-item>
        <el-descriptions-item label="访问路径">
          {{ currentRow?.path }}
        </el-descriptions-item>
        <el-descriptions-item label="分类ID">
          {{ currentRow?.categoryId }}
        </el-descriptions-item>
        <el-descriptions-item label="页面ID">
          {{ currentRow?.pageId }}
        </el-descriptions-item>
        <el-descriptions-item label="外链URL">
          {{ currentRow?.linkUrl }}
        </el-descriptions-item>
        <el-descriptions-item label="排序">
          {{ currentRow?.sortOrder }}
        </el-descriptions-item>
        <el-descriptions-item label="是否显示">
          {{ currentRow?.visible }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          {{ currentRow?.status }}
        </el-descriptions-item>
        <el-descriptions-item label="版本号">{{ currentRow?.version }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentRow?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ currentRow?.updateTime }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialogVisible = false">关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessageBox, ElMessage } from 'element-plus';
import { ChannelApi } from './api';
import type { Channel, ChannelPayload, ChannelQuery } from './type';
import type { BaseSelectListDto, PageSelectListDto } from '@platform/types/api.type';

import { SortableTable, TableColumn, SortManagerButton, QueryForm, showErrorMessage } from '@/components';

const tableData = ref<Channel[]>([]);

// 基础查询表单（BaseSelectListDto）
let baseQueryForm = reactive<BaseSelectListDto>({
  id: undefined,
  createTime: undefined,
  updateTime: undefined,
  sorts: undefined,
});

// 业务特定查询表单
const queryForm = reactive({
  organId: '',
  spaceId: '',
  siteId: '',
  parentId: '',
  channelName: '',
  channelCode: '',
  channelType: '',
  path: '',
  categoryId: '',
  pageId: '',
  linkUrl: '',
  sortOrder: '',
  visible: '',
  status: '',
});

// 组件引用
const queryFormRef = ref<InstanceType<typeof QueryForm> | null>(null);

// 分页相关状态
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

const editDialogVisible = ref(false);
const detailDialogVisible = ref(false);
const isEdit = ref(false);
const currentRow = ref<Channel | null>(null);

const editFormRef = ref<FormInstance | null>(null);

const editForm = reactive({
  id: 0,
  organId: '',
  spaceId: '',
  siteId: '',
  parentId: '',
  channelName: '',
  channelCode: '',
  channelType: '',
  path: '',
  categoryId: '',
  pageId: '',
  linkUrl: '',
  sortOrder: '',
  visible: '',
  status: '',
});

const editRules: FormRules = {
  organId: [{ required: true, message: '请输入机构ID', trigger: 'blur' }],
  spaceId: [{ required: true, message: '请输入空间ID', trigger: 'blur' }],
  siteId: [{ required: true, message: '请输入站点ID', trigger: 'blur' }],
  parentId: [{ required: true, message: '请输入父栏目ID', trigger: 'blur' }],
  channelName: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
  channelType: [{ required: true, message: '请输入栏目类型', trigger: 'blur' }],
  sortOrder: [{ required: true, message: '请输入排序', trigger: 'blur' }],
  visible: [{ required: true, message: '请输入是否显示', trigger: 'blur' }],
  status: [{ required: true, message: '请输入状态', trigger: 'blur' }],
};

const handleCreate = () => {
  isEdit.value = false;
  editForm.organId = '';
  editForm.spaceId = '';
  editForm.siteId = '';
  editForm.parentId = '';
  editForm.channelName = '';
  editForm.channelCode = '';
  editForm.channelType = '';
  editForm.path = '';
  editForm.categoryId = '';
  editForm.pageId = '';
  editForm.linkUrl = '';
  editForm.sortOrder = '';
  editForm.visible = '';
  editForm.status = '';
  editDialogVisible.value = true;
};

const handleEdit = (row: Channel) => {
  isEdit.value = true;
  editForm.id = row.id;
  editForm.organId = String(row.organId);
  editForm.spaceId = String(row.spaceId);
  editForm.siteId = String(row.siteId);
  editForm.parentId = String(row.parentId);
  editForm.channelName = row.channelName;
  editForm.channelCode = row.channelCode ?? '';
  editForm.channelType = row.channelType;
  editForm.path = row.path ?? '';
  editForm.categoryId = row.categoryId === null ? '' : String(row.categoryId);
  editForm.pageId = row.pageId === null ? '' : String(row.pageId);
  editForm.linkUrl = row.linkUrl ?? '';
  editForm.sortOrder = String(row.sortOrder);
  editForm.visible = String(row.visible);
  editForm.status = row.status;
  editDialogVisible.value = true;
};

const handleView = (row: Channel) => {
  currentRow.value = { ...row };
  detailDialogVisible.value = true;
};

const handleDelete = (row: Channel) => {
  ElMessageBox.confirm(`确认删除channel「${row.id}」吗？`, '提示', {
    type: 'warning',
  })
    .then(async () => {
      try {
        await ChannelApi.remove(row.id);
        // 如果当前页只有一条数据，删除后应该跳转到上一页
        if (tableData.value.length === 1 && pagination.pageNum > 1) {
          pagination.pageNum--;
        }
        await loadData();
        ElMessage.success('删除成功');
      } catch (error: any) {
        showErrorMessage(error || '删除失败');
      }
    })
    .catch(() => {});
};

const submitEdit = async () => {
  if (!editFormRef.value) return;
  const valid = await editFormRef.value.validate();
  if (!valid) return;

  const payload: ChannelPayload = {
    organId: editForm.organId ? Number(editForm.organId) : undefined,
    spaceId: editForm.spaceId ? Number(editForm.spaceId) : undefined,
    siteId: editForm.siteId ? Number(editForm.siteId) : undefined,
    parentId: editForm.parentId ? Number(editForm.parentId) : undefined,
    channelName: editForm.channelName,
    channelCode: editForm.channelCode || null,
    channelType: editForm.channelType,
    path: editForm.path || null,
    categoryId: editForm.categoryId ? Number(editForm.categoryId) : null,
    pageId: editForm.pageId ? Number(editForm.pageId) : null,
    linkUrl: editForm.linkUrl || null,
    sortOrder: editForm.sortOrder ? Number(editForm.sortOrder) : undefined,
    visible: editForm.visible ? Number(editForm.visible) : undefined,
    status: editForm.status,
  };

  try {
    // 编辑模式下，将 id 添加到 payload 中
    if (isEdit.value) {
      payload.id = editForm.id;
    }
    await ChannelApi.save(payload);
    ElMessage.success(isEdit.value ? '更新成功' : '新增成功');
    await loadData();
    editDialogVisible.value = false;
  } catch (error: any) {
    showErrorMessage(error || '保存失败');
  }
};

// 处理排序变化
const handleSortChange = (params: Record<string, string>) => {
  // 更新 QueryForm 的 sorts 字段
  if (queryFormRef.value) {
    queryFormRef.value.updateSorts(params);
  }
};

const loadData = async () => {
  try {
    const organId = queryForm.organId ? Number(queryForm.organId) : undefined;
    const spaceId = queryForm.spaceId ? Number(queryForm.spaceId) : undefined;
    const siteId = queryForm.siteId ? Number(queryForm.siteId) : undefined;
    const parentId = queryForm.parentId ? Number(queryForm.parentId) : undefined;
    const sortOrder = queryForm.sortOrder ? Number(queryForm.sortOrder) : undefined;
    const visible = queryForm.visible ? Number(queryForm.visible) : undefined;
    const categoryId = queryForm.categoryId ? Number(queryForm.categoryId) : undefined;
    const pageId = queryForm.pageId ? Number(queryForm.pageId) : undefined;

    // 构建查询条件（query 对象），包含基础查询参数和业务查询参数
    const query: ChannelQuery = {
      // 基础查询参数（BaseSelectListDto）- 使用 Object.fromEntries 过滤无效值
      ...Object.fromEntries(
        Object.entries(baseQueryForm).filter(
          ([_, v]) => v != null && (!Array.isArray(v) || v.length > 0)
        )
      ),
      // 业务查询字段
      ...(organId !== undefined ? { organId } : {}),
      ...(spaceId !== undefined ? { spaceId } : {}),
      ...(siteId !== undefined ? { siteId } : {}),
      ...(parentId !== undefined ? { parentId } : {}),
      ...(queryForm.channelName ? { channelName: queryForm.channelName } : {}),
      ...(queryForm.channelCode ? { channelCode: queryForm.channelCode } : {}),
      ...(queryForm.channelType ? { channelType: queryForm.channelType } : {}),
      ...(queryForm.path ? { path: queryForm.path } : {}),
      ...(categoryId !== undefined ? { categoryId } : {}),
      ...(pageId !== undefined ? { pageId } : {}),
      ...(queryForm.linkUrl ? { linkUrl: queryForm.linkUrl } : {}),
      ...(sortOrder !== undefined ? { sortOrder } : {}),
      ...(visible !== undefined ? { visible } : {}),
      ...(queryForm.status ? { status: queryForm.status } : {}),
    };
    
    // 检查 query 对象是否有有效值
    const hasQuery = Object.values(query).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
    
    // 构建查询参数，符合 ChannelQuery & PageSelectListDto 格式
    const params: ChannelQuery & PageSelectListDto = {
      // 分页参数
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      // 查询条件（直接展开，仅在有效时包含）
      ...(hasQuery ? query : {}),
    };
    
    const pageData = await ChannelApi.page(params);
    
    tableData.value = pageData.records;
    pagination.total = pageData.total;
  } catch (error: any) {
    showErrorMessage(error || '加载列表失败');
  }
};

// 查询
const handleSearch = () => {
  pagination.pageNum = 1; // 重置到第一页
  loadData();
};

// 重置查询条件
const handleReset = () => {
  // 重置基础查询表单
  baseQueryForm.id = undefined;
  baseQueryForm.createTime = undefined;
  baseQueryForm.updateTime = undefined;
  baseQueryForm.sorts = undefined;
  
  // 重置业务特定查询表单
  queryForm.organId = '';
  queryForm.spaceId = '';
  queryForm.siteId = '';
  queryForm.parentId = '';
  queryForm.channelName = '';
  queryForm.channelCode = '';
  queryForm.channelType = '';
  queryForm.path = '';
  queryForm.categoryId = '';
  queryForm.pageId = '';
  queryForm.linkUrl = '';
  queryForm.sortOrder = '';
  queryForm.visible = '';
  queryForm.status = '';
  
  pagination.pageNum = 1; // 重置到第一页
  loadData();
};

// 分页大小变化
const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  pagination.pageNum = 1; // 重置到第一页
  loadData();
};

// 页码变化
const handlePageChange = (page: number) => {
  pagination.pageNum = page;
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.channel-page {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
}

.channel-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 0;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 4px;
}

.channel-page__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.channel-page__header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.channel-page__search {
  margin-bottom: 12px;
  background-color: #fff;
}

.channel-page__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>

