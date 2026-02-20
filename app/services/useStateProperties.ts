import { reactive, computed, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { featuredProperties } from '~/lib/data';

import { useCrudService } from '@/lib/crudServices';

import { generatePropertiesId } from '@/lib/genrateProperties';

import { apiFetch, getApiSecret } from '@/lib/config';

import { useAuthContext } from '@/lib/AuthContext';

import { toast } from 'vue-sonner';

// ------------------------- Property Type (dashboard) ------------------------- //
const propertyTypesCrud = useCrudService<PropertyType>({
  endpoint: '/properties-type',
  defaultForm: {
    name: '',
    propertiesTypeId: '',
    isActive: true,
  },
  validate: (form) => {
    const errors: Record<string, string> = {};
    if (!form.name?.toString().trim()) {
      errors.name = 'Nama wajib diisi';
    } else if (form.name.toString().length > 100) {
      errors.name = 'Nama maksimal 100 karakter';
    }
    return errors;
  },
  transformForm: (form) => ({
    name: form.name?.toString().trim(),
    propertiesTypeId: form.propertiesTypeId?.toString().trim() || undefined,
    isActive: form.isActive,
  }),
  autoGenerate: {
    propertiesTypeId: {
      from: 'name',
      generator: generatePropertiesId,
      onlyOnCreate: true,
    },
  },
  messages: {
    fetch: 'Gagal memuat data property types',
    create: 'Property type berhasil ditambahkan',
    update: 'Property type berhasil diperbarui',
    delete: 'Property type berhasil dihapus',
    fetchError: 'Gagal memuat data property types',
    createError: 'Gagal menambahkan property type',
    updateError: 'Gagal memperbarui property type',
    deleteError: 'Gagal menghapus property type',
  },
  deleteConfirmMessage: (item) => `Apakah Anda yakin ingin menghapus "${item.name}"?`,
});

const isDeleteModalOpen = ref(false);
const deleteTarget = ref<PropertyType | null>(null);
const deleting = ref(false);

const propertyTypesActiveCount = computed(() =>
  propertyTypesCrud.items.value.filter((item) => item.isActive).length,
);
const propertyTypesInactiveCount = computed(() =>
  propertyTypesCrud.items.value.filter((item) => !item.isActive).length,
);

function openDeleteModal(item: PropertyType) {
  deleteTarget.value = item;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  if (!deleting.value) {
    isDeleteModalOpen.value = false;
    deleteTarget.value = null;
  }
}

async function handleConfirmDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await propertyTypesCrud.performDelete(deleteTarget.value);
    isDeleteModalOpen.value = false;
    deleteTarget.value = null;
  } finally {
    deleting.value = false;
  }
}

export function usePropertyTypesState() {
  return {
    // CRUD
    propertyTypes: propertyTypesCrud.items,
    loading: propertyTypesCrud.loading,
    isDialogOpen: propertyTypesCrud.isDialogOpen,
    editingItem: propertyTypesCrud.editingItem,
    submitting: propertyTypesCrud.submitting,
    form: propertyTypesCrud.form,
    errors: propertyTypesCrud.errors,
    fetchPropertyTypes: propertyTypesCrud.fetch,
    openCreateDialog: propertyTypesCrud.openCreateDialog,
    openEditDialog: propertyTypesCrud.openEditDialog,
    closeDialog: propertyTypesCrud.closeDialog,
    handleSubmit: propertyTypesCrud.handleSubmit,
    performDelete: propertyTypesCrud.performDelete,
    // Delete modal
    isDeleteModalOpen,
    deleteTarget,
    deleting,
    openDeleteModal,
    closeDeleteModal,
    handleConfirmDelete,
    // Stats
    activeCount: propertyTypesActiveCount,
    inactiveCount: propertyTypesInactiveCount,
  };
}

// ------------------------- Search / filters ------------------------- //

const filters = reactive({
  location: '',
  type: 'all' as string,
  price: 'all' as string,
});

const searchRoute = computed(() => {
  const query: Record<string, string> = {};
  if (filters.location.trim()) query.location = filters.location.trim();
  if (filters.type && filters.type !== 'all') query.type = filters.type;
  if (filters.price && filters.price !== 'all') query.price = filters.price;
  return { path: '/search', query };
});

