<script setup lang="ts">
import type { Row } from "@tanstack/vue-table"
import type { z } from "zod"
import type { schema } from "./DataTable.vue"
import { FlexRender } from "@tanstack/vue-table"
import { useSortable } from "@dnd-kit-vue/sortable"
import {
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { type ComponentPublicInstance, computed, provide } from "vue"

const props = defineProps<{ row: Row<z.infer<typeof schema>>, index: number }>()

const { setNodeRef, isDragging, setActivatorNodeRef } = useSortable({
  id: computed(() => props.row.original.id),
})

provide('sortableActivatorRef', setActivatorNodeRef)

function rowRef(el: Element | ComponentPublicInstance | null) {
  const node = el && typeof (el as any).$el !== 'undefined' ? (el as any).$el : el
  if (node instanceof HTMLElement) setNodeRef(node)
}
</script>

<template>
  <TableRow :ref="rowRef" :data-state="row.getIsSelected() && 'selected'" :data-dragging="isDragging"
    class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80">
    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
    </TableCell>
  </TableRow>
</template>