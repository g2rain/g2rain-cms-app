<template>
  <div class="markdown-editor-wrapper">
    <Editor
      :value="value"
      :plugins="plugins"
      :placeholder="placeholder"
      :locale="zh"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Editor, Viewer } from '@bytemd/vue-next';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import zh from 'bytemd/locales/zh_Hans.json';

// 引入基础样式
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs2015.css'; // 代码高亮主题

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '开始写作...',
  },
  height: {
    type: String,
    default: '500px',
  }
});

const emit = defineEmits(['update:value', 'change']);

const plugins = [
  gfm(),
  highlight(),
  // 在此处根据需要添加更多插件
];

const handleChange = (v) => {
  emit('update:value', v);
  emit('change', v);
};
</script>

<style scoped>
.markdown-editor-wrapper {
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  overflow: hidden;
}

/* 关键：强制修改 ByteMD 内部高度并开启滚动 */
:deep(.bytemd) {
  height: v-bind('props.height'); /* 动态绑定高度 */
}

/* 美化 ByteMD 内部滚动条 */
:deep(.bytemd-editor .CodeMirror-vscrollbar),
:deep(.bytemd-preview),
:deep(.bytemd-sidebar) {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
}
</style>