const filteredProperties = computed(() => {
  const location = filters.location.trim().toLowerCase();
  const type = filters.type;
  const price = filters.price;

  return featuredProperties.filter((p) => {
    if (location) {
      const matchLocation =
        p.location.toLowerCase().includes(location) ||
        p.title.toLowerCase().includes(location);
      if (!matchLocation) return false;
    }
    if (type && type !== 'all' && p.type !== type) return false;
    if (price && price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      if (p.priceValue < min || p.priceValue > max) return false;
    }
    return true;
  });
});

function syncFiltersFromRoute(query: Record<string, unknown>) {
  const v = (key: string) => {
    const val = query[key];
    return Array.isArray(val) ? val[0] : val;
  };
  filters.location = (v('location') as string) ?? '';
  filters.type = (v('type') as string) ?? 'all';
  filters.price = (v('price') as string) ?? 'all';
}

function scrollToFilter() {
  document.querySelector('#filter-search')?.scrollIntoView({ behavior: 'smooth' });
}

// ------------------------- Location (dashboard) ------------------------- //
const locationsCrud = useCrudService<PropertyLocation>({
  endpoint: '/properties-location',
  defaultForm: {
    name: '',
    locationsId: '',
    isActive: true,
  },
  validate: (form) => {
    const errors: Record<string, string> = {};
    if (!form.name?.toString().trim()) {
      errors.name = 'Nama wajib diisi';
    } else if (form.name.toString().length > 100) {
      errors.name = 'Nama maksimal 100 karakter';
    }
    return errors;
  },
  transformForm: (form) => ({
    name: form.name?.toString().trim(),
    locationsId: form.locationsId?.toString().trim() || undefined,
    isActive: form.isActive,
  }),
  autoGenerate: {
    locationsId: {
      from: 'name',
      generator: generatePropertiesId,
      onlyOnCreate: true,
    },
  },
  messages: {
    fetch: 'Gagal memuat data locations',
    create: 'Location berhasil ditambahkan',
    update: 'Location berhasil diperbarui',
    delete: 'Location berhasil dihapus',
    fetchError: 'Gagal memuat data locations',
    createError: 'Gagal menambahkan location',
    updateError: 'Gagal memperbarui location',
    deleteError: 'Gagal menghapus location',
  },
  deleteConfirmMessage: (item) => `Apakah Anda yakin ingin menghapus "${item.name}"?`,
});

const locationsDeleteModalOpen = ref(false);
const locationsDeleteTarget = ref<PropertyLocation | null>(null);
const locationsDeleting = ref(false);

const locationsActiveCount = computed(() =>
  locationsCrud.items.value.filter((item) => item.isActive).length,
);
const locationsInactiveCount = computed(() =>
  locationsCrud.items.value.filter((item) => !item.isActive).length,
);

function openLocationsDeleteModal(item: PropertyLocation) {
  locationsDeleteTarget.value = item;
  locationsDeleteModalOpen.value = true;
}

function closeLocationsDeleteModal() {
  if (!locationsDeleting.value) {
    locationsDeleteModalOpen.value = false;
    locationsDeleteTarget.value = null;
  }
}

async function handleLocationsConfirmDelete() {
  if (!locationsDeleteTarget.value) return;
  locationsDeleting.value = true;
  try {
    await locationsCrud.performDelete(locationsDeleteTarget.value);
    locationsDeleteModalOpen.value = false;
    locationsDeleteTarget.value = null;
  } finally {
    locationsDeleting.value = false;
  }
}

export function useLocationsState() {
  return {
    // CRUD
    locations: locationsCrud.items,
    loading: locationsCrud.loading,
    isDialogOpen: locationsCrud.isDialogOpen,
    editingItem: locationsCrud.editingItem,
    submitting: locationsCrud.submitting,
    form: locationsCrud.form,
    errors: locationsCrud.errors,
    fetchLocations: locationsCrud.fetch,
    openCreateDialog: locationsCrud.openCreateDialog,
    openEditDialog: locationsCrud.openEditDialog,
    closeDialog: locationsCrud.closeDialog,
    handleSubmit: locationsCrud.handleSubmit,
    performDelete: locationsCrud.performDelete,
    // Delete modal
    isDeleteModalOpen: locationsDeleteModalOpen,
    deleteTarget: locationsDeleteTarget,
    deleting: locationsDeleting,
    openDeleteModal: openLocationsDeleteModal,
    closeDeleteModal: closeLocationsDeleteModal,
    handleConfirmDelete: handleLocationsConfirmDelete,
    // Stats
    activeCount: locationsActiveCount,
    inactiveCount: locationsInactiveCount,
  };
}

