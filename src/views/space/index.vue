<template>
  <div class="space-page">
    <!-- 查询表单 -->
    <el-card class="space-page__search" shadow="never">
      <!-- 基础查询表单（BaseSelectListDto） -->
      <QueryForm
        ref="queryFormRef"
        v-model="baseQueryForm"
        @search="handleSearch"
      >
        <!-- 业务特定查询字段 -->
        <el-form-item label="机构ID">
          <OrganSelect
            v-model="queryForm.organId"
            :api-method="OrganApi.searchOrgans"
            placeholder="请选择所属机构"
            width="200px"
            clearable
          />
        </el-form-item>
        <el-form-item label="空间名称">
          <el-input v-model="queryForm.spaceName" placeholder="请输入空间名称" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="空间编码">
          <el-input v-model="queryForm.spaceCode" placeholder="请输入空间编码" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="空间类型">
          <DictSelect
            v-model="queryForm.spaceType"
            :api-method="DictItemApi.select"
            usage-code="CMS_SPACE_SPACE_TYPE"
            placeholder="请选择空间类型"
            clearable
            width="200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <DictSelect
            v-model="queryForm.status"
            :api-method="DictItemApi.select"
            usage-code="STATUS"
            placeholder="请选择状态"
            clearable
            width="200px"
          />
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
    <div class="space-page__header">
      <div class="space-page__title-group">
        <h2>管理各类space数据</h2>
      </div>
      <el-button type="primary" v-permission="'space:add'" @click="handleCreate">新增space</el-button>
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
      <el-table-column prop="spaceName" label="空间名称" width="180" />
      <el-table-column prop="spaceCode" label="空间编码" width="180" />
      <el-table-column label="空间类型" width="180">
        <template #default="{ row }">
          <DictText :value="row.spaceType" usage-code="CMS_SPACE_SPACE_TYPE" :api-method="DictItemApi.select" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template #default="{ row }">
          <StatusSwitch
            v-model="row.status"
            permission="space:edit"
            :active-value="'ACTIVE'"
            :inactive-value="'INACTIVE'"
            :options="[
              { label: '启用', value: 'ACTIVE' },
              { label: '禁用', value: 'INACTIVE' }
            ]"
            :api-method="({ nextValue }) => SpaceApi.updateStatus({ id: row.id, status: String(nextValue) })"
          />
        </template>
      </el-table-column>
      <TableColumn prop="createTime" label="创建时间" width="180" :sortable="true" />
      <TableColumn prop="updateTime" label="更新时间" width="180" :sortable="true" />
      <el-table-column label="操作" fixed="right" width="280">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleView(row)">明细</el-button>
          <el-button type="primary" v-permission="'space:edit'" link size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" v-permission="'space:delete'" link size="small" @click="handleDelete(row)">删除</el-button>
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
    <div class="space-page__pagination">
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
      :title="isEdit ? '编辑space' : '新增space'"
      width="520px"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="机构ID" prop="organId">
          <OrganSelect
            v-model="editForm.organId"
            :api-method="OrganApi.searchOrgans"
            placeholder="请选择所属机构"
            width="100%"
            clearable
          />
        </el-form-item>
        <el-form-item label="空间名称" prop="spaceName">
          <el-input v-model="editForm.spaceName" placeholder="请输入空间名称" />
        </el-form-item>
        <el-form-item label="空间编码" prop="spaceCode">
          <el-input v-model="editForm.spaceCode" placeholder="请输入空间编码" />
        </el-form-item>
        <el-form-item label="空间类型" prop="spaceType">
          <DictSelect
            v-model="editForm.spaceType"
            :api-method="DictItemApi.select"
            usage-code="CMS_SPACE_SPACE_TYPE"
            placeholder="请选择空间类型"
            width="100%"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <DictSelect
            v-model="editForm.status"
            :api-method="DictItemApi.select"
            usage-code="STATUS"
            placeholder="请选择状态"
            width="100%"
            clearable
          />
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
    <el-dialog v-model="detailDialogVisible" title="space明细" width="520px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ currentRow?.id }}</el-descriptions-item>
        <el-descriptions-item label="机构ID">
          {{ currentRow?.organId }}
        </el-descriptions-item>
        <el-descriptions-item label="空间名称">
          {{ currentRow?.spaceName }}
        </el-descriptions-item>
        <el-descriptions-item label="空间编码">
          {{ currentRow?.spaceCode }}
        </el-descriptions-item>
        <el-descriptions-item label="空间类型">
          {{ currentRow?.spaceType }}
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { SpaceApi } from './api';
import type { Space, SpacePayload, SpaceQuery } from './type';
import { OrganApi } from '@/views/organ/api';
import { DictItemApi } from '@/views/dict/api';
import type { BaseSelectListDto, PageSelectListDto } from '@platform/types/api.type';

