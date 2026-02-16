<script setup lang="ts">
import type { ComponentPublicInstance } from "vue"
import { IconGripVertical } from "@tabler/icons-vue"
import { inject } from "vue"
import { Button } from '@/components/ui/button'

const setActivatorNodeRef = inject<((el: HTMLElement | null) => void) | null>('sortableActivatorRef', null)
const buttonRef = (el: Element | ComponentPublicInstance | null) => {
  if (setActivatorNodeRef) {
    const node = el instanceof HTMLElement ? el : (el as ComponentPublicInstance)?.$el ?? null
    setActivatorNodeRef(node instanceof HTMLElement ? node : null)
  }
}
</script>

<template>
  <Button :ref="buttonRef" variant="ghost" size="icon"
    class="text-muted-foreground size-7 hover:bg-transparent">
    <IconGripVertical class="text-muted-foreground size-3" />
    <span class="sr-only">Drag to reorder</span>
  </Button>
</template>
