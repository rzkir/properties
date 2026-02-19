<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader class="space-y-3">
        <DialogTitle class="text-xl font-semibold text-muted-foreground">
          {{ editingItem ? "Edit Location" : "Tambah Location" }}
        </DialogTitle>
        <DialogDescription class="text-sm text-muted-foreground">
          {{
            editingItem
              ? "Ubah informasi location"
              : "Tambahkan location baru"
          }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="space-y-2">
          <Label for="name" class="text-sm font-medium text-foreground">
            Nama <span class="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            v-model="form.name"
            placeholder="Contoh: Jakarta, Bandung, Surabaya"
            class="h-10 text-muted-foreground"
            required
          />
          <p v-if="errors.name" class="text-xs text-destructive mt-1.5">
            {{ errors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="locationsId" class="text-sm font-medium text-foreground">
            Locations ID
          </Label>
          <Input
            id="locationsId"
            v-model="form.locationsId"
            placeholder="Akan terisi otomatis dari nama"
            readonly
            class="h-10 bg-muted font-mono text-sm cursor-not-allowed text-muted-foreground"
          />
          <p v-if="errors.locationsId" class="text-xs text-destructive mt-1.5">
            {{ errors.locationsId }}
          </p>
        </div>

        <div
          class="flex items-center space-x-3 rounded-md border p-4 bg-muted/30"
        >
          <Checkbox
            id="isActive"
            v-model:checked="form.isActive"
            class="border-foreground/20"
          />
          <Label
            for="isActive"
            class="cursor-pointer text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Aktif
          </Label>
        </div>

        <div
          class="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"
        >
          <Button
            type="button"
            variant="outline"
            @click="handleClose"
            :disabled="submitting"
            class="sm:w-auto text-muted-foreground"
          >
            Batal
          </Button>
          <Button type="submit" :disabled="submitting" class="sm:w-auto">
            <Icon
              v-if="submitting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ editingItem ? "Simpan Perubahan" : "Tambah" }}
          </Button>
        </div>
      </form>
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
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  modelValue: boolean;
  form: {
    name: string;
    locationsId?: string;
    isActive: boolean;
  };
  errors: Record<string, string>;
  editingItem: PropertyLocation | null;
  submitting: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit"): void;
  (e: "close"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleSubmit() {
  emit("submit");
}

function handleClose() {
  emit("close");
  emit("update:modelValue", false);
}
</script>