// ------------------------- Badges (dashboard) ------------------------- //
const badgesCrud = useCrudService<PropertyBadge>({
  endpoint: '/properties-badge',
  defaultForm: {
    name: '',
    badgesId: '',
    isActive: true,
  },
  validate: (form) => {
    const errors: Record<string, string> = {};
    if (!form.name?.toString().trim()) {
      errors.name = 'Nama wajib diisi';
    } else if (form.name.toString().length > 100) {
      errors.name = 'Nama maksimal 100 karakter';
    }
    return errors;
  },
  transformForm: (form) => ({
    name: form.name?.toString().trim(),
    badgesId: form.badgesId?.toString().trim() || undefined,
    isActive: form.isActive,
  }),
  autoGenerate: {
    badgesId: {
      from: 'name',
      generator: generatePropertiesId,
      onlyOnCreate: true,
    },
  },
  messages: {
    fetch: 'Gagal memuat data badges',
    create: 'Badge berhasil ditambahkan',
    update: 'Badge berhasil diperbarui',
    delete: 'Badge berhasil dihapus',
    fetchError: 'Gagal memuat data badges',
    createError: 'Gagal menambahkan badge',
    updateError: 'Gagal memperbarui badge',
    deleteError: 'Gagal menghapus badge',
  },
  deleteConfirmMessage: (item) => `Apakah Anda yakin ingin menghapus "${item.name}"?`,
});

const badgesDeleteModalOpen = ref(false);
const badgesDeleteTarget = ref<PropertyBadge | null>(null);
const badgesDeleting = ref(false);

const badgesActiveCount = computed(() =>
  badgesCrud.items.value.filter((item) => item.isActive).length,
);
const badgesInactiveCount = computed(() =>
  badgesCrud.items.value.filter((item) => !item.isActive).length,
);

function openBadgesDeleteModal(item: PropertyBadge) {
  badgesDeleteTarget.value = item;
  badgesDeleteModalOpen.value = true;
}

function closeBadgesDeleteModal() {
  if (!badgesDeleting.value) {
    badgesDeleteModalOpen.value = false;
    badgesDeleteTarget.value = null;
  }
}

async function handleBadgesConfirmDelete() {
  if (!badgesDeleteTarget.value) return;
  badgesDeleting.value = true;
  try {
    await badgesCrud.performDelete(badgesDeleteTarget.value);
    badgesDeleteModalOpen.value = false;
    badgesDeleteTarget.value = null;
  } finally {
    badgesDeleting.value = false;
  }
}

export function useBadgesState() {
  return {
    // CRUD
    badges: badgesCrud.items,
    loading: badgesCrud.loading,
    isDialogOpen: badgesCrud.isDialogOpen,
    editingItem: badgesCrud.editingItem,
    submitting: badgesCrud.submitting,
    form: badgesCrud.form,
    errors: badgesCrud.errors,
    fetchBadges: badgesCrud.fetch,
    openCreateDialog: badgesCrud.openCreateDialog,
    openEditDialog: badgesCrud.openEditDialog,
    closeDialog: badgesCrud.closeDialog,
    handleSubmit: badgesCrud.handleSubmit,
    performDelete: badgesCrud.performDelete,
    // Delete modal
    isDeleteModalOpen: badgesDeleteModalOpen,
    deleteTarget: badgesDeleteTarget,
    deleting: badgesDeleting,
    openDeleteModal: openBadgesDeleteModal,
    closeDeleteModal: closeBadgesDeleteModal,
    handleConfirmDelete: handleBadgesConfirmDelete,
    // Stats
    activeCount: badgesActiveCount,
    inactiveCount: badgesInactiveCount,
  };
}

