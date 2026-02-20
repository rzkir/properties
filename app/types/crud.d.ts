interface CrudConfig<T extends Record<string, any>> {
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

interface CrudState<T extends Record<string, any>> {
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
    /** Perform delete without confirmation (e.g. after custom modal confirm) */
    performDelete: (item: T) => Promise<void>;
    resetForm: () => void;
}