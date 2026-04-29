<template>
  <div class="article-page">
    <!-- 查询表单 -->
    <el-card class="article-page__search" shadow="never">
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
        <el-form-item label="空间ID">
          <ApiSelect
            v-model="queryForm.spaceId"
            :api-method="fetchSpaces"
            value-key="id"
            label-key="spaceName"
            placeholder="请选择空间"
            clearable
            width="200px"
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item label="分类ID">
          <ApiSelect
            v-model="queryForm.categoryId"
            :api-method="fetchCategories"
            value-key="id"
            label-key="categoryName"
            placeholder="请选择分类"
            clearable
            width="200px"
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item label="来源应用ID">
          <el-input v-model="queryForm.sourceApplicationId" placeholder="请输入来源应用ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="来源追踪ID">
          <el-input v-model="queryForm.sourceTraceId" placeholder="请输入来源追踪ID" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="queryForm.title" placeholder="请输入标题" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="queryForm.summary" placeholder="请输入摘要" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="封面">
          <el-input v-model="queryForm.cover" placeholder="请输入封面" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="内容类型">
          <DictSelect
            v-model="queryForm.contentType"
            :api-method="DictItemApi.select"
            usage-code="CMS_ARTICLE_CONTENT_TYPE"
            placeholder="请选择内容类型"
            clearable
            width="200px"
          />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="queryForm.author" placeholder="请输入作者" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="状态">
          <DictSelect
            v-model="queryForm.status"
            :api-method="DictItemApi.select"
            usage-code="CMS_ARTICLE_STATUS"
            placeholder="请选择状态"
            clearable
            width="200px"
          />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-input v-model="queryForm.publishTime" placeholder="请输入发布时间" clearable style="width: 200px" />
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
    <div class="article-page__header">
      <div class="article-page__title-group">
        <h2>管理各类article数据</h2>
      </div>
      <el-button type="primary" v-permission="'article:add'" @click="handleCreate">新增article</el-button>
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
      <el-table-column prop="categoryId" label="分类ID" width="140" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="summary" label="摘要" width="180" />
      <el-table-column prop="cover" label="封面" width="180" />
      <el-table-column label="内容类型" width="180">
        <template #default="{ row }">
          <DictText :value="row.contentType" usage-code="CMS_ARTICLE_CONTENT_TYPE" :api-method="DictItemApi.select" />
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column label="状态" width="180">
        <template #default="{ row }">
          <DictText :value="row.status" usage-code="CMS_ARTICLE_STATUS" :api-method="DictItemApi.select" />
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="180" />
      <el-table-column prop="sourceApplicationId" label="来源应用ID" width="140" />
      <el-table-column prop="sourceTraceId" label="来源追踪ID" width="180" />
      <TableColumn prop="createTime" label="创建时间" width="180" :sortable="true" />
      <TableColumn prop="updateTime" label="更新时间" width="180" :sortable="true" />
      <el-table-column label="操作" fixed="right" width="360">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleView(row)">明细</el-button>
          <el-button type="primary" v-permission="'article:edit'" link size="small" :disabled="row.contentType !== 'MARKDOWN'" @click="handleEditContent(row)">编辑内容</el-button>
          <el-button type="primary" v-permission="'article:edit'" link size="small" :disabled="row.contentType !== 'MARKDOWN'" @click="handleOpenTagDrawer(row)">新增标签</el-button>
          <el-button type="primary" v-permission="'article:edit'" link size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" v-permission="'article:delete'" link size="small" @click="handleDelete(row)">删除</el-button>
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
    <div class="article-page__pagination">
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
      :title="isEdit ? '编辑article' : '新增article'"
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
        <el-form-item label="空间ID" prop="spaceId">
          <ApiSelect
            v-model="editForm.spaceId"
            :api-method="fetchSpaces"
            value-key="id"
            label-key="spaceName"
            placeholder="请选择空间"
            clearable
            width="100%"
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item label="分类ID" prop="categoryId">
          <ApiSelect
            v-model="editForm.categoryId"
            :api-method="fetchCategories"
            value-key="id"
            label-key="categoryName"
            placeholder="请选择分类"
            clearable
            width="100%"
            :allow-empty-keyword="true"
            :prefetch-on-open="true"
          />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="editForm.summary" placeholder="请输入摘要" />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-input v-model="editForm.cover" placeholder="请输入封面" />
        </el-form-item>
        <el-form-item label="内容类型" prop="contentType">
          <el-input v-model="editForm.contentType" disabled />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editForm.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="editForm.status" disabled />
        </el-form-item>
        <el-form-item label="来源追踪ID" prop="sourceTraceId">
          <el-input
            v-model="editForm.sourceTraceId"
            disabled
            placeholder="系统自动生成，不可修改"
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
    <el-dialog v-model="detailDialogVisible" title="article明细" width="520px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ currentRow?.id }}</el-descriptions-item>
        <el-descriptions-item label="机构ID">
          {{ currentRow?.organId }}
        </el-descriptions-item>
        <el-descriptions-item label="空间ID">
          {{ currentRow?.spaceId }}
        </el-descriptions-item>
        <el-descriptions-item label="分类ID">
          {{ currentRow?.categoryId }}
        </el-descriptions-item>
        <el-descriptions-item label="标题">
          {{ currentRow?.title }}
        </el-descriptions-item>
        <el-descriptions-item label="作者">
          {{ currentRow?.author }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          {{ currentRow?.status }}
        </el-descriptions-item>
        <el-descriptions-item label="发布时间">
          {{ currentRow?.publishTime }}
        </el-descriptions-item>
        <el-descriptions-item label="摘要">
          {{ currentRow?.summary }}
        </el-descriptions-item>
        <el-descriptions-item label="封面">
          {{ currentRow?.cover }}
        </el-descriptions-item>
        <el-descriptions-item label="内容类型">
          {{ currentRow?.contentType }}
        </el-descriptions-item>
        <el-descriptions-item label="来源应用ID">
          {{ currentRow?.sourceApplicationId }}
        </el-descriptions-item>
        <el-descriptions-item label="来源追踪ID">
          {{ currentRow?.sourceTraceId }}
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

    <!-- Markdown 内容编辑弹窗 -->
    <el-dialog
      v-model="contentDialogVisible"
      :title="`编辑内容 - ${contentTargetArticle?.title || ''}`"
      fullscreen
      custom-class="content-editor-dialog"
      header-class="content-editor-dialog__header"
      body-class="content-editor-dialog__el-body"
      footer-class="content-editor-dialog__footer"
      @opened="handleContentDialogOpened"
      @closed="handleContentDialogClosed"
      destroy-on-close
    >
      <div class="content-editor-dialog__body">
        <MarkdownEditor
          v-if="contentEditorReady"
          :key="contentEditorKey"
          v-model:value="contentDraft"
          height="600px"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contentDialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="contentSaving" @click="handleSaveContent">保 存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 文章标签绑定抽屉 -->
    <el-drawer
      v-model="tagDrawerVisible"
      title="新增标签"
      direction="rtl"
      size="520px"
      destroy-on-close
    >
      <div class="article-tag-drawer">
        <el-alert
          :title="`当前文章：${tagTargetArticle?.title || ''}（ID: ${tagTargetArticle?.id ?? '-'}）`"
          type="info"
          :closable="false"
          style="margin-bottom: 12px"
        />
        <div class="article-tag-drawer__query">
          <el-input
            v-model="tagQueryName"
            placeholder="请输入标签名称"
            clearable
            style="width: 220px"
            @keyup.enter="loadTagOptions"
          />
          <el-button type="primary" @click="loadTagOptions">查询</el-button>
        </div>
        <el-table
          v-loading="tagLoading"
          :data="tagOptions"
          row-key="id"
          height="460"
          @selection-change="handleTagSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="标签ID" width="100" />
          <el-table-column prop="tagName" label="标签名称" min-width="180" />
        </el-table>
      </div>
      <template #footer>
        <div class="article-tag-drawer__footer">
          <el-button @click="tagDrawerVisible = false">取消</el-button>
          <el-button type="primary" :loading="tagSubmitLoading" @click="handleSubmitTags">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ArticleApi } from './api';
