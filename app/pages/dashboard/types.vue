<template>
  <div class="space-y-6">
    <!-- Header -->
    <SectionHeader
      title="Property Types"
      description="Kelola tipe-tipe properti yang tersedia di sistem"
      icon="lucide:layers"
      :badge="loading ? undefined : `${propertyTypes.length} tipe`"
      :loading="loading"
      :stats="
        !loading && propertyTypes.length > 0
          ? [
              { value: activeCount, label: 'aktif', color: 'bg-primary' },
              {
                value: inactiveCount,
                label: 'tidak aktif',
                color: 'bg-muted-foreground',
              },
            ]
          : []
      "
    >
      <template #actions>
        <Button @click="openCreateDialog" class="w-full lg:w-auto">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Tambah Tipe
        </Button>
      </template>
    </SectionHeader>

    <!-- Table Card -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableHead class="font-semibold text-foreground">Nama</TableHead>
              <TableHead class="font-semibold text-foreground"
                >Properties ID</TableHead
              >
              <TableHead class="font-semibold text-foreground"
                >Status</TableHead
              >
              <TableHead class="text-right font-semibold text-foreground"
                >Aksi</TableHead
              >
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="i in 4" :key="i" class="hover:bg-transparent">
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-6 w-20" />
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-1">
                    <Skeleton class="h-8 w-8 rounded-md" />
                    <Skeleton class="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            </template>
            <TableRow
              v-else-if="propertyTypes.length === 0"
              class="hover:bg-transparent"
            >
              <TableCell colspan="4" class="text-center py-12">
                <div class="flex flex-col items-center justify-center gap-2">
                  <Icon
                    name="lucide:inbox"
                    class="h-10 w-10 text-muted-foreground/50"
                  />
                  <p class="text-sm font-medium text-muted-foreground">
                    Tidak ada data
                  </p>
                  <p class="text-xs text-muted-foreground/80">
                    Klik "Tambah Tipe" untuk menambahkan data baru
                  </p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              v-else
              v-for="item in propertyTypes"
              :key="item.id"
              class="transition-colors hover:bg-muted/50"
            >
              <TableCell class="font-medium text-foreground">{{
                item.name
              }}</TableCell>
              <TableCell class="text-muted-foreground font-mono text-sm">{{
                item.propertiesId || "-"
              }}</TableCell>
              <TableCell>
                <Badge
                  :variant="item.isActive ? 'default' : 'secondary'"
                  :class="
                    item.isActive
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : ''
                  "
                >
                  <Icon
                    :name="
                      item.isActive
                        ? 'lucide:check-circle-2'
                        : 'lucide:x-circle'
                    "
                    class="mr-1.5 h-3 w-3"
                  />
                  {{ item.isActive ? "Aktif" : "Tidak Aktif" }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                    @click="openEditDialog(item)"
                  >
                    <Icon name="lucide:pencil" class="h-4 w-4" />
                    <span class="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    @click="openDeleteModal(item)"
                  >
                    <Icon name="lucide:trash-2" class="h-4 w-4" />
                    <span class="sr-only">Hapus</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <TypesDeleteModal
      v-model="isDeleteModalOpen"
      :delete-target="deleteTarget"
      :deleting="deleting"
      @confirm="handleConfirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Create/Edit Form Modal -->
    <TypesModal
      v-model="isDialogOpen"
      :form="form"
      :errors="errors"
      :editing-item="editingItem"
      :submitting="submitting"
      @submit="handleSubmit"
      @close="closeDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePropertyTypesState } from "@/services/useStateProperties";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import TypesModal from "@/components/dashboard/types/TypesModal.vue";
import TypesDeleteModal from "@/components/dashboard/types/TypesDeleteModal.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

const {
  propertyTypes,
  loading,
  isDialogOpen,
  editingItem,
  submitting,
  form,
  errors,
  fetchPropertyTypes,
  openCreateDialog,
  openEditDialog,
  closeDialog,
  handleSubmit,
  isDeleteModalOpen,
  deleteTarget,
  deleting,
  openDeleteModal,
  closeDeleteModal,
  handleConfirmDelete,
  activeCount,
  inactiveCount,
} = usePropertyTypesState();

onMounted(() => {
  fetchPropertyTypes();
});
</script>