import { SortableTable, TableColumn, SortManagerButton, QueryForm, type QueryFormData, OrganSelect, DictSelect, DictText, StatusSwitch, showErrorMessage } from '@/components';

const tableData = ref<Space[]>([]);

// 基础查询表单（BaseSelectListDto）
let baseQueryForm = reactive<QueryFormData>({
  id: undefined,
  createTime: undefined,
  updateTime: undefined,
  sorts: undefined,
});

// 业务特定查询表单
const queryForm = reactive({
  organId: null as number | null,
  spaceName: '',
  spaceCode: '',
  spaceType: '',
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
const currentRow = ref<Space | null>(null);

const editFormRef = ref<FormInstance | null>(null);

const editForm = reactive({
  id: 0,
  organId: null as number | null,
  spaceName: '',
  spaceCode: '',
  spaceType: '',
  status: '',
});

const editRules: FormRules = {
  organId: [{ required: true, message: '请输入机构ID', trigger: 'blur' }],
  spaceName: [{ required: true, message: '请输入空间名称', trigger: 'blur' }],
  spaceCode: [{ required: true, message: '请输入空间编码', trigger: 'blur' }],
  spaceType: [{ required: true, message: '请输入空间类型', trigger: 'blur' }],
  status: [{ required: true, message: '请输入状态', trigger: 'blur' }],
};

const handleCreate = () => {
  isEdit.value = false;
  editForm.organId = null;
  editForm.spaceName = '';
  editForm.spaceCode = '';
  editForm.spaceType = '';
  editForm.status = '';
  editDialogVisible.value = true;
};

const handleEdit = (row: Space) => {
  isEdit.value = true;
  editForm.id = row.id;
  editForm.organId = row.organId;
  editForm.spaceName = row.spaceName;
  editForm.spaceCode = row.spaceCode;
  editForm.spaceType = row.spaceType;
  editForm.status = row.status;
  editDialogVisible.value = true;
};

const handleView = (row: Space) => {
  currentRow.value = { ...row };
  detailDialogVisible.value = true;
};

const handleDelete = (row: Space) => {
  ElMessageBox.confirm(`确认删除space「${row.id}」吗？`, '提示', {
    type: 'warning',
  })
    .then(async () => {
      try {
        await SpaceApi.remove(row.id);
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

  const payload: SpacePayload = {
    organId: editForm.organId ?? undefined,
    spaceName: editForm.spaceName,
    spaceCode: editForm.spaceCode,
    spaceType: editForm.spaceType,
    status: editForm.status,
  };

  try {
    // 编辑模式下，将 id 添加到 payload 中
    if (isEdit.value) {
      payload.id = editForm.id;
    }
    await SpaceApi.save(payload);
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
    const organId = queryForm.organId ?? undefined;

    // 构建查询条件（query 对象），包含基础查询参数和业务查询参数
    const query: SpaceQuery = {
      // 基础查询参数（BaseSelectListDto）- 使用 Object.fromEntries 过滤无效值
      ...Object.fromEntries(
        Object.entries(baseQueryForm).filter(
          ([_, v]) => v != null && (!Array.isArray(v) || v.length > 0)
        )
      ),
      // 业务查询字段
      ...(organId !== undefined ? { organId } : {}),
      ...(queryForm.spaceName ? { spaceName: queryForm.spaceName } : {}),
      ...(queryForm.spaceCode ? { spaceCode: queryForm.spaceCode } : {}),
      ...(queryForm.spaceType ? { spaceType: queryForm.spaceType } : {}),
      ...(queryForm.status ? { status: queryForm.status } : {}),
    };
    
    // 检查 query 对象是否有有效值
    const hasQuery = Object.values(query).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
    
    // 构建查询参数，符合 SpaceQuery & PageSelectListDto 格式
    const params: SpaceQuery & PageSelectListDto = {
      // 分页参数
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      // 查询条件（直接展开，仅在有效时包含）
      ...(hasQuery ? query : {}),
    };
    
    const pageData = await SpaceApi.page(params);
    
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
  queryForm.organId = null;
  queryForm.spaceName = '';
  queryForm.spaceCode = '';
  queryForm.spaceType = '';
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
.space-page {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
}

.space-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 0;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 4px;
}

.space-page__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.space-page__header h2 {
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

.space-page__search {
  margin-bottom: 12px;
  background-color: #fff;
}

.space-page__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>

