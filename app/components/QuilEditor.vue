<template>
  <div class="space-y-2">
    <div
      ref="editorRef"
      class="min-h-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  modelValue: string;
  placeholder?: string;
  readOnly?: boolean;
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Tulis deskripsi lengkap property...",
  readOnly: false,
  theme: "snow",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
  focus: [];
}>();

const editorRef = ref<HTMLDivElement | null>(null);
let quill: Quill | null = null;
let isSettingFromParent = false;

onMounted(() => {
  if (!editorRef.value) return;

  quill = new Quill(editorRef.value, {
    theme: props.theme,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
  });

  // Set initial content
  if (props.modelValue) {
    quill.clipboard.dangerouslyPasteHTML(props.modelValue);
  }

  quill.on("text-change", () => {
    if (!quill) return;
    if (isSettingFromParent) return;

    const html = quill.root.innerHTML;
    emit("update:modelValue", html === "<p><br></p>" ? "" : html);
  });

  quill.on("selection-change", (range) => {
    if (range == null) {
      emit("blur");
    } else {
      emit("focus");
    }
  });
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!quill) return;
    const currentHtml = quill.root.innerHTML;
    if (newValue === currentHtml || (!newValue && currentHtml === "<p><br></p>")) {
      return;
    }

    isSettingFromParent = true;
    const sel = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(newValue || "");
    if (sel) {
      quill.setSelection(sel);
    }
    isSettingFromParent = false;
  }
);

watch(
  () => props.readOnly,
  (value) => {
    if (!quill) return;
    quill.enable(!value);
  }
);

onBeforeUnmount(() => {
  quill = null;
});
</script>

<style scoped>
/* Quill injects DOM outside template - use :deep() to style it */
/* Warna disinkronkan dengan tema (--background, --foreground, dll dari main.css) */
:deep(.ql-container) {
  border: none !important;
  font-size: 0.875rem;
}

:deep(.ql-toolbar) {
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  padding: 0.25rem 0.25rem 0.5rem 0.25rem;
  background: var(--background) !important;
}

:deep(.ql-editor) {
  min-height: 140px;
  padding: 0.5rem 0 0 0;
  background: var(--background) !important;
  color: var(--foreground) !important;
}

/* Toolbar icons mengikuti muted-foreground */
:deep(.ql-snow .ql-stroke) {
  stroke: var(--muted-foreground);
  opacity: 0.7;
}

:deep(.ql-snow .ql-fill) {
  fill: var(--muted-foreground);
  opacity: 0.7;
}

/* Placeholder & picker */
:deep(.ql-editor.ql-blank::before) {
  color: var(--muted-foreground);
}

:deep(.ql-snow .ql-picker) {
  color: var(--foreground);
}

/* Dropdown & active state ikuti tema */
:deep(.ql-snow .ql-picker-label:hover),
:deep(.ql-snow .ql-toolbar button:hover) {
  color: var(--primary);
}

:deep(.ql-snow .ql-toolbar button.ql-active) {
  color: var(--primary);
}

:deep(.ql-snow .ql-toolbar button.ql-active .ql-stroke),
:deep(.ql-snow .ql-toolbar button.ql-active .ql-fill) {
  stroke: var(--primary);
  fill: var(--primary);
  opacity: 1;
}
</style>