// ------------------------- Properties (dashboard) ------------------------- //
const propertiesCrud = useCrudService<Property>({
  endpoint: '/properties',
  defaultForm: {
    title: '',
    slug: '',
    location: null as PropertyLoc | null,
    type: null as PropertyType | null,
    badges: [],
    content: '',
    thumbnailUrl: '',
    imageUrl: [],
    bedrooms: '',
    bathrooms: '',
    area: '',
    price: '',
    priceValue: 0,
    status: 'draft' as 'draft' | 'published' | 'archived',
    author: null as Author | null,
  },
  validate: (form) => {
    const errors: Record<string, string> = {};
    if (!form.title?.toString().trim()) {
      errors.title = 'Judul wajib diisi';
    }
    if (!form.location || !form.location.locationsId) {
      errors.location = 'Lokasi wajib dipilih';
    }
    if (!form.type || !form.type.propertiesTypeId) {
      errors.type = 'Tipe wajib dipilih';
    }
    if (!form.content?.toString().trim()) {
      errors.content = 'Konten wajib diisi';
    }
    if (!form.thumbnailUrl?.toString().trim()) {
      errors.thumbnailUrl = 'Thumbnail wajib diisi';
    }
    if (!form.bedrooms?.toString().trim()) {
      errors.bedrooms = 'Jumlah kamar tidur wajib diisi';
    }
    if (!form.bathrooms?.toString().trim()) {
      errors.bathrooms = 'Jumlah kamar mandi wajib diisi';
    }
    if (!form.area?.toString().trim()) {
      errors.area = 'Luas wajib diisi';
    }
    if (!form.price?.toString().trim()) {
      errors.price = 'Harga wajib diisi';
    }
    if (!form.priceValue || form.priceValue <= 0) {
      errors.priceValue = 'Harga nilai wajib diisi dan lebih dari 0';
    }
    return errors;
  },
  transformForm: (form) => ({
    title: form.title?.toString().trim(),
    slug: form.slug?.toString().trim() || undefined,
    location: form.location || null,
    type: form.type || null,
    badges: Array.isArray(form.badges) ? form.badges : [],
    content: form.content?.toString().trim(),
    thumbnailUrl: form.thumbnailUrl?.toString().trim(),
    imageUrl: Array.isArray(form.imageUrl) ? form.imageUrl : [],
    bedrooms: form.bedrooms?.toString().trim(),
    bathrooms: form.bathrooms?.toString().trim(),
    area: form.area?.toString().trim(),
    price: form.price?.toString().trim(),
    priceValue: Number(form.priceValue) || 0,
    status: form.status || 'draft',
    author: form.author && typeof form.author === 'object' ? form.author : undefined,
  }),
  messages: {
    fetch: 'Gagal memuat data properties',
    create: 'Property berhasil ditambahkan',
    update: 'Property berhasil diperbarui',
    delete: 'Property berhasil dihapus',
    fetchError: 'Gagal memuat data properties',
    createError: 'Gagal menambahkan property',
    updateError: 'Gagal memperbarui property',
    deleteError: 'Gagal menghapus property',
  },
  deleteConfirmMessage: (item) => `Apakah Anda yakin ingin menghapus "${item.title}"?`,
});

const propertiesDeleteModalOpen = ref(false);
const propertiesDeleteTarget = ref<Property | null>(null);
const propertiesDeleting = ref(false);

// Pagination state for properties list
const propertiesListLoading = ref(false);
const propertiesPage = ref(1);
const propertiesNextPage = ref(false);
const propertiesPrevPage = ref(false);
const propertiesSearchQuery = ref('');
const PROPERTIES_PAGE_LIMIT = 10;

interface PropertiesListResponse {
  data: Property[];
  page: number;
  limit: number;
  nextPage: boolean;
  prevPage: boolean;
}

async function fetchPropertiesList(page = 1, search?: string) {
  propertiesListLoading.value = true;
  try {
    const searchTerm = search !== undefined ? search : propertiesSearchQuery.value;
    const trimmed = searchTerm.trim();

    let url: string;
    if (trimmed) {
      const params = new URLSearchParams({ q: trimmed, page: String(page) });
      url = `/properties/search?${params.toString()}`;
    } else {
      url = `/properties?page=${page}`;
    }

    const res = await apiFetch<PropertiesListResponse>(url);
    propertiesCrud.items.value = res.data ?? [];
    propertiesPage.value = res.page ?? 1;
    propertiesNextPage.value = res.nextPage ?? false;
    propertiesPrevPage.value = res.prevPage ?? false;
  } catch (error: any) {
    console.error('[FE] Fetch properties list error:', error);
    toast.error('Gagal memuat data properties');
  } finally {
    propertiesListLoading.value = false;
  }
}

function openPropertiesDeleteModal(item: Property) {
  propertiesDeleteTarget.value = item;
  propertiesDeleteModalOpen.value = true;
}

function closePropertiesDeleteModal() {
  if (!propertiesDeleting.value) {
    propertiesDeleteModalOpen.value = false;
    propertiesDeleteTarget.value = null;
  }
}

