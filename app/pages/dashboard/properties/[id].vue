<template>
  <div class="space-y-6">
    <!-- Header -->
    <SectionHeader
      :title="isEdit ? 'Edit Property' : 'Tambah Property'"
      :description="
        isEdit ? 'Ubah informasi property' : 'Tambahkan property baru'
      "
      icon="lucide:building-2"
    >
      <template #actions>
        <Button variant="outline" @click="goBack">
          <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </template>
    </SectionHeader>

    <!-- Form Card -->
    <div
      class="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Title -->
          <div class="space-y-2">
            <Label for="title" class="text-sm font-medium text-foreground">
              Judul <span class="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              v-model="form.title"
              placeholder="Contoh: Griya Al-Fatih Residence"
              class="h-10"
              required
            />
            <p v-if="errors.title" class="text-xs text-destructive mt-1.5">
              {{ errors.title }}
            </p>
          </div>

          <!-- Slug -->
          <div class="space-y-2">
            <Label for="slug" class="text-sm font-medium text-foreground">
              Slug
            </Label>
            <Input
              id="slug"
              v-model="form.slug"
              placeholder="Auto-generate dari judul"
              class="h-10"
              readonly
              :class="'bg-muted cursor-not-allowed'"
            />
            <p class="text-xs text-muted-foreground mt-1.5">
              Slug akan otomatis di-generate dari judul
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <!-- Status -->
          <div class="space-y-2 w-full">
            <Label for="status" class="text-sm font-medium text-foreground">
              Status <span class="text-destructive">*</span>
            </Label>
            <Select
              class="w-full"
              :model-value="form.status || 'draft'"
              @update:model-value="
                (value) =>
                  (form.status = value as 'draft' | 'published' | 'archived')
              "
            >
              <SelectTrigger id="status" class="h-10 w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <p class="text-xs text-muted-foreground mt-1.5">
              Draft: Belum dipublikasikan | Published: Sudah dipublikasikan |
              Archived: Diarsipkan
            </p>
          </div>

          <!-- Location (Single select) -->
          <div class="space-y-2 w-full">
            <Label for="location" class="text-sm font-medium text-foreground">
              Lokasi <span class="text-destructive">*</span>
            </Label>
            <Select
              class="w-full"
              :model-value="form.location?.locationsId || ''"
              @update:model-value="handleLocationChange"
            >
              <SelectTrigger id="location" class="h-10 w-full">
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <div
                  v-if="locations.length === 0"
                  class="px-2 py-1.5 text-sm text-muted-foreground"
                >
                  Tidak ada lokasi tersedia
                </div>
                <SelectItem
                  v-for="loc in locations"
                  :key="loc.id"
                  :value="loc.locationsId || loc.id"
                >
                  {{ loc.name }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.location" class="text-xs text-destructive mt-1.5">
              {{ errors.location }}
            </p>
          </div>

          <!-- Type (Single select) -->
          <div class="space-y-2 w-full">
            <Label for="type" class="text-sm font-medium text-foreground">
              Tipe <span class="text-destructive">*</span>
            </Label>
            <Select
              class="w-full"
              :model-value="form.type?.propertiesTypeId || ''"
              @update:model-value="handleTypeChange"
            >
              <SelectTrigger id="type" class="h-10 w-full">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <div
                  v-if="propertyTypes.length === 0"
                  class="px-2 py-1.5 text-sm text-muted-foreground"
                >
                  Tidak ada tipe tersedia
                </div>
                <SelectItem
                  v-for="type in propertyTypes"
                  :key="type.id"
                  :value="type.propertiesTypeId || type.id"
                >
                  {{ type.name }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.type" class="text-xs text-destructive mt-1.5">
              {{ errors.type }}
            </p>
          </div>
        </div>

        <!-- Bedrooms, Bathrooms, Area -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <Label for="bedrooms" class="text-sm font-medium text-foreground">
              Kamar Tidur <span class="text-destructive">*</span>
            </Label>
            <Input
              id="bedrooms"
              v-model="form.bedrooms"
              placeholder="Contoh: 3 KT"
              class="h-10"
              required
            />
            <p v-if="errors.bedrooms" class="text-xs text-destructive mt-1.5">
              {{ errors.bedrooms }}
            </p>
          </div>
          <div class="space-y-2">
            <Label for="bathrooms" class="text-sm font-medium text-foreground">
              Kamar Mandi <span class="text-destructive">*</span>
            </Label>
            <Input
              id="bathrooms"
              v-model="form.bathrooms"
              placeholder="Contoh: 2 KM"
              class="h-10"
              required
            />
            <p v-if="errors.bathrooms" class="text-xs text-destructive mt-1.5">
              {{ errors.bathrooms }}
            </p>
          </div>
          <div class="space-y-2">
            <Label for="area" class="text-sm font-medium text-foreground">
              Luas <span class="text-destructive">*</span>
            </Label>
            <Input
              id="area"
              v-model="form.area"
              placeholder="Contoh: 90m²"
              class="h-10"
              required
            />
            <p v-if="errors.area" class="text-xs text-destructive mt-1.5">
              {{ errors.area }}
            </p>
          </div>
        </div>

        <!-- Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="price" class="text-sm font-medium text-foreground">
              Harga (Display) <span class="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              v-model="form.price"
              placeholder="Contoh: Rp 1,1 Milyar"
              class="h-10"
              required
            />
            <p v-if="errors.price" class="text-xs text-destructive mt-1.5">
              {{ errors.price }}
            </p>
          </div>
          <div class="space-y-2">
            <Label for="priceValue" class="text-sm font-medium text-foreground">
              Harga (Nilai dalam Juta) <span class="text-destructive">*</span>
            </Label>
            <Input
              id="priceValue"
              v-model.number="form.priceValue"
              type="number"
              placeholder="Contoh: 1100"
              class="h-10"
              required
              min="0"
            />
            <p v-if="errors.priceValue" class="text-xs text-destructive mt-1.5">
              {{ errors.priceValue }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Author (read-only, dari user login) -->
          <div class="space-y-2">
            <Label class="text-sm font-medium text-foreground">Author</Label>
            <div
              class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-3"
            >
              <img
                v-if="displayAuthor?.photoURL"
                :src="displayAuthor.photoURL"
                :alt="displayAuthor.displayName"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div
                v-else
                class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
              >
                <Icon name="lucide:user" class="h-5 w-5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground truncate">
                  {{ displayAuthor?.displayName || "—" }}
                </p>
                <p class="text-xs text-muted-foreground truncate">
                  {{ displayAuthor?.email || "—" }}
                </p>
                <p
                  v-if="displayAuthor?.phoneNumber"
                  class="text-xs text-muted-foreground truncate"
                >
                  {{ displayAuthor.phoneNumber }}
                </p>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">
              Author terisi otomatis berdasarkan akun yang login
            </p>
          </div>

          <!-- Badges (Multi-select) -->
          <div class="space-y-2">
            <Label class="text-sm font-medium text-foreground">Badges</Label>
            <div
              class="rounded-md border border-border bg-card p-4 space-y-2 max-h-48 overflow-y-auto"
            >
              <div
                v-if="badges.length === 0"
                class="text-sm text-muted-foreground"
              >
                Tidak ada badge tersedia. Tambahkan badge terlebih dahulu.
              </div>
              <div
                v-for="badge in badges"
                :key="badge.id"
                class="flex items-center space-x-3"
              >
                <Checkbox
                  :id="`badge-${badge.id}`"
                  :model-value="isBadgeSelected(badge.badgesId || badge.id)"
                  @update:model-value="
                    () => toggleBadge(badge.badgesId || badge.id)
                  "
                />
                <Label
                  :for="`badge-${badge.id}`"
                  class="cursor-pointer text-sm font-medium text-foreground leading-none"
                >
                  {{ badge.name }}
                </Label>
              </div>
            </div>
          </div>
        </div>

        <!-- Thumbnail URL -->
        <div class="space-y-3">
          <Label for="thumbnailUrl" class="text-sm font-medium text-foreground">
            Thumbnail <span class="text-destructive">*</span>
          </Label>

          <!-- Preview Card -->
          <div
            v-if="form.thumbnailUrl"
            class="relative group rounded-lg border-2 border-border bg-card overflow-hidden"
          >
            <div class="w-full h-64 bg-muted/30">
              <img
                :src="form.thumbnailUrl"
                alt="Thumbnail preview"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
            >
              <Button
                type="button"
                variant="secondary"
                size="sm"
                @click="uploadThumbnail"
                :disabled="uploadingThumbnail"
                class="backdrop-blur-sm"
              >
                <Icon
                  v-if="uploadingThumbnail"
                  name="lucide:loader-2"
                  class="mr-2 h-4 w-4 animate-spin"
                />
                <Icon v-else name="lucide:image" class="mr-2 h-4 w-4" />
                Ganti Gambar
              </Button>
            </div>
          </div>

          <!-- Upload Area (when no thumbnail) -->
          <div
            v-else
            class="relative rounded-lg border-2 border-dashed border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer group"
            @click="uploadThumbnail"
          >
            <div
              class="w-full h-64 flex flex-col items-center justify-center gap-3 p-6"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <Icon name="lucide:image-plus" class="h-6 w-6" />
              </div>
              <div class="text-center">
                <p class="text-sm font-medium text-foreground">
                  Klik untuk upload thumbnail
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  atau paste URL gambar di bawah
                </p>
              </div>
            </div>
          </div>

          <!-- URL Input and Upload Button -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <Input
                id="thumbnailUrl"
                v-model="form.thumbnailUrl"
                placeholder="https://example.com/image.jpg"
                type="url"
                class="h-10 flex-1"
                required
              />
              <Button
                type="button"
                variant="outline"
                @click="uploadThumbnail"
                :disabled="uploadingThumbnail"
                class="h-10"
              >
                <Icon
                  v-if="uploadingThumbnail"
                  name="lucide:loader-2"
                  class="h-4 w-4 animate-spin"
                />
                <Icon v-else name="lucide:upload" class="h-4 w-4" />
              </Button>
            </div>
            <input
              ref="thumbnailInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleThumbnailUpload"
            />
          </div>

          <p v-if="errors.thumbnailUrl" class="text-xs text-destructive mt-1">
            {{ errors.thumbnailUrl }}
          </p>
        </div>

        <!-- Image URLs (Multiple) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <Label class="text-sm font-medium text-foreground">
              Gambar Tambahan
            </Label>
            <span
              v-if="imageUrls.length > 0"
              class="text-xs text-muted-foreground"
            >
              {{ imageUrls.length }} gambar
            </span>
          </div>

          <!-- Images Grid -->
          <div
            v-if="imageUrls.length > 0"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            <div
              v-for="(url, index) in imageUrls"
              :key="index"
              class="group relative aspect-square rounded-lg border-2 border-border bg-muted/30 overflow-hidden hover:border-primary/50 transition-colors"
            >
              <img
                :src="url"
                :alt="`Image ${Number(index) + 1}`"
                class="h-full w-full object-cover"
              />
              <div
                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  class="h-8 w-8 p-0 shadow-lg"
                  @click="removeImage(Number(index))"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4" />
                </Button>
              </div>
              <div
                class="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-medium text-white backdrop-blur-sm"
              >
                {{ Number(index) + 1 }}
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center"
          >
            <Icon
              name="lucide:images"
              class="mx-auto h-12 w-12 text-muted-foreground mb-3"
            />
            <p class="text-sm font-medium text-foreground mb-1">
              Belum ada gambar tambahan
            </p>
            <p class="text-xs text-muted-foreground">
              Upload foto atau tambahkan URL gambar
            </p>
          </div>

          <!-- Add Image Action Select -->
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                class="w-fit h-10"
                @click="handleImageActionChange('url')"
              >
                <Icon name="lucide:link" class="mr-2 h-4 w-4" />
                Tambah URL
              </Button>
              <Button
                type="button"
                variant="outline"
                class="w-fit h-10"
                :disabled="uploadingImage"
                @click="handleImageActionChange('upload')"
              >
                <Icon
                  v-if="uploadingImage"
                  name="lucide:loader-2"
                  class="mr-2 h-4 w-4 animate-spin"
                />
                <Icon v-else name="lucide:upload" class="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>

            <!-- URL Input Fields (shown when action is url) -->
            <div v-if="imageAction === 'url'" class="space-y-2">
              <div class="flex items-center justify-between mb-2">
                <p class="text-sm text-muted-foreground">Masukkan URL gambar</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  @click="closeImageUrlSection"
                  class="h-8"
                >
                  <Icon name="lucide:x" class="h-4 w-4" />
                </Button>
              </div>
              <div
                v-for="(input, index) in imageUrlInputs"
                :key="input.id"
                class="flex gap-2"
              >
                <Input
                  :id="`imageUrlInput-${input.id}`"
                  v-model="input.value"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  class="h-10 flex-1"
                  @blur="handleImageUrlBlur(index)"
                  @keydown.enter="handleImageUrlBlur(index)"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  @click="removeImageUrlInput(index)"
                  class="h-10 w-10"
                >
                  <Icon name="lucide:x" class="h-4 w-4" />
                </Button>
              </div>

              <!-- Add URL Input Button -->
              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="addImageUrlInput"
                class="w-full"
              >
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                Tambah URL Lagi
              </Button>
            </div>

            <!-- Upload File Input (hidden) -->
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleImageUpload"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-2">
          <Label for="content" class="text-sm font-medium text-foreground">
            Konten <span class="text-destructive">*</span>
          </Label>
          <QuilEditor
            v-model="form.content"
            placeholder="Deskripsi lengkap property..."
          />
          <p v-if="errors.content" class="text-xs text-destructive mt-1.5">
            {{ errors.content }}
          </p>
        </div>

        <!-- Actions -->
        <div
          class="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end"
        >
          <Button
            type="button"
            variant="outline"
            @click="goBack"
            :disabled="submitting"
            class="sm:w-auto"
          >
            Batal
          </Button>
          <Button type="submit" :disabled="submitting" class="sm:w-auto">
            <Icon
              v-if="submitting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ isEdit ? "Simpan Perubahan" : "Tambah Property" }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePropertyFormState } from "@/services/useStateProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuilEditor from "@/components/QuilEditor.vue";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";

const {
  isEdit,
  goBack,
  form,
  errors,
  submitting,
  propertyTypes,
  locations,
  badges,
  displayAuthor,
  thumbnailInput,
  imageInput,
  uploadingThumbnail,
  uploadingImage,
  imageUrlInputs,
  imageAction,
  imageUrls,
  loadPropertyData,
  handleSubmit,
  handleLocationChange,
  handleTypeChange,
  isBadgeSelected,
  toggleBadge,
  uploadThumbnail,
  handleThumbnailUpload,
  handleImageUpload,
  removeImage,
  handleImageActionChange,
  closeImageUrlSection,
  addImageUrlInput,
  removeImageUrlInput,
  handleImageUrlBlur,
} = usePropertyFormState();

onMounted(() => {
  loadPropertyData();
});
</script>
