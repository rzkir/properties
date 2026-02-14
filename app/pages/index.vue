<template>
  <main>
    <!-- Hero Section -->
    <section class="relative bg-emerald-syariah pt-20 md:pt-24 pb-24 md:pb-32 overflow-hidden">
      <div class="absolute inset-0 islamic-pattern"></div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div class="text-white text-center lg:text-left">
            <div
              class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-white/20">
              <Icon name="lucide:shield-check" class="text-[#D4AF37]" />
              <span class="text-xs font-bold uppercase tracking-widest">
                100% Terverifikasi Dewan Syariah
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] mb-6">
              Miliki Hunian Impian <br />
              <span class="text-[#D4AF37] serif italic">Tanpa Riba, Penuh Berkah</span>
            </h1>
            <p
              class="text-base sm:text-lg md:text-xl text-emerald-50/70 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Platform direktori properti syariah nomor #1 di Indonesia yang menghubungkan Anda
              dengan rumah idaman menggunakan skema akad halal dan transparan.
            </p>
            <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#" id="hero-explore-btn"
                class="btn-gold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-gold-500/20 w-full sm:w-auto text-center">
                Mulai Mencari
              </a>
              <a href="#" id="hero-partner-btn"
                class="px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all w-full sm:w-auto text-center">
                Jadi Mitra Developer
              </a>
            </div>
          </div>
          <div class="hidden lg:block relative">
            <div class="relative z-10 rounded-[40px] overflow-hidden shadow-2xl rotate-2">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
                alt="Modern House" class="w-full h-full object-cover" />
            </div>
            <div
              class="absolute -top-6 -right-6 w-full h-full border-4 border-[#D4AF37] rounded-[40px] z-0 translate-x-4 translate-y-4">
            </div>
            <!-- Floating Stats Card -->
            <div class="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 z-20">
              <div
                class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah text-2xl">
                <Icon name="lucide:users" />
              </div>
              <div>
                <div class="text-2xl font-bold text-emerald-syariah">10,000+</div>
                <div class="text-sm text-gray-500 font-medium">Keluarga Bahagia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Search Bar (Overlapping) -->
    <section class="relative -mt-10 md:-mt-16">
      <div class="container mx-auto px-4 md:px-6">
        <div
          class="bg-white rounded-3xl p-5 md:p-6 shadow-2xl flex flex-wrap lg:flex-nowrap items-stretch gap-4 md:gap-6">
          <div
            class="flex-1 min-w-[200px] flex items-center gap-4 px-4 md:px-6 border-b md:border-b-0 md:border-r border-gray-100">
            <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-syariah">
              <Icon name="lucide:map-pin" class="text-xl" />
            </div>
            <div class="flex flex-col">
              <label class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                Lokasi
              </label>
              <Input v-model="filters.location" placeholder="Cari Kota atau Area"
                class="text-base font-semibold text-gray-800 placeholder:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent border-0" />
            </div>
          </div>

          <div
            class="flex-1 min-w-[150px] flex items-center gap-4 px-4 md:px-6 border-b md:border-b-0 md:border-r border-gray-100">
            <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-syariah">
              <Icon name="lucide:home" class="text-xl" />
            </div>
            <div class="flex flex-col">
              <label class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                Tipe Hunian
              </label>
              <Select v-model="filters.type">
                <SelectTrigger
                  class="w-full text-base font-semibold text-gray-800 bg-transparent cursor-pointer outline-none border-0">
                  <SelectValue placeholder="Pilih tipe hunian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rumah Modern">
                    Rumah Modern
                  </SelectItem>
                  <SelectItem value="Apartemen Halal">
                    Apartemen Halal
                  </SelectItem>
                  <SelectItem value="Villa Tropis">
                    Villa Tropis
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            class="flex-1 min-w-[150px] flex items-center gap-4 px-4 md:px-6 border-b md:border-b-0 md:border-r border-gray-100">
            <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-syariah">
              <Icon name="lucide:banknote" class="text-xl" />
            </div>
            <div class="flex flex-col">
              <label class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                Range Harga
              </label>
              <Select v-model="filters.price">
                <SelectTrigger
                  class="w-full text-base font-semibold text-gray-800 bg-transparent cursor-pointer outline-none border-0">
                  <SelectValue placeholder="Pilih range harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">
                    Rp 500Jt - 1M
                  </SelectItem>
                  <SelectItem value="1000-3000">
                    Rp 1M - 3M
                  </SelectItem>
                  <SelectItem value="3000-10000">
                    Rp 3M - 10M
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0">
            <button id="btn-filter-advanced"
              class="p-4 text-emerald-syariah hover:bg-emerald-50 rounded-2xl transition-all" title="Filter Lanjut">
              <Icon name="lucide:sliders-horizontal" class="text-xl" />
            </button>
            <button id="btn-search-main"
              class="bg-[#D4AF37] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-gold-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 w-full md:w-auto">
              <Icon name="lucide:search" />
              Cari Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Properties Section -->
    <section class="py-10 md:py-20 lg:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 md:mb-16">
          <div>
            <h4 class="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Hunian Pilihan
            </h4>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-syariah leading-tight">
              Properti Unggulan <br />
              <span class="serif italic font-normal text-3xl sm:text-4xl md:text-5xl">Pekan Ini</span>
            </h2>
          </div>
          <a href="#" id="view-all-featured"
            class="group flex items-center gap-2 text-emerald-syariah font-bold hover:text-[#D4AF37] transition-all">
            Lihat Semua Properti
            <Icon name="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="property in featuredProperties" :key="property.id"
            class="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft transition-all duration-300 card-hover">
            <div class="relative h-64 overflow-hidden">
              <img :src="property.imageUrl" :alt="property.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span v-for="badge in property.badges" :key="badge.label" :class="[
                  'backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider',
                  badge.variant === 'primary'
                    ? 'bg-white/90 text-emerald-syariah'
                    : 'bg-emerald-syariah/90 text-white'
                ]">
                  {{ badge.label }}
                </span>
              </div>
              <button
                class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-syariah hover:text-red-500 transition-colors shadow-lg">
                <Icon name="lucide:heart" />
              </button>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3 text-[#D4AF37]">
                <Icon name="lucide:map-pin" />
                <span class="text-xs font-bold">
                  {{ property.location }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-emerald-syariah mb-4">
                {{ property.title }}
              </h3>
              <div class="flex items-center justify-between py-4 border-y border-gray-50 mb-6">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:bed" class="text-gray-400" />
                  <span class="text-sm font-semibold">
                    {{ property.bedrooms }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:bath" class="text-gray-400" />
                  <span class="text-sm font-semibold">
                    {{ property.bathrooms }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:maximize" class="text-gray-400" />
                  <span class="text-sm font-semibold">
                    {{ property.area }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Mulai Dari
                  </span>
                  <div class="text-lg font-extrabold text-emerald-syariah">
                    {{ property.price }}
                  </div>
                </div>
                <a href="#"
                  class="w-12 h-12 bg-emerald-50 text-emerald-syariah rounded-2xl flex items-center justify-center hover:bg-emerald-syariah hover:text-white transition-all">
                  <Icon name="lucide:chevron-right" class="text-xl" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Why SyariahPro Section -->
    <section class="bg-white py-10 md:py-20 lg:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center max-w-2xl mx-auto mb-10 md:mb-16 lg:mb-20">
          <h4 class="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-sm mb-4">
            Keunggulan Kami
          </h4>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-syariah serif italic">
            Mengapa Memilih Kami?
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          <div v-for="(advantage, index) in advantages" :key="advantage.id"
            class="flex flex-col items-center text-center">
            <div :class="[
              'w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-syariah text-3xl mb-6 shadow-lg shadow-emerald-900/5',
              index % 2 === 0 ? 'rotate-3' : '-rotate-3'
            ]">
              <Icon :name="advantage.icon" />
            </div>
            <h4 class="text-lg font-bold text-emerald-syariah mb-3">
              {{ advantage.title }}
            </h4>
            <p class="text-sm text-gray-500 leading-relaxed">
              {{ advantage.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-10 md:py-20 lg:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div class="max-w-xl">
            <h4 class="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Testimonial
            </h4>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-syariah serif">
              Kisah Bahagia <br />
              <span class="italic font-normal">Keluarga SyariahPro</span>
            </h2>
          </div>
          <div class="flex gap-4">
            <button
              class="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-emerald-syariah hover:bg-emerald-syariah hover:text-white transition-all">
              <Icon name="lucide:chevron-left" class="text-2xl" />
            </button>
            <button
              class="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-emerald-syariah hover:bg-emerald-syariah hover:text-white transition-all">
              <Icon name="lucide:chevron-right" class="text-2xl" />
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" :class="[
            'p-6 md:p-8 lg:p-10 rounded-[32px] md:rounded-[40px] relative',
            testimonial.highlight
              ? 'bg-emerald-syariah shadow-2xl'
              : 'bg-white border border-gray-100 shadow-soft'
          ]">
            <Icon name="mdi:format-quote-open" :class="[
              'absolute top-10 right-10 text-4xl',
              testimonial.highlight ? 'text-white/10' : 'text-emerald-50'
            ]" />
            <div class="flex items-center gap-4 mb-8">
              <img :src="testimonial.avatarUrl" class="w-14 h-14 rounded-2xl object-cover shadow-lg" alt="User" />
              <div>
                <h4 :class="[
                  'font-bold',
                  testimonial.highlight ? 'text-white' : 'text-gray-800'
                ]">
                  {{ testimonial.name }}
                </h4>
                <p class="text-xs text-[#D4AF37] font-bold uppercase">
                  {{ testimonial.project }}
                </p>
              </div>
            </div>
            <p :class="[
              'italic leading-relaxed',
              testimonial.highlight ? 'text-emerald-50 opacity-80' : 'text-gray-600'
            ]">
              "{{ testimonial.quote }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-10 md:py-20 lg:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div
          class="bg-emerald-syariah rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden relative p-8 md:p-14 lg:p-20">
          <div class="absolute inset-0 islamic-pattern opacity-10"></div>
          <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37] rounded-full blur-[100px] opacity-20"></div>
          <div class="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Siap Memulai <br />
                <span class="text-[#D4AF37] serif">Kehidupan Berkah?</span>
              </h2>
              <p class="text-emerald-50/70 text-base md:text-lg mb-8 md:mb-10 max-w-md">
                Daftarkan diri Anda hari ini dan dapatkan akses prioritas ke unit-unit terbaru kami
                sebelum dipasarkan secara umum.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="#"
                  class="btn-gold px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl shadow-gold-500/30 text-center">
                  Daftar Sekarang
                </a>
                <a href="#"
                  class="bg-white/10 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all text-center">
                  Hubungi Kami
                </a>
              </div>
            </div>
            <div class="hidden lg:flex justify-end">
              <div class="flex -space-x-6">
                <img src="https://i.pravatar.cc/100?u=11"
                  class="w-24 h-24 rounded-full border-4 border-emerald-syariah shadow-xl" />
                <img src="https://i.pravatar.cc/100?u=12"
                  class="w-24 h-24 rounded-full border-4 border-emerald-syariah shadow-xl" />
                <img src="https://i.pravatar.cc/100?u=13"
                  class="w-24 h-24 rounded-full border-4 border-emerald-syariah shadow-xl" />
                <div
                  class="w-24 h-24 rounded-full border-4 border-emerald-syariah bg-[#D4AF37] flex items-center justify-center text-white text-xl font-bold shadow-xl">
                  +5k
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { featuredProperties, advantages, testimonials } from '~/lib/data';
import Input from '@/components/ui/input/Input.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';

const filters = reactive({
  location: '',
  type: 'Rumah Modern',
  price: '500-1000',
});
</script>