
<template>
  <div class="article_category-page">
    <!-- 查询表单 -->
    <el-card class="article_category-page__search" shadow="never">
      <!-- 基础查询表单（BaseSelectListDto） -->
      <QueryForm
        ref="queryFormRef"
        v-model="baseQueryForm"
        @search="handleSearch"
      >
        <!-- 业务特定查询字段 -->
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_ORGAN_ID', '机构ID')">
          <OrganSelect
            v-model="queryForm.organId"
            :api-method="OrganApi.searchOrgans"
            :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_ORGAN', '请选择所属机构')"
            width="200px"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_SPACE_ID', '空间ID')">
          <ApiSelect
            v-model="queryForm.spaceId"
            :api-method="fetchSpaces"
            value-key="id"
            label-key="spaceName"
            :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_SPACE', '请选择空间')"
            width="200px"
            clearable
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_NAME', '分类名称')">
          <el-input v-model="queryForm.categoryName" :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_CATEGORY_NAME', '请输入分类名称')" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_CODE', '分类编码')">
          <el-input v-model="queryForm.categoryCode" :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_CATEGORY_CODE', '请输入分类编码')" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item :label="$t('G2_FIELD_STATUS', '状态')">
          <DictSelect
            v-model="queryForm.status"
            :api-method="DictItemApi.select"
            usage-code="STATUS"
            :placeholder="$t('G2_PH_SELECT', '请选择')"
            clearable
            width="200px"
          />
        </el-form-item>

        <!-- 操作按钮 -->
        <template #actions>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">{{ $t('G2_BTN_QUERY', '查询') }}</el-button>
            <el-button @click="handleReset">{{ $t('G2_BTN_RESET', '重置') }}</el-button>
          </el-form-item>
        </template>
      </QueryForm>
    </el-card>

    <!-- 标题和操作按钮 -->
    <div class="article_category-page__header">
      <div class="article_category-page__title-group">
        <h2>{{ $t('CMS_ARTICLE_CATEGORY_TITLE', '管理各类article_category数据') }}</h2>
      </div>
      <el-button type="primary" v-permission="'article_category:add'" @click="handleCreate">{{ $t('CMS_ARTICLE_CATEGORY_BTN_ADD', '新增article_category') }}</el-button>
    </div>

    <SortableTable
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :enable-multi-sort="true"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="id" :label="$t('G2_FIELD_ID', 'ID')" width="120" />
      <el-table-column prop="organId" :label="$t('CMS_ARTICLE_CATEGORY_FIELD_ORGAN_ID', '机构ID')" width="140" />
      <el-table-column prop="spaceId" :label="$t('CMS_ARTICLE_CATEGORY_FIELD_SPACE_ID', '空间ID')" width="140" />
      <el-table-column prop="categoryName" :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_NAME', '分类名称')" width="180" />
      <el-table-column prop="categoryCode" :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_CODE', '分类编码')" width="180" />
      <el-table-column :label="$t('G2_FIELD_STATUS', '状态')" width="180">
        <template #default="{ row }">
          <StatusSwitch
            v-model="row.status"
            v-permission="'article_category:status_update'"
            :active-value="'ACTIVE'"
            :inactive-value="'INACTIVE'"
            usage-code="STATUS"
            :api-method="({ nextValue }) => ArticleCategoryApi.save({ id: row.id, status: String(nextValue) }).then(() => undefined)"
          />
        </template>
      </el-table-column>
      <TableColumn prop="createTime" :label="$t('G2_FIELD_CREATE_TIME', '创建时间')" width="180" :sortable="true" />
      <TableColumn prop="updateTime" :label="$t('G2_FIELD_UPDATE_TIME', '更新时间')" width="180" :sortable="true" />
      <el-table-column :label="$t('G2_FIELD_ACTION', '操作')" fixed="right" width="280">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleView(row)">{{ $t('G2_BTN_DETAIL', '明细') }}</el-button>
          <el-button type="primary" v-permission="'article_category:edit'" link size="small" @click="handleEdit(row)">{{ $t('G2_BTN_EDIT', '编辑') }}</el-button>
          <el-button type="danger" v-permission="'article_category:delete'" link size="small" @click="handleDelete(row)">{{ $t('G2_BTN_DELETE', '删除') }}</el-button>
        </template>
        <template #header>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>{{ $t('G2_FIELD_ACTION', '操作') }}</span>
            <SortManagerButton />
          </div>
        </template>
      </el-table-column>
    </SortableTable>

    <!-- 分页组件 -->
    <div class="article_category-page__pagination">
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
      :title="isEdit ? $t('CMS_ARTICLE_CATEGORY_DLG_EDIT', '编辑article_category') : $t('CMS_ARTICLE_CATEGORY_DLG_ADD', '新增article_category')"
      width="520px"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_ORGAN_ID', '机构ID')" prop="organId">
          <OrganSelect
            v-model="editForm.organId"
            :api-method="OrganApi.searchOrgans"
            :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_ORGAN', '请选择所属机构')"
            width="100%"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_SPACE_ID', '空间ID')" prop="spaceId">
          <ApiSelect
            v-model="editForm.spaceId"
            :api-method="fetchSpaces"
            value-key="id"
            label-key="spaceName"
            :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_SPACE', '请选择空间')"
            width="100%"
            clearable
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_NAME', '分类名称')" prop="categoryName">
          <el-input v-model="editForm.categoryName" :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_CATEGORY_NAME', '请输入分类名称')" />
        </el-form-item>
        <el-form-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_CODE', '分类编码')" prop="categoryCode">
          <el-input v-model="editForm.categoryCode" :placeholder="$t('CMS_ARTICLE_CATEGORY_PH_CATEGORY_CODE', '请输入分类编码')" />
        </el-form-item>
        <el-form-item :label="$t('G2_FIELD_STATUS', '状态')" prop="status">
          <DictSelect
            v-model="editForm.status"
            :api-method="DictItemApi.select"
            usage-code="STATUS"
            :placeholder="$t('G2_PH_SELECT', '请选择')"
            width="100%"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">{{ $t('G2_BTN_CANCEL', '取消') }}</el-button>
          <el-button type="primary" @click="submitEdit">{{ $t('G2_BTN_SAVE', '保存') }}</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 明细弹窗 -->
    <el-dialog v-model="detailDialogVisible" :title="$t('CMS_ARTICLE_CATEGORY_DETAIL', 'article_category明细')" width="520px">
      <el-descriptions :column="1" border>
        <el-descriptions-item :label="$t('G2_FIELD_ID', 'ID')">{{ currentRow?.id }}</el-descriptions-item>
        <el-descriptions-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_ORGAN_ID', '机构ID')">
          {{ currentRow?.organId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_SPACE_ID', '空间ID')">
          {{ currentRow?.spaceId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_NAME', '分类名称')">
          {{ currentRow?.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('CMS_ARTICLE_CATEGORY_FIELD_CATEGORY_CODE', '分类编码')">
          {{ currentRow?.categoryCode }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('G2_FIELD_STATUS', '状态')">
          {{ currentRow?.status }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('G2_FIELD_VERSION', '版本号')">{{ currentRow?.version }}</el-descriptions-item>
        <el-descriptions-item :label="$t('G2_FIELD_CREATE_TIME', '创建时间')">{{ currentRow?.createTime }}</el-descriptions-item>
        <el-descriptions-item :label="$t('G2_FIELD_UPDATE_TIME', '更新时间')">{{ currentRow?.updateTime }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialogVisible = false">{{ $t('G2_BTN_CLOSE', '关闭') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessageBox, ElMessage } from 'element-plus';
import { t } from '@platform/i18n';
import { ArticleCategoryApi } from './api';
import type { ArticleCategory, ArticleCategoryPayload, ArticleCategoryQuery } from './type';
import { SpaceApi } from '@/views/space/api';
import { OrganApi } from '@/views/organ/api';
import { DictItemApi } from '@/views/dict/api';
import type { BaseSelectListDto, PageSelectListDto } from '@platform/types/api.type';

import { SortableTable, TableColumn, SortManagerButton, QueryForm, showErrorMessage, OrganSelect, ApiSelect, DictSelect, StatusSwitch } from '@/components';

const tableData = ref<ArticleCategory[]>([]);

const fetchSpaces = async (params: { key?: string; value?: number }) => {
  // 按 ID 回显
  if (params.value !== undefined && params.value !== null) {
    try {
      const item = await SpaceApi.getById(params.value);
      return item ? [item] : [];
    } catch {
      return [];
    }
  }

  // 默认列表 / 按名称搜索
  const page = await SpaceApi.page({
    pageNum: 1,
    pageSize: 10,
    ...(params.key ? { spaceName: params.key } : {}),
  } as any);
  return page.records || [];
};

// 基础查询表单（BaseSelectListDto）
let baseQueryForm = reactive<BaseSelectListDto>({
  id: undefined,
  createTime: undefined,
  updateTime: undefined,
  sorts: undefined,
});

// 业务特定查询表单
const queryForm = reactive({
  organId: null as number | null,
  spaceId: null as number | null,
  categoryName: '',
  categoryCode: '',
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
const currentRow = ref<ArticleCategory | null>(null);

const editFormRef = ref<FormInstance | null>(null);

const editForm = reactive({
  id: 0,
  organId: null as number | null,
  spaceId: null as number | null,
  categoryName: '',
  categoryCode: '',
  status: '',
});

const editRules = computed<FormRules>(() => ({
  organId: [{ required: true, message: t('CMS_ARTICLE_CATEGORY_VLD_ORGAN', '请选择机构'), trigger: 'change' }],
  spaceId: [{ required: true, message: t('CMS_ARTICLE_CATEGORY_VLD_SPACE', '请选择空间'), trigger: 'change' }],
  categoryName: [{ required: true, message: t('CMS_ARTICLE_CATEGORY_VLD_CATEGORY_NAME', '请输入分类名称'), trigger: 'blur' }],
  status: [{ required: true, message: t('CMS_ARTICLE_CATEGORY_VLD_STATUS', '请选择状态'), trigger: 'change' }],
}));

const handleCreate = () => {
  isEdit.value = false;
  editForm.organId = null;
  editForm.spaceId = null;
  editForm.categoryName = '';
  editForm.categoryCode = '';
  editForm.status = '';
  editDialogVisible.value = true;
};

const handleEdit = (row: ArticleCategory) => {
  isEdit.value = true;
  editForm.id = row.id;
  editForm.organId = row.organId ?? null;
  editForm.spaceId = row.spaceId ?? null;
  editForm.categoryName = row.categoryName;
  editForm.categoryCode = row.categoryCode ?? '';
  editForm.status = row.status;
  editDialogVisible.value = true;
};

const handleView = (row: ArticleCategory) => {
  currentRow.value = { ...row };
  detailDialogVisible.value = true;
};

const handleDelete = (row: ArticleCategory) => {
  ElMessageBox.confirm(
    t('CMS_ARTICLE_CATEGORY_DEL_CONFIRM', `确认删除article_category「${row.id}」吗？`),
    t('G2_LBL_TIP', '提示'),
    { type: 'warning' },
  )
    .then(async () => {
      try {
        await ArticleCategoryApi.remove(row.id);
        // 如果当前页只有一条数据，删除后应该跳转到上一页
        if (tableData.value.length === 1 && pagination.pageNum > 1) {
          pagination.pageNum--;
        }
        await loadData();
        ElMessage.success(t('G2_MSG_DELETE_OK', '删除成功'));
      } catch (error: any) {
        showErrorMessage(error || t('G2_MSG_DELETE_FAIL', '删除失败'));
      }
    })
    .catch(() => {});
};

const submitEdit = async () => {
  if (!editFormRef.value) return;
  const valid = await editFormRef.value.validate();
  if (!valid) return;

  const payload: ArticleCategoryPayload = {
    organId: editForm.organId ?? undefined,
    spaceId: editForm.spaceId ?? undefined,
    categoryName: editForm.categoryName,
    categoryCode: editForm.categoryCode || null,
    status: editForm.status,
  };

  try {
    // 编辑模式下，将 id 添加到 payload 中
    if (isEdit.value) {
      payload.id = editForm.id;
    }
    await ArticleCategoryApi.save(payload);
    ElMessage.success(isEdit.value ? t('G2_MSG_UPDATE_OK', '更新成功') : t('G2_MSG_ADD_OK', '新增成功'));
    await loadData();
    editDialogVisible.value = false;
  } catch (error: any) {
    showErrorMessage(error || t('G2_MSG_SAVE_FAIL', '保存失败'));
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
    const spaceId = queryForm.spaceId ?? undefined;

    // 构建查询条件（query 对象），包含基础查询参数和业务查询参数
    const query: ArticleCategoryQuery = {
      // 基础查询参数（BaseSelectListDto）- 使用 Object.fromEntries 过滤无效值
      ...Object.fromEntries(
        Object.entries(baseQueryForm).filter(
          ([_, v]) => v != null && (!Array.isArray(v) || v.length > 0)
        )
      ),
      // 业务查询字段
      ...(organId !== undefined ? { organId } : {}),
      ...(spaceId !== undefined ? { spaceId } : {}),
      ...(queryForm.categoryName ? { categoryName: queryForm.categoryName } : {}),
      ...(queryForm.categoryCode ? { categoryCode: queryForm.categoryCode } : {}),
      ...(queryForm.status ? { status: queryForm.status } : {}),
    };
    
    // 检查 query 对象是否有有效值
    const hasQuery = Object.values(query).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
    
    // 构建查询参数，符合 ArticleCategoryQuery & PageSelectListDto 格式
    const params: ArticleCategoryQuery & PageSelectListDto = {
      // 分页参数
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      // 查询条件（直接展开，仅在有效时包含）
      ...(hasQuery ? query : {}),
    };
    
    const pageData = await ArticleCategoryApi.page(params);
    
    tableData.value = pageData.records;
    pagination.total = pageData.total;
  } catch (error: any) {
    showErrorMessage(error || t('G2_MSG_LOAD_FAIL', '加载列表失败'));
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
  queryForm.spaceId = null;
  queryForm.categoryName = '';
  queryForm.categoryCode = '';
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
.article_category-page {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
}

.article_category-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 0;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 4px;
}

.article_category-page__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.article_category-page__header h2 {
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

.article_category-page__search {
  margin-bottom: 12px;
  background-color: #fff;
}

.article_category-page__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