import type { Article, ArticlePayload, ArticleQuery } from './type';
import { ArticleTagRelationApi } from '@/views/article_tag_relation/api';
import { TagApi } from '@/views/tag/api';
import type { Tag } from '@/views/tag/type';
import { OrganApi } from '@/views/organ/api';
import { SpaceApi } from '@/views/space/api';
import { ArticleCategoryApi } from '@/views/article_category/api';
import { DictItemApi } from '@/views/dict/api';
import { Generator } from '@/shared/utils/random.util';
import type { PageSelectListDto } from '@platform/types/api.type';

import { SortableTable, TableColumn, SortManagerButton, QueryForm, type QueryFormData, OrganSelect, ApiSelect, DictSelect, DictText, MarkdownEditor, showErrorMessage } from '@/components';

const tableData = ref<Article[]>([]);

const fetchSpaces = async (params: { key?: string; value?: number }) => {
  if (params.value !== undefined && params.value !== null) {
    try {
      const item = await SpaceApi.getById(params.value);
      return item ? [item] : [];
    } catch {
      return [];
    }
  }
  const pageData = await SpaceApi.page({
    pageNum: 1,
    pageSize: 10,
    ...(params.key ? { spaceName: params.key } : {}),
  } as any);
  return pageData.records || [];
};