async function handlePropertiesConfirmDelete() {
  if (!propertiesDeleteTarget.value) return;
  propertiesDeleting.value = true;
  try {
    await apiFetch(`/properties/${propertiesDeleteTarget.value.id}`, {
      method: 'DELETE',
    });
    toast.success('Property berhasil dihapus');
    propertiesDeleteModalOpen.value = false;
    propertiesDeleteTarget.value = null;
    await fetchPropertiesList(propertiesPage.value);
  } catch (error: any) {
    console.error('[FE] Delete property error:', error);
    toast.error(error?.data?.message || 'Gagal menghapus property');
  } finally {
    propertiesDeleting.value = false;
  }
}

export function usePropertiesState() {
  return {
    // CRUD
    properties: propertiesCrud.items,
    loading: propertiesListLoading,
    form: propertiesCrud.form,
    errors: propertiesCrud.errors,
    submitting: propertiesCrud.submitting,
    fetchProperties: fetchPropertiesList,
    handleSubmit: propertiesCrud.handleSubmit,
    performDelete: propertiesCrud.performDelete,
    resetForm: propertiesCrud.resetForm,
    // Pagination
    page: propertiesPage,
    limit: ref(PROPERTIES_PAGE_LIMIT),
    nextPage: propertiesNextPage,
    prevPage: propertiesPrevPage,
    // Search
    searchQuery: propertiesSearchQuery,
    // Delete modal
    isDeleteModalOpen: propertiesDeleteModalOpen,
    deleteTarget: propertiesDeleteTarget,
    deleting: propertiesDeleting,
    openDeleteModal: openPropertiesDeleteModal,
    closeDeleteModal: closePropertiesDeleteModal,
    handleConfirmDelete: handlePropertiesConfirmDelete,
  };
}

export function useStateProperties() {
  return {
    filters,
    searchRoute,
    filteredProperties,
    syncFiltersFromRoute,
    scrollToFilter,
  };
}

// ------------------------- Property Form State (create/edit) ------------------------- //
interface ImageUrlInput {
  id: number;
  value: string;
}

