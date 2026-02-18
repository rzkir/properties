import { ref, reactive, watch, toRaw, type Ref } from "vue";
import { toast } from "vue-sonner";
import { apiFetch } from "@/lib/config";

export interface CrudConfig<T extends Record<string, any>> {
  /** API endpoint base path (e.g., "/properties-type") */
  endpoint: string;
  /** Default form values */
  defaultForm: Partial<T>;
  /** Form validation function */
  validate?: (form: Partial<T>) => Record<string, string>;
  /** Transform form data before submit */
  transformForm?: (form: Partial<T>, isEdit: boolean) => Partial<T>;
  /** Auto-generate fields from other fields */
  autoGenerate?: {
    [key in keyof T]?: {
      from: keyof T;
      generator: (value: any) => string;
      onlyOnCreate?: boolean;
    };
  };
  /** Success messages */
  messages?: {
    fetch?: string;
    create?: string;
    update?: string;
    delete?: string;
    fetchError?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
  };
  /** Delete confirmation message generator */
  deleteConfirmMessage?: (item: T) => string;
}

export interface CrudState<T extends Record<string, any>> {
  items: Ref<T[]>;
  loading: Ref<boolean>;
  isDialogOpen: Ref<boolean>;
  editingItem: Ref<T | null>;
  submitting: Ref<boolean>;
  form: any; // Using any to avoid reactive type issues
  errors: Record<string, string>;
  fetch: () => Promise<void>;
  openCreateDialog: () => void;
  openEditDialog: (item: T) => void;
  closeDialog: () => void;
  handleSubmit: () => Promise<void>;
  confirmDelete: (item: T) => Promise<void>;
  resetForm: () => void;
}

/**
 * Generic CRUD service composable
 * @param config Configuration for the CRUD service
 * @returns CRUD state and methods
 */
export function useCrudService<T extends Record<string, any> & { id: string }>(
  config: CrudConfig<T>,
): CrudState<T> {
  const items = ref<T[]>([]);
  const loading = ref(false);
  const isDialogOpen = ref(false);
  const editingItem = ref<T | null>(null);
  const submitting = ref(false);

  const form = reactive<Partial<T>>({ ...config.defaultForm });
  const errors = reactive<Record<string, string>>({});

  const defaultMessages = {
    fetch: "Gagal memuat data",
    create: "Data berhasil ditambahkan",
    update: "Data berhasil diperbarui",
    delete: "Data berhasil dihapus",
    fetchError: "Gagal memuat data",
    createError: "Gagal menambahkan data",
    updateError: "Gagal memperbarui data",
    deleteError: "Gagal menghapus data",
  };

  const messages = { ...defaultMessages, ...config.messages };

  // Setup auto-generate watchers
  if (config.autoGenerate) {
    for (const [targetField, autoGenConfig] of Object.entries(config.autoGenerate)) {
      const sourceField = autoGenConfig.from as string;
      watch(
        () => (form as any)[sourceField],
        (newValue) => {
          if (
            newValue &&
            (!autoGenConfig.onlyOnCreate || !editingItem.value)
          ) {
            (form as any)[targetField] = autoGenConfig.generator(newValue);
          }
        },
      );
    }
  }

  // Reset form to default values
  function resetForm() {
    Object.assign(form, { ...config.defaultForm });
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
  }

  // Fetch all items
  async function fetch() {
    loading.value = true;
    try {
      const response = await apiFetch<{ data: T[] }>(config.endpoint);
      items.value = response.data;
    } catch (error: any) {
      console.error(`[FE] Fetch ${config.endpoint} error:`, error);
      toast.error(messages.fetchError || messages.fetch);
    } finally {
      loading.value = false;
    }
  }

  // Open create dialog
  function openCreateDialog() {
    editingItem.value = null;
    resetForm();
    isDialogOpen.value = true;
  }

  // Open edit dialog
  function openEditDialog(item: T) {
    editingItem.value = item;
    Object.assign(form, { ...item });
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
    isDialogOpen.value = true;
  }

  // Close dialog
  function closeDialog() {
    isDialogOpen.value = false;
    editingItem.value = null;
    resetForm();
  }

  // Validate form
  function validateForm(): boolean {
    // Clear errors
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });

    if (config.validate) {
      const validationErrors = config.validate(form as Partial<T>);
      Object.assign(errors, validationErrors);
      return Object.keys(validationErrors).length === 0;
    }

    return true;
  }

  // Handle submit (create or update)
  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    submitting.value = true;
    try {
      // Safely clone reactive form into a plain object for payload
      const rawForm = toRaw(form) as Record<string, unknown>;
      let payload = { ...rawForm } as Partial<T>;

      // Transform form data if provided
      if (config.transformForm) {
        payload = config.transformForm(payload as Partial<T>, !!editingItem.value);
      }

      // Clean up undefined values
      Object.keys(payload).forEach((key) => {
        if (payload[key as keyof T] === undefined || payload[key as keyof T] === "") {
          delete payload[key as keyof T];
        }
      });

      if (editingItem.value) {
        // Update
        await apiFetch(`${config.endpoint}/${editingItem.value.id}`, {
          method: "PATCH",
          body: payload,
        });
        toast.success(messages.update);
      } else {
        // Create
        await apiFetch(config.endpoint, {
          method: "POST",
          body: payload,
        });
        toast.success(messages.create);
      }

      closeDialog();
      await fetch();
    } catch (error: any) {
      console.error(`[FE] Submit ${config.endpoint} error:`, error);
      const message =
        error?.data?.message ||
        (editingItem.value ? messages.updateError : messages.createError);
      toast.error(message);
    } finally {
      submitting.value = false;
    }
  }

  // Confirm and delete item
  async function confirmDelete(item: T) {
    const confirmMessage = config.deleteConfirmMessage
      ? config.deleteConfirmMessage(item)
      : `Apakah Anda yakin ingin menghapus item ini?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      await apiFetch(`${config.endpoint}/${item.id}`, {
        method: "DELETE",
      });
      toast.success(messages.delete);
      await fetch();
    } catch (error: any) {
      console.error(`[FE] Delete ${config.endpoint} error:`, error);
      const message = error?.data?.message || messages.deleteError;
      toast.error(message);
    }
  }

  return {
    items: items as Ref<T[]>,
    loading,
    isDialogOpen,
    editingItem: editingItem as Ref<T | null>,
    submitting,
    form: form as any,
    errors,
    fetch,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    handleSubmit,
    confirmDelete,
    resetForm,
  };
}
