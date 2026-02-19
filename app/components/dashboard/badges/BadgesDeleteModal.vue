<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader class="space-y-3">
        <DialogTitle class="text-xl font-semibold text-foreground">
          Hapus Badge
        </DialogTitle>
        <DialogDescription class="text-sm text-muted-foreground">
          {{
            deleteTarget
              ? `Apakah Anda yakin ingin menghapus "${deleteTarget.name}"? Tindakan ini tidak dapat dibatalkan.`
              : ""
          }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          @click="handleCancel"
          :disabled="deleting"
          class="sm:w-auto text-muted-foreground"
        >
          Batal
        </Button>
        <Button
          type="button"
          variant="destructive"
          @click="handleConfirm"
          :disabled="deleting"
          class="sm:w-auto"
        >
          <Icon
            v-if="deleting"
            name="lucide:loader-2"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Hapus
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  modelValue: boolean;
  deleteTarget: PropertyBadge | null;
  deleting: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleConfirm() {
  emit("confirm");
}

function handleCancel() {
  emit("cancel");
  emit("update:modelValue", false);
}
</script>