export function usePropertyFormState() {
  const route = useRoute();
  const router = useRouter();
  const apiSecret = getApiSecret();

  const { form, errors, submitting, fetchProperties } = usePropertiesState();
  const { propertyTypes, fetchPropertyTypes } = usePropertyTypesState();
  const { locations, fetchLocations } = useLocationsState();
  const { badges, fetchBadges } = useBadgesState();
  const { user } = useAuthContext();

  function normalizeAuthor(
    sourceAuthor: Author | null | undefined,
    fallbackUser: any,
  ): Author | null {
    if (!sourceAuthor && !fallbackUser) {
      return null;
    }

    const authorPhone =
      (sourceAuthor?.phoneNumber &&
        sourceAuthor.phoneNumber.toString().trim()) ||
      (fallbackUser?.phoneNumber &&
        fallbackUser.phoneNumber.toString().trim()) ||
      '';

    return {
      displayName:
        sourceAuthor?.displayName ??
        fallbackUser?.displayName ??
        '',
      email: sourceAuthor?.email ?? fallbackUser?.email ?? '',
      phoneNumber: authorPhone,
      photoURL: sourceAuthor?.photoURL ?? fallbackUser?.photoURL ?? '',
    };
  }

  const isEdit = computed(() => route.params.id !== 'new');
  const propertyId = computed(() => (route.params.id as string) || '');

  // Author: edit mode = dari property, create mode = dari user login
  const displayAuthor = computed((): Author | null => {
    const u = user.value;
    if (isEdit.value && form.author && typeof form.author === 'object') {
      return normalizeAuthor(form.author as Author, u);
    }
    return normalizeAuthor(null, u);
  });

  // Image upload refs
  const thumbnailInput = ref<HTMLInputElement | null>(null);
  const imageInput = ref<HTMLInputElement | null>(null);
  const uploadingThumbnail = ref(false);
  const uploadingImage = ref(false);

  // Image URL inputs state
  const imageUrlInputs = ref<ImageUrlInput[]>([]);
  let imageUrlInputIdCounter = 0;
  const imageAction = ref<'url' | 'upload' | ''>('');

  // Parse imageUrl array to display
  const imageUrls = computed(() => {
    if (Array.isArray(form.imageUrl)) {
      return form.imageUrl.filter((url) => url && url.trim().length > 0);
    }
    return [];
  });

  // Auto-generate slug from title
  // In create mode: always generate
  // In edit mode: only generate if slug is empty (for legacy data)
  watch(
    () => form.title,
    (newTitle) => {
      if (newTitle && newTitle.trim()) {
        // Always generate in create mode, or if slug is empty in edit mode
        if (!isEdit.value || !form.slug) {
          form.slug = generatePropertiesId(newTitle);
        }
      } else {
        form.slug = '';
      }
    },
    { immediate: false },
  );

  // Functions for image action select
  function handleImageActionChange(value: string) {
    if (value === 'upload') {
      imageAction.value = '';
      uploadImage();
    } else if (value === 'url') {
      imageAction.value = 'url';
      // Ensure at least one input exists
      if (imageUrlInputs.value.length === 0) {
        imageUrlInputs.value.push({
          id: imageUrlInputIdCounter++,
          value: '',
        });
      }
    } else {
      imageAction.value = '';
    }
  }

  function closeImageUrlSection() {
    imageAction.value = '';
    // Clear empty inputs
    imageUrlInputs.value = imageUrlInputs.value.filter((input) => input.value.trim());
    if (imageUrlInputs.value.length === 0) {
      imageUrlInputs.value = [];
    }
  }

  // Functions for image URL inputs
  function addImageUrlInput() {
    // Commit current input values as images without creating new rows
    imageUrlInputs.value.forEach((input) => {
      const url = input.value.trim();
      if (!url) return;

      if (!Array.isArray(form.imageUrl)) {
        form.imageUrl = [];
      }
      if (!form.imageUrl.includes(url)) {
        form.imageUrl.push(url);
      }
    });

    // Clear inputs but keep existing row(s) so the UI doesn't grow vertically
    imageUrlInputs.value.forEach((input) => {
      input.value = '';
    });

    // Ensure at least one empty input exists
    if (imageUrlInputs.value.length === 0) {
      imageUrlInputs.value.push({
        id: imageUrlInputIdCounter++,
        value: '',
      });
    }
  }

  function removeImageUrlInput(index: number) {
    imageUrlInputs.value.splice(index, 1);
    // Ensure at least one empty input exists
    if (imageUrlInputs.value.length === 0) {
      imageUrlInputs.value.push({
        id: imageUrlInputIdCounter++,
        value: '',
      });
    }
  }

  function handleImageUrlBlur(index: number) {
    const input = imageUrlInputs.value[index];
    if (!input) return;

    const url = input.value.trim();
    if (url && url.length > 0) {
      // Ensure form.imageUrl is an array
      if (!Array.isArray(form.imageUrl)) {
        form.imageUrl = [];
      }
      // Add URL if not already exists
      if (!form.imageUrl.includes(url)) {
        form.imageUrl.push(url);
      }
      // Clear the input but do NOT create additional rows
      input.value = '';
    }
  }

  // Helper functions for single select
  function handleLocationChange(locationId: string) {
    const location = locations.value.find(
      (loc) => (loc.locationsId || loc.id) === locationId,
    );
    if (!location) {
      form.location = null;
      return;
    }

    form.location = {
      name: location.name,
      locationsId: location.locationsId || location.id,
    };
  }

  function handleTypeChange(typeId: string) {
    const type = propertyTypes.value.find(
      (t) => (t.propertiesTypeId || t.id) === typeId,
    );
    if (!type) {
      form.type = null;
      return;
    }

    form.type = {
      name: type.name,
      propertiesTypeId: type.propertiesTypeId || type.id,
    };
  }

  function isBadgeSelected(badgeId: string): boolean {
    if (!Array.isArray(form.badges)) return false;
    return form.badges.some(
      (b: PropertyBadge) => (b.badgesId || b.id) === badgeId,
    );
  }

  function toggleBadge(badgeId: string) {
    const badge = badges.value.find((b) => (b.badgesId || b.id) === badgeId);
    if (!badge) return;

    const currentBadges = Array.isArray(form.badges) ? [...form.badges] : [];
    const index = currentBadges.findIndex(
      (b: PropertyBadge) => (b.badgesId || b.id) === badgeId,
    );

    if (index >= 0) {
      currentBadges.splice(index, 1);
    } else {
      currentBadges.push({
        name: badge.name,
        badgesId: badge.badgesId || badge.id,
      });
    }

    form.badges = currentBadges;
  }

  // Image upload functions
  function uploadThumbnail() {
    thumbnailInput.value?.click();
  }

  async function handleThumbnailUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploadingThumbnail.value = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiFetch<{ url?: string; data?: { url?: string } }>(
        '/upload',
        {
          method: 'POST',
          body: formData,
          headers: {
            'x-api-secret': apiSecret,
          },
        },
      );

      const url = res.url ?? res.data?.url;
      if (url) {
        form.thumbnailUrl = url;
        toast.success('Thumbnail berhasil diunggah');
      } else {
        toast.error('Gagal mengunggah thumbnail');
      }
    } catch (e: any) {
      toast.error(e?.data?.message || 'Gagal mengunggah thumbnail');
    } finally {
      uploadingThumbnail.value = false;
      input.value = '';
    }
  }

  function uploadImage() {
    imageInput.value?.click();
  }

  async function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    uploadingImage.value = true;
    try {
      const uploadedUrls: string[] = [];

      // Upload all selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await apiFetch<{ url?: string; data?: { url?: string } }>(
            '/upload',
            {
              method: 'POST',
              body: formData,
              headers: {
                'x-api-secret': apiSecret,
              },
            },
          );

          const url = res.url ?? res.data?.url;
          if (url) {
            uploadedUrls.push(url);
          }
        } catch (e: any) {
          console.error(`Failed to upload file ${i + 1}:`, e);
        }
      }

      if (uploadedUrls.length > 0) {
        // Ensure form.imageUrl is an array
        if (!Array.isArray(form.imageUrl)) {
          form.imageUrl = [];
        }
        // Add to existing images
        form.imageUrl.push(...uploadedUrls);
        toast.success(`${uploadedUrls.length} gambar berhasil diunggah`);
      } else {
        toast.error('Gagal mengunggah gambar');
      }
    } catch (e: any) {
      toast.error(e?.data?.message || 'Gagal mengunggah gambar');
    } finally {
      uploadingImage.value = false;
      input.value = '';
      imageAction.value = '';
    }
  }

  function removeImage(index: number) {
    if (!Array.isArray(form.imageUrl)) {
      form.imageUrl = [];
      return;
    }
    form.imageUrl.splice(index, 1);
  }

  // Load property data if editing
  async function loadPropertyData() {
    await Promise.all([fetchPropertyTypes(), fetchLocations(), fetchBadges()]);

    // Reset form for create mode
    if (!isEdit.value) {
      form.title = '';
      form.slug = '';
      form.location = null;
      form.type = null;
      form.badges = [];
      form.content = '';
      form.thumbnailUrl = '';
      form.imageUrl = [];
      form.bedrooms = '';
      form.bathrooms = '';
      form.area = '';
      form.price = '';
      form.priceValue = 0;
      form.status = 'draft';
      imageUrlInputs.value = [];
      imageAction.value = '';
      // Set author from logged-in user
      form.author = normalizeAuthor(null, user.value);
    } else if (isEdit.value && propertyId.value) {
      try {
        const response = await apiFetch<{ data: Property }>(
          `/properties/${propertyId.value}`,
        );
        const property = response.data;

        // Populate form
        form.title = property.title || '';
        form.slug = property.slug || '';
        form.content = property.content || '';
        form.thumbnailUrl = property.thumbnailUrl || '';
        form.imageUrl = Array.isArray(property.imageUrl)
          ? [...property.imageUrl]
          : [];
        // Initialize URL inputs
        imageUrlInputs.value = [];
        imageAction.value = '';
        form.bedrooms = property.bedrooms || '';
        form.bathrooms = property.bathrooms || '';
        form.area = property.area || '';
        form.price = property.price || '';
        form.priceValue = property.priceValue || 0;
        form.status = property.status || 'draft';

        // Set selected location, type, badges
        if (
          property.location &&
          typeof property.location === 'object' &&
          !Array.isArray(property.location)
        ) {
          form.location = { ...property.location };
        } else if (
          Array.isArray(property.location) &&
          property.location.length > 0
        ) {
          // Handle legacy data format (array)
          form.location = property.location[0];
        } else {
          form.location = null;
        }

        if (
          property.type &&
          typeof property.type === 'object' &&
          !Array.isArray(property.type)
        ) {
          form.type = { ...property.type };
        } else if (Array.isArray(property.type) && property.type.length > 0) {
          // Handle legacy data format (array)
          form.type = property.type[0];
        } else {
          form.type = null;
        }

        if (Array.isArray(property.badges)) {
          form.badges = [...property.badges];
        } else {
          form.badges = [];
        }

        // Set author from property or fallback to logged-in user
        if (property.author && typeof property.author === 'object') {
          form.author = normalizeAuthor(property.author as Author, user.value);
        } else {
          form.author = normalizeAuthor(null, user.value);
        }
      } catch (error: any) {
        console.error('[FE] Fetch property error:', error);
        toast.error('Gagal memuat data property');
        router.push('/dashboard/properties');
      }
    }
  }

  // Submit handler
  async function handleSubmit() {
    // Process any remaining URL inputs before submit
    imageUrlInputs.value.forEach((input) => {
      const url = input.value.trim();
      if (url && url.length > 0) {
        if (!Array.isArray(form.imageUrl)) {
          form.imageUrl = [];
        }
        if (!form.imageUrl.includes(url)) {
          form.imageUrl.push(url);
        }
      }
    });

    // Validate single selects
    if (!form.location || !form.location.locationsId) {
      toast.error('Pilih lokasi');
      return;
    }
    if (!form.type || !form.type.propertiesTypeId) {
      toast.error('Pilih tipe');
      return;
    }

    // Validate required fields
    if (!form.title?.trim()) {
      toast.error('Judul wajib diisi');
      return;
    }
    if (!form.content?.trim()) {
      toast.error('Konten wajib diisi');
      return;
    }
    if (!form.thumbnailUrl?.trim()) {
      toast.error('Thumbnail wajib diisi');
      return;
    }
    if (!form.bedrooms?.trim()) {
      toast.error('Kamar tidur wajib diisi');
      return;
    }
    if (!form.bathrooms?.trim()) {
      toast.error('Kamar mandi wajib diisi');
      return;
    }
    if (!form.area?.trim()) {
      toast.error('Luas wajib diisi');
      return;
    }
    if (!form.price?.trim()) {
      toast.error('Harga wajib diisi');
      return;
    }
    if (!form.priceValue || form.priceValue <= 0) {
      toast.error('Harga nilai wajib diisi dan lebih dari 0');
      return;
    }

    submitting.value = true;
    try {
      // Build author from form atau logged-in user, dengan fallback phoneNumber
      const authorPayload =
        form.author && typeof form.author === 'object'
          ? normalizeAuthor(form.author as Author, user.value)
          : normalizeAuthor(null, user.value);

      // Prepare payload
      const payload = {
        title: form.title.trim(),
        slug: form.slug?.trim() || generatePropertiesId(form.title.trim()),
        location: form.location,
        type: form.type,
        badges: Array.isArray(form.badges) ? form.badges : [],
        content: form.content.trim(),
        thumbnailUrl: form.thumbnailUrl.trim(),
        imageUrl: Array.isArray(form.imageUrl) ? form.imageUrl : [],
        bedrooms: form.bedrooms.trim(),
        bathrooms: form.bathrooms.trim(),
        area: form.area.trim(),
        price: form.price.trim(),
        priceValue: Number(form.priceValue) || 0,
        status: form.status || 'draft',
        ...(authorPayload && { author: authorPayload }),
      };

      if (isEdit.value && propertyId.value) {
        // Update
        await apiFetch(`/properties/${propertyId.value}`, {
          method: 'PATCH',
          body: payload,
        });
        toast.success('Property berhasil diperbarui');
      } else {
        // Create
        await apiFetch('/properties', {
          method: 'POST',
          body: payload,
        });
        toast.success('Property berhasil ditambahkan');
      }

      await fetchProperties();
      router.push('/dashboard/properties');
    } catch (error: any) {
      console.error('[FE] Submit property error:', error);
      const message =
        error?.data?.message ||
        (isEdit.value
          ? 'Gagal memperbarui property'
          : 'Gagal menambahkan property');
      toast.error(message);
    } finally {
      submitting.value = false;
    }
  }

  function goBack() {
    router.push('/dashboard/properties');
  }

  return {
    // Route & router
    isEdit,
    propertyId,
    goBack,

    // Form state
    form,
    errors,
    submitting,

    // Related data
    propertyTypes,
    locations,
    badges,
    displayAuthor,

    // Image state
    thumbnailInput,
    imageInput,
    uploadingThumbnail,
    uploadingImage,
    imageUrlInputs,
    imageAction,
    imageUrls,

    // Functions
    loadPropertyData,
    handleSubmit,
    handleLocationChange,
    handleTypeChange,
    isBadgeSelected,
    toggleBadge,
    uploadThumbnail,
    handleThumbnailUpload,
    uploadImage,
    handleImageUpload,
    removeImage,
    handleImageActionChange,
    closeImageUrlSection,
    addImageUrlInput,
    removeImageUrlInput,
    handleImageUrlBlur,
  };
}