const fetchCategories = async (params: { key?: string; value?: number }) => {
  if (params.value !== undefined && params.value !== null) {
    try {
      const item = await ArticleCategoryApi.getById(params.value);
      return item ? [item] : [];
    } catch {
      return [];
    }
  }
  const pageData = await ArticleCategoryApi.page({
    pageNum: 1,
    pageSize: 10,
    ...(params.key ? { categoryName: params.key } : {}),
  } as any);
  return pageData.records || [];
};

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
  spaceId: null as number | null,
  categoryId: null as number | null,
  sourceApplicationId: '',
  sourceTraceId: '',
  title: '',
  summary: '',
  cover: '',
  contentType: 'MARKDOWN',
  author: '',
  status: 'DRAFT',
  publishTime: '',
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
const currentRow = ref<Article | null>(null);
const contentDialogVisible = ref(false);
const contentSaving = ref(false);
const contentTargetArticle = ref<Article | null>(null);
const contentDraft = ref('');
const contentEditorReady = ref(false);
const contentEditorKey = ref(0);
const tagDrawerVisible = ref(false);
const tagLoading = ref(false);
const tagSubmitLoading = ref(false);
const tagTargetArticle = ref<Article | null>(null);
const tagOptions = ref<Tag[]>([]);
const selectedTagIds = ref<number[]>([]);
const tagQueryName = ref('');

const editFormRef = ref<FormInstance | null>(null);

const editForm = reactive({
  id: 0,
  organId: null as number | null,
  spaceId: null as number | null,
  categoryId: null as number | null,
  sourceApplicationId: '',
  sourceTraceId: '',
  title: '',
  summary: '',
  cover: '',
  contentType: '',
  content: '',
  author: '',
  status: '',
  publishTime: '',
});

