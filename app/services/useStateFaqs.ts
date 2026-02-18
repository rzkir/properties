import { ref, computed, onMounted, watch } from "vue";

import { faqCategories } from "~/lib/data";

export function useStateFaqs() {
  const activeFaqId = ref<string | null>(null);
  const searchQuery = ref("");

  const normalizedQuery = computed(() =>
    searchQuery.value.trim().toLowerCase(),
  );

  const filteredFaqCategories = computed(() => {
    if (!normalizedQuery.value) return faqCategories;
    const q = normalizedQuery.value;
    return faqCategories
      .map((cat) => {
        const titleMatch =
          cat.title.toLowerCase().includes(q) ||
          (cat.subtitle && cat.subtitle.toLowerCase().includes(q));
        const matchingItems = cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        );
        const items = titleMatch ? cat.items : matchingItems;
        if (items.length) return { ...cat, items };
        return null;
      })
      .filter(Boolean) as Array<(typeof faqCategories)[number]>;
  });

  onMounted(() => {
    const hash = typeof window !== "undefined" ? window.location.hash?.slice(1) : "";
    if (hash) {
      const category = faqCategories.find((c) => c.slug === hash);
      if (category?.items?.length) {
        activeFaqId.value = category.items[0].id;
      }
    }
    if (!activeFaqId.value && faqCategories[0]?.items[0]) {
      activeFaqId.value = faqCategories[0].items[0].id;
    }
  });

  watch(activeFaqId, (id) => {
    if (!id || typeof window === "undefined") return;
    const category = faqCategories.find((c) =>
      c.items.some((i) => i.id === id),
    );
    if (category) {
      const newHash = `#${category.slug}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }
  });

  watch([searchQuery, filteredFaqCategories], () => {
    if (!normalizedQuery.value) return;
    const first = filteredFaqCategories.value[0]?.items[0];
    if (first && activeFaqId.value !== first.id) {
      const stillVisible = filteredFaqCategories.value.some((c) =>
        c.items.some((i) => i.id === activeFaqId.value),
      );
      if (!stillVisible) activeFaqId.value = first.id;
    }
  });

  function isActive(id: string) {
    return activeFaqId.value === id;
  }

  function isCategoryActive(categoryId: string) {
    if (!activeFaqId.value) return false;
    const category = filteredFaqCategories.value.find(
      (c) => c.id === categoryId,
    );
    return category?.items.some((i) => i.id === activeFaqId.value) ?? false;
  }

  function toggleFaq(id: string) {
    activeFaqId.value = activeFaqId.value === id ? null : id;
  }

  function goToCategory(category: {
    slug: string;
    items: readonly { id: string }[];
  }) {
    activeFaqId.value = category.items[0]?.id ?? null;
    if (typeof document !== "undefined") {
      document
        .getElementById(category.slug)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return {
    faqCategories,
    filteredFaqCategories,
    searchQuery,
    activeFaqId,
    isActive,
    isCategoryActive,
    toggleFaq,
    goToCategory,
  };
}
