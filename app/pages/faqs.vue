<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-emerald-syariah py-16">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Pusat Bantuan <span class="text-[#D4AF37] serif">& FAQ</span>
        </h1>
        <p
          class="text-emerald-100/80 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed"
        >
          Temukan jawaban atas semua pertanyaan Anda mengenai proses pembelian
          properti syariah, skema pembayaran, dan legalitas akad di SyariahPro.
        </p>
        <div class="max-w-xl mx-auto relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari pertanyaan..."
            class="w-full py-4 pl-14 pr-6 rounded-2xl bg-white shadow-2xl focus:outline-none text-gray-700 text-sm md:text-base"
          />
          <Icon
            name="lucide:search"
            class="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-syariah text-2xl"
          />
        </div>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="container mx-auto px-4 md:px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Sidebar -->
        <aside class="hidden lg:block lg:col-span-3">
          <div class="sticky top-28 space-y-2">
            <h3
              class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4"
            >
              Kategori FAQ
            </h3>
            <NuxtLink
              v-for="category in filteredFaqCategories"
              :key="category.id"
              :to="`#${category.slug}`"
              class="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold transition-all"
              :class="
                isCategoryActive(category.id)
                  ? 'text-emerald-syariah bg-emerald-50'
                  : 'text-gray-600 hover:bg-gray-50'
              "
              @click.prevent="goToCategory(category)"
            >
              <Icon :name="category.icon" />
              {{ category.title }}
            </NuxtLink>

            <div
              class="mt-10 p-6 bg-emerald-syariah rounded-2xl text-white shadow-xl shadow-emerald-900/20"
            >
              <h4 class="font-bold mb-2">Butuh bantuan lain?</h4>
              <p class="text-xs text-emerald-100/60 mb-6">
                Tim marketing kami siap membantu menjawab pertanyaan detail
                Anda.
              </p>
              <a
                href="#"
                class="btn-gold w-full py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                <Icon name="lucide:message-circle" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </aside>

        <!-- FAQ Sections -->
        <div class="col-span-1 lg:col-span-9 space-y-16">
          <div
            v-if="
              searchQuery.trim() && filteredFaqCategories.length === 0
            "
            class="text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-100"
          >
            <Icon
              name="lucide:search-x"
              class="text-5xl text-gray-300 mx-auto mb-4"
            />
            <h3 class="text-lg font-bold text-gray-700 mb-2">
              Tidak ada hasil untuk "{{ searchQuery.trim() }}"
            </h3>
            <p class="text-sm text-gray-500">
              Coba kata kunci lain atau periksa ejaan.
            </p>
          </div>
          <section
            v-for="category in filteredFaqCategories"
            :key="category.id"
            :id="category.slug"
          >
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah text-2xl shadow-sm"
              >
                <Icon :name="category.icon" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-emerald-syariah">
                  {{ category.title }}
                </h2>
                <p class="text-sm text-gray-400">
                  {{ category.subtitle }}
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <article
                v-for="item in category.items"
                :key="item.id"
                class="p-6 bg-white rounded-2xl border shadow-soft cursor-pointer transition-all"
                :class="
                  isActive(item.id)
                    ? 'border-emerald-syariah bg-emerald-50/60'
                    : 'border-gray-100 hover:border-emerald-syariah'
                "
                @click="toggleFaq(item.id)"
              >
                <div class="flex items-center justify-between gap-4">
                  <h3
                    class="font-bold text-lg"
                    :class="
                      isActive(item.id)
                        ? 'text-emerald-syariah'
                        : 'text-gray-800'
                    "
                  >
                    {{ item.question }}
                  </h3>
                  <Icon
                    name="lucide:chevron-down"
                    class="text-xl shrink-0 transition-transform"
                    :class="
                      isActive(item.id)
                        ? 'text-emerald-syariah rotate-180'
                        : 'text-gray-400'
                    "
                  />
                </div>
                <div
                  class="overflow-hidden transition-[max-height] duration-300"
                  :style="{ maxHeight: isActive(item.id) ? '500px' : '0px' }"
                >
                  <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                    {{ item.answer }}
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStateFaqs } from "~/services/useStateFaqs";

export default defineComponent({
  setup() {
    useHead({ title: "FAQ Properti Syariah | SyariahPro" });
    return { ...useStateFaqs() };
  },
});
</script>