const editRules: FormRules = {
  organId: [{ required: true, message: '请选择机构', trigger: 'change' }],
  spaceId: [{ required: true, message: '请选择空间', trigger: 'change' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  contentType: [{ required: true, message: '内容类型固定为 MARKDOWN', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  status: [{ required: true, message: '状态固定为 DRAFT', trigger: 'blur' }],
};

const generateSourceTraceId = () => {
  return Generator.random();
};

const handleCreate = () => {
  isEdit.value = false;
  editForm.organId = null;
  editForm.spaceId = null;
  editForm.categoryId = null;
  editForm.sourceApplicationId = '';
  editForm.sourceTraceId = generateSourceTraceId();
  editForm.title = '';
  editForm.summary = '';
  editForm.cover = '';
  editForm.contentType = 'MARKDOWN';
  editForm.content = '';
  editForm.author = '';
  editForm.status = 'DRAFT';
  editForm.publishTime = '';
  editDialogVisible.value = true;
};

const handleEdit = (row: Article) => {
  isEdit.value = true;
  editForm.id = row.id;
  editForm.organId = row.organId ?? null;
  editForm.spaceId = row.spaceId ?? null;
  editForm.categoryId = row.categoryId ?? null;
  editForm.sourceApplicationId = row.sourceApplicationId === null ? '' : String(row.sourceApplicationId);
  editForm.sourceTraceId = row.sourceTraceId ?? '';
  editForm.title = row.title;
  editForm.summary = row.summary ?? '';
  editForm.cover = row.cover ?? '';
  editForm.contentType = row.contentType;
  editForm.content = row.content;
  editForm.author = row.author ?? '';
  editForm.status = row.status;
  editForm.publishTime = row.publishTime ?? '';
  editDialogVisible.value = true;
};

const handleView = (row: Article) => {
  currentRow.value = { ...row };
  detailDialogVisible.value = true;
};

const handleEditContent = async (row: Article) => {
  try {
    contentEditorReady.value = false;
    const detail = await ArticleApi.getById(row.id);
    contentTargetArticle.value = detail;
    contentDraft.value = detail.content ?? '';
    contentEditorKey.value += 1;
    contentDialogVisible.value = true;
  } catch (error: any) {
    showErrorMessage(error || '加载文章内容失败');
  }
};

const handleContentDialogOpened = () => {
  contentEditorReady.value = true;
};

const handleContentDialogClosed = () => {
  contentEditorReady.value = false;
};

const handleSaveContent = async () => {
  if (!contentTargetArticle.value?.id) {
    ElMessage.warning('未选择文章');
    return;
  }

  const payload: ArticlePayload = {
    id: contentTargetArticle.value.id,
    organId: contentTargetArticle.value.organId,
    spaceId: contentTargetArticle.value.spaceId,
    categoryId: contentTargetArticle.value.categoryId,
    sourceApplicationId: contentTargetArticle.value.sourceApplicationId,
    sourceTraceId: contentTargetArticle.value.sourceTraceId,
    title: contentTargetArticle.value.title,
    summary: contentTargetArticle.value.summary,
    cover: contentTargetArticle.value.cover,
    contentType: contentTargetArticle.value.contentType,
    content: contentDraft.value,
    author: contentTargetArticle.value.author,
    status: contentTargetArticle.value.status,
    publishTime: contentTargetArticle.value.publishTime,
  };

  contentSaving.value = true;
  try {
    await ArticleApi.save(payload);
    ElMessage.success('内容保存成功');
    contentDialogVisible.value = false;
    await loadData();
  } catch (error: any) {
    showErrorMessage(error || '内容保存失败');
  } finally {
    contentSaving.value = false;
  }
};

const handleOpenTagDrawer = async (row: Article) => {
  tagTargetArticle.value = { ...row };
  tagQueryName.value = '';
  selectedTagIds.value = [];
  tagDrawerVisible.value = true;
  await loadTagOptions();
};

const loadTagOptions = async () => {
  tagLoading.value = true;
  try {
    const pageData = await TagApi.page({
      pageNum: 1,
      pageSize: 200,
      ...(tagQueryName.value ? { tagName: tagQueryName.value } : {}),
    });
    tagOptions.value = pageData.records || [];
  } catch (error: any) {
    showErrorMessage(error || '加载标签列表失败');
    tagOptions.value = [];
  } finally {
    tagLoading.value = false;
  }
};

const handleTagSelectionChange = (rows: Tag[]) => {
  selectedTagIds.value = rows.map((item) => item.id);
};

const handleSubmitTags = async () => {
  const articleId = tagTargetArticle.value?.id;
  if (!articleId) {
    ElMessage.warning('未选择文章');
    return;
  }
  if (selectedTagIds.value.length === 0) {
    ElMessage.warning('请至少选择一个标签');
    return;
  }

  tagSubmitLoading.value = true;
  try {
    await ArticleTagRelationApi.batchAddTags({
      articleId,
      tagIds: selectedTagIds.value,
    });
    ElMessage.success('添加标签成功');
    tagDrawerVisible.value = false;
  } catch (error: any) {
    showErrorMessage(error || '添加标签失败');
  } finally {
    tagSubmitLoading.value = false;
  }
};

const handleDelete = (row: Article) => {
  ElMessageBox.confirm(`确认删除article「${row.id}」吗？`, '提示', {
    type: 'warning',
  })
    .then(async () => {
      try {
        await ArticleApi.remove(row.id);
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

  const payload: ArticlePayload = {
    organId: editForm.organId ?? undefined,
    spaceId: editForm.spaceId ?? undefined,
    categoryId: editForm.categoryId ?? undefined,
    sourceApplicationId: editForm.sourceApplicationId ? Number(editForm.sourceApplicationId) : null,
    sourceTraceId: editForm.sourceTraceId || null,
    title: editForm.title,
    summary: editForm.summary || null,
    cover: editForm.cover || null,
    contentType: editForm.contentType,
    content: editForm.content,
    author: editForm.author || null,
    status: editForm.status,
    publishTime: editForm.publishTime || null,
  };

  try {
    // 编辑模式下，将 id 添加到 payload 中
    if (isEdit.value) {
      payload.id = editForm.id;
    }
    await ArticleApi.save(payload);
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
    const spaceId = queryForm.spaceId ?? undefined;
    const categoryId = queryForm.categoryId ?? undefined;
    const sourceApplicationId = queryForm.sourceApplicationId ? Number(queryForm.sourceApplicationId) : undefined;

    // 构建查询条件（query 对象），包含基础查询参数和业务查询参数
    const query: ArticleQuery = {
      // 基础查询参数（BaseSelectListDto）- 使用 Object.fromEntries 过滤无效值
      ...Object.fromEntries(
        Object.entries(baseQueryForm).filter(
          ([_, v]) => v != null && (!Array.isArray(v) || v.length > 0)
        )
      ),
      // 业务查询字段
      ...(organId !== undefined ? { organId } : {}),
      ...(spaceId !== undefined ? { spaceId } : {}),
      ...(categoryId !== undefined ? { categoryId } : {}),
      ...(sourceApplicationId !== undefined ? { sourceApplicationId } : {}),
      ...(queryForm.sourceTraceId ? { sourceTraceId: queryForm.sourceTraceId } : {}),
      ...(queryForm.title ? { title: queryForm.title } : {}),
      ...(queryForm.summary ? { summary: queryForm.summary } : {}),
      ...(queryForm.cover ? { cover: queryForm.cover } : {}),
      contentType: 'MARKDOWN',
      ...(queryForm.author ? { author: queryForm.author } : {}),
      status: 'DRAFT',
      ...(queryForm.publishTime ? { publishTime: queryForm.publishTime } : {}),
    };
    
    // 检查 query 对象是否有有效值
    const hasQuery = Object.values(query).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
    
    // 构建查询参数，符合 ArticleQuery & PageSelectListDto 格式
    const params: ArticleQuery & PageSelectListDto = {
      // 分页参数
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      // 查询条件（直接展开，仅在有效时包含）
      ...(hasQuery ? query : {}),
    };
    
    const pageData = await ArticleApi.page(params);
    
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
  queryForm.spaceId = null;
  queryForm.categoryId = null;
  queryForm.sourceApplicationId = '';
  queryForm.sourceTraceId = '';
  queryForm.title = '';
  queryForm.summary = '';
  queryForm.cover = '';
  queryForm.contentType = 'MARKDOWN';
  queryForm.author = '';
  queryForm.status = 'DRAFT';
  queryForm.publishTime = '';
  
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
.article-page {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
}

.article-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 0;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 4px;
}

.article-page__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.article-page__header h2 {
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

.article-page__search {
  margin-bottom: 12px;
  background-color: #fff;
}

.article-page__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.article-tag-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-tag-drawer__query {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.article-tag-drawer__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.content-editor-dialog__body {
  flex: 1;
  min-height: 0;  /* ⚠️ 必须有 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:global(.content-editor-dialog) {
  --el-dialog-padding-primary: 0;
  display: flex;
  flex-direction: column;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}

:global(.content-editor-dialog__header) {
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;
}

:global(.content-editor-dialog__footer) {
  flex-shrink: 0;
  padding: 16px;
  margin-top: 0 !important;
  box-sizing: border-box;
}

:global(.content-editor-dialog__el-body) {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

