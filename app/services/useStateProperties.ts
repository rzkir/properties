import { reactive, computed, ref } from 'vue';

import { featuredProperties } from '~/lib/data';

import { useCrudService } from '@/lib/crudServices';

import { generatePropertiesId } from '@/lib/genrateProperties';

// ------------------------- Property Type (dashboard) ------------------------- //
const propertyTypesCrud = useCrudService<PropertyType>({
  endpoint: '/properties-type',
  defaultForm: {
    name: '',
    propertiesId: '',
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
    propertiesId: form.propertiesId?.toString().trim() || undefined,
    isActive: form.isActive,
  }),
  autoGenerate: {
    propertiesId: {
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

export function useStateProperties() {
  return {
    filters,
    searchRoute,
    filteredProperties,
    syncFiltersFromRoute,
    scrollToFilter,
  };
}