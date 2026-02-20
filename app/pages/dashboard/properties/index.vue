<template>
  <div class="space-y-6">
    <!-- Header -->
    <SectionHeader
      title="Properties"
      description="Kelola properti yang tersedia di sistem"
      icon="lucide:home"
      :badge="loading ? undefined : `${properties.length} properti`"
      :loading="loading"
    >
      <template #actions>
        <NuxtLink
          :to="{ name: 'dashboard-properties-id', params: { id: 'new' } }"
          class="inline-flex w-full lg:w-auto"
        >
          <Button class="w-full lg:w-auto" as="span">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
            Tambah Property
          </Button>
        </NuxtLink>
      </template>
    </SectionHeader>

    <!-- Table Card -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableHead class="font-semibold text-foreground">Judul</TableHead>
              <TableHead class="font-semibold text-foreground">Lokasi</TableHead>
              <TableHead class="font-semibold text-foreground">Tipe</TableHead>
              <TableHead class="font-semibold text-foreground">Harga</TableHead>
              <TableHead class="font-semibold text-foreground">Kamar</TableHead>
              <TableHead class="text-right font-semibold text-foreground">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="i in 4" :key="i" class="hover:bg-transparent">
                <TableCell>
                  <Skeleton class="h-5 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-20" />
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
              v-else-if="properties.length === 0"
              class="hover:bg-transparent"
            >
              <TableCell colspan="6" class="text-center py-12">
                <div class="flex flex-col items-center justify-center gap-2">
                  <Icon
                    name="lucide:inbox"
                    class="h-10 w-10 text-muted-foreground/50"
                  />
                  <p class="text-sm font-medium text-muted-foreground">
                    Tidak ada data
                  </p>
                  <p class="text-xs text-muted-foreground/80">
                    Klik "Tambah Property" untuk menambahkan data baru
                  </p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              v-else
              v-for="item in properties"
              :key="item.id"
              class="transition-colors hover:bg-muted/50"
            >
              <TableCell class="font-medium text-foreground">{{
                item.title
              }}</TableCell>
              <TableCell class="text-muted-foreground">
                <Badge
                  v-if="item.location && item.location.name"
                  variant="secondary"
                  class="text-xs"
                >
                  {{ item.location.name }}
                </Badge>
                <span v-else class="text-xs text-muted-foreground/60">-</span>
              </TableCell>
              <TableCell class="text-muted-foreground">
                <Badge
                  v-if="item.type && item.type.name"
                  variant="outline"
                  class="text-xs"
                >
                  {{ item.type.name }}
                </Badge>
                <span v-else class="text-xs text-muted-foreground/60">-</span>
              </TableCell>
              <TableCell class="font-medium text-foreground">{{
                item.price
              }}</TableCell>
              <TableCell class="text-muted-foreground text-sm">
                {{ item.bedrooms }} KT / {{ item.bathrooms }} KM
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                    @click="navigateToEdit(item.id)"
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
    <Dialog :open="isDeleteModalOpen" @update:open="(val) => !val && closeDeleteModal()">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Property</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus property "{{ deleteTarget?.title }}"?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="gap-2">
          <Button
            variant="outline"
            @click="closeDeleteModal"
            :disabled="deleting"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            @click="handleConfirmDelete"
            :disabled="deleting"
          >
            <Icon
              v-if="deleting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePropertiesState } from "@/services/useStateProperties";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

const router = useRouter();
const {
  properties,
  loading,
  fetchProperties,
  isDeleteModalOpen,
  deleteTarget,
  deleting,
  openDeleteModal,
  closeDeleteModal,
  handleConfirmDelete,
} = usePropertiesState();

function navigateToEdit(id: string) {
  router.push(`/dashboard/properties/${id}`);
}

onMounted(() => {
  fetchProperties();
});
</script>
