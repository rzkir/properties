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

    <!-- Properties Cards -->
    <div>
      <template v-if="loading">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card v-for="i in 4" :key="i" class="overflow-hidden">
            <div class="w-full bg-muted aspect-video">
              <Skeleton class="h-full w-full" />
            </div>
            <div class="px-6 space-y-3">
              <Skeleton class="h-5 w-3/4" />
              <Skeleton class="h-4 w-1/2" />
              <Skeleton class="h-4 w-1/3" />
              <Skeleton class="h-5 w-2/3" />
              <Skeleton class="h-4 w-1/2" />
              <div class="flex items-center justify-end gap-2 pt-2">
                <Skeleton class="h-8 w-8 rounded-md" />
                <Skeleton class="h-8 w-8 rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      </template>

      <template v-else-if="properties.length === 0">
        <Card class="flex items-center justify-center">
          <div
            class="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center"
          >
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
        </Card>
      </template>

      <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          v-for="item in properties"
          :key="item.id"
          class="cursor-pointer overflow-hidden p-0"
          @click="navigateToEdit(item.id)"
        >
          <!-- Thumbnail -->
          <div class="w-full bg-muted aspect-video">
            <img
              v-if="item.thumbnailUrl"
              :src="item.thumbnailUrl"
              :alt="item.title"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
            >
              Tidak ada thumbnail
            </div>
          </div>

          <div class="flex h-full flex-col gap-3 px-6 pb-4">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-foreground line-clamp-2">
                {{ item.title }}
              </h3>
              <Badge
                v-if="item.location && item.location.name"
                variant="secondary"
                class="text-[10px] whitespace-nowrap"
              >
                {{ item.location.name }}
              </Badge>
              <span
                v-else
                class="text-[10px] text-muted-foreground/60 whitespace-nowrap"
              >
                -
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge
                v-if="item.type && item.type.name"
                variant="outline"
                class="text-[10px]"
              >
                {{ item.type.name }}
              </Badge>
              <span v-else class="text-[10px] text-muted-foreground/60">
                Tipe tidak ada
              </span>
            </div>

            <div class="text-sm text-muted-foreground">
              {{ item.bedrooms }} KT / {{ item.bathrooms }} KM
            </div>

            <div class="mt-auto flex items-center justify-between pt-2">
              <div class="font-semibold text-foreground">
                {{ item.price }}
              </div>
              <div class="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                  @click.stop="navigateToEdit(item.id)"
                >
                  <Icon name="lucide:pencil" class="h-4 w-4" />
                  <span class="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  @click.stop="openDeleteModal(item)"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4" />
                  <span class="sr-only">Hapus</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <Dialog
      :open="isDeleteModalOpen"
      @update:open="(val) => !val && closeDeleteModal()"
    >
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Property</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus property "{{
              deleteTarget?.title
            }}"? Tindakan ini tidak dapat dibatalkan.
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
import Card from "@/components/ui/card/Card.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
