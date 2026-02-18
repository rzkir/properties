<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Property Types</h1>
        <p class="text-muted-foreground mt-1">
          Kelola tipe-tipe properti yang tersedia
        </p>
      </div>
      <Button @click="openCreateDialog">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Tambah Tipe
      </Button>
    </div>

    <!-- Table -->
    <div class="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Properties ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading">
            <TableCell colspan="4" class="text-center py-8">
              <div class="flex items-center justify-center gap-2">
                <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                <span>Memuat data...</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-else-if="propertyTypes.length === 0">
            <TableCell colspan="4" class="text-center py-8 text-muted-foreground">
              Tidak ada data
            </TableCell>
          </TableRow>
          <TableRow v-else v-for="item in propertyTypes" :key="item.id">
            <TableCell class="font-medium">{{ item.name }}</TableCell>
            <TableCell>{{ item.propertiesId || "-" }}</TableCell>
            <TableCell>
              <Badge :variant="item.isActive ? 'default' : 'secondary'">
                {{ item.isActive ? "Aktif" : "Tidak Aktif" }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="openEditDialog(item)"
                >
                  <Icon name="lucide:pencil" class="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="confirmDelete(item)"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Create/Edit Form Sheet -->
    <Sheet v-model:open="isDialogOpen">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {{ editingItem ? "Edit Property Type" : "Tambah Property Type" }}
          </SheetTitle>
          <SheetDescription>
            {{ editingItem ? "Ubah informasi property type" : "Tambahkan property type baru" }}
          </SheetDescription>
        </SheetHeader>

        <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
          <div class="space-y-2">
            <Label for="name">Nama <span class="text-destructive">*</span></Label>
            <Input
              id="name"
              v-model="form.name"
              placeholder="Contoh: Rumah, Apartemen, Tanah"
              required
            />
            <p v-if="errors.name" class="text-sm text-destructive">
              {{ errors.name }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="propertiesId">Properties ID</Label>
            <Input
              id="propertiesId"
              v-model="form.propertiesId"
              placeholder="Akan terisi otomatis dari nama"
              readonly
              class="bg-muted cursor-not-allowed"
            />
            <p v-if="errors.propertiesId" class="text-sm text-destructive">
              {{ errors.propertiesId }}
            </p>
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              v-model:checked="form.isActive"
            />
            <Label for="isActive" class="cursor-pointer">
              Aktif
            </Label>
          </div>

          <div class="flex gap-2 pt-4">
            <Button type="submit" :disabled="submitting" class="flex-1">
              <Icon
                v-if="submitting"
                name="lucide:loader-2"
                class="mr-2 h-4 w-4 animate-spin"
              />
              {{ editingItem ? "Simpan Perubahan" : "Tambah" }}
            </Button>
            <Button
              type="button"
              variant="outline"
              @click="closeDialog"
              :disabled="submitting"
            >
              Batal
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCrudService } from "@/lib/crudServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface PropertyType {
  id: string;
  name: string;
  propertiesId?: string;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

// Generate propertiesId from name (slug format)
function generatePropertiesId(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dash
    .replace(/-+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}

// Setup CRUD service
const crud = useCrudService<PropertyType>({
  endpoint: "/properties-type",
  defaultForm: {
    name: "",
    propertiesId: "",
    isActive: true,
  },
  validate: (form) => {
    const errors: Record<string, string> = {};
    if (!form.name?.toString().trim()) {
      errors.name = "Nama wajib diisi";
    } else if (form.name.toString().length > 100) {
      errors.name = "Nama maksimal 100 karakter";
    }
    return errors;
  },
  transformForm: (form) => {
    return {
      name: form.name?.toString().trim(),
      propertiesId: form.propertiesId?.toString().trim() || undefined,
      isActive: form.isActive,
    };
  },
  autoGenerate: {
    propertiesId: {
      from: "name",
      generator: generatePropertiesId,
      onlyOnCreate: true,
    },
  },
  messages: {
    fetch: "Gagal memuat data property types",
    create: "Property type berhasil ditambahkan",
    update: "Property type berhasil diperbarui",
    delete: "Property type berhasil dihapus",
    fetchError: "Gagal memuat data property types",
    createError: "Gagal menambahkan property type",
    updateError: "Gagal memperbarui property type",
    deleteError: "Gagal menghapus property type",
  },
  deleteConfirmMessage: (item) => `Apakah Anda yakin ingin menghapus "${item.name}"?`,
});

// Use crud service directly (don't destructure refs to maintain reactivity)
const propertyTypes = crud.items;
const loading = crud.loading;
const isDialogOpen = crud.isDialogOpen;
const editingItem = crud.editingItem;
const submitting = crud.submitting;
const form = crud.form;
const errors = crud.errors;
const fetchPropertyTypes = crud.fetch;
const openCreateDialog = crud.openCreateDialog;
const openEditDialog = crud.openEditDialog;
const closeDialog = crud.closeDialog;
const handleSubmit = crud.handleSubmit;
const confirmDelete = crud.confirmDelete;

onMounted(() => {
  fetchPropertyTypes();
});
</script>
