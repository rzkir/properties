<template>
    <main class="flex-1">
        <!-- Search Header Section -->
        <section class="bg-emerald-syariah py-8">
            <div class="container mx-auto px-4 md:px-6">
                <div class="bg-white rounded-2xl p-4 shadow-xl flex flex-wrap lg:flex-nowrap items-center gap-4">
                    <div class="flex-1 min-w-[200px] flex items-center gap-3 px-4 border-r border-gray-100">
                        <iconify-icon icon="lucide:search" class="text-emerald-syariah text-xl"></iconify-icon>
                        <div class="flex flex-col w-full">
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Cari
                            </label>
                            <input type="text" placeholder="Nama perumahan atau area..."
                                class="text-sm font-medium text-gray-800 focus:outline-none w-full" />
                        </div>
                    </div>

                    <div class="flex-1 min-w-[150px] flex items-center gap-3 px-4 border-r border-gray-100">
                        <iconify-icon icon="lucide:map-pin" class="text-emerald-syariah text-xl"></iconify-icon>
                        <div class="flex flex-col w-full">
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Lokasi
                            </label>
                            <select
                                class="text-sm font-medium text-gray-800 focus:outline-none bg-transparent cursor-pointer">
                                <option>Semua Lokasi</option>
                                <option>Jakarta Selatan</option>
                                <option>Tangerang Selatan</option>
                                <option>Bekasi</option>
                                <option>Depok</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex-1 min-w-[150px] flex items-center gap-3 px-4 border-r border-gray-100">
                        <iconify-icon icon="lucide:layout-grid" class="text-emerald-syariah text-xl"></iconify-icon>
                        <div class="flex flex-col w-full">
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Tipe
                            </label>
                            <select
                                class="text-sm font-medium text-gray-800 focus:outline-none bg-transparent cursor-pointer">
                                <option>Semua Tipe</option>
                                <option>Rumah</option>
                                <option>Apartemen</option>
                                <option>Kavling</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <button id="btn-search-listing"
                            class="bg-[#D4AF37] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20 hover:scale-105 transition-all flex items-center gap-2">
                            <iconify-icon icon="lucide:filter"></iconify-icon>
                            Terapkan
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Results Grid Area -->
        <div class="container mx-auto px-4 md:px-6 py-10">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar Filter -->
                <aside class="hidden lg:block w-72 shrink-0">
                    <div class="sticky top-[100px] max-h-[calc(100vh-120px)] space-y-8 pr-4 overflow-y-auto">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xl font-bold text-emerald-syariah">Filter</h3>
                            <button class="text-xs font-bold text-[#D4AF37] hover:underline">
                                Reset
                            </button>
                        </div>

                        <!-- Filter Group: Lokasi Populer -->
                        <div class="space-y-3">
                            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Area Populer
                            </h4>
                            <div class="flex flex-col gap-2">
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah"
                                        checked />
                                    Jakarta Selatan
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Bintaro
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    BSD City
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Depok
                                </label>
                            </div>
                        </div>

                        <!-- Filter Group: Rentang Harga -->
                        <div class="space-y-4">
                            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Rentang Harga
                            </h4>
                            <div class="space-y-3">
                                <input type="range" min="500" max="5000" step="100" class="w-full accent-emerald-600" />
                                <div class="flex justify-between items-center text-[11px] font-bold text-gray-500">
                                    <span>500 JT</span>
                                    <span>5 M</span>
                                </div>
                            </div>
                        </div>

                        <!-- Filter Group: Fasilitas Islami -->
                        <div class="space-y-3">
                            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Fasilitas Syariah
                            </h4>
                            <div class="flex flex-col gap-2">
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Masjid Dalam Kompleks
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Sekolah Sunnah
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Kolam Renang Terpisah
                                </label>
                                <label
                                    class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-emerald-syariah">
                                    <input type="checkbox"
                                        class="rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
                                    Lingkungan Tanpa Riba
                                </label>
                            </div>
                        </div>

                        <!-- Filter Group: Status Akad -->
                        <div class="space-y-3">
                            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Status Akad
                            </h4>
                            <div class="flex flex-col gap-2">
                                <label class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                    <input type="radio" name="akad"
                                        class="text-emerald-syariah focus:ring-emerald-syariah" />
                                    Cash Keras
                                </label>
                                <label class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                    <input type="radio" name="akad"
                                        class="text-emerald-syariah focus:ring-emerald-syariah" />
                                    Cicilan Developer (Syariah)
                                </label>
                            </div>
                        </div>

                        <button
                            class="w-full py-3 bg-emerald-50 text-emerald-syariah font-bold text-sm rounded-xl hover:bg-emerald-100 transition-all">
                            Tampilkan 24 Hasil
                        </button>
                    </div>
                </aside>

                <!-- Listings Container -->
                <section class="flex-1">
                    <div class="flex items-center justify-between mb-6">
                        <p class="text-gray-500 text-sm font-medium">
                            Ditemukan
                            <span class="text-emerald-syariah font-bold">
                                {{ featuredProperties.length }} Properti
                            </span>
                            syariah
                        </p>
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-400 font-bold uppercase">Urutkan:</span>
                            <select class="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer">
                                <option>Terbaru</option>
                                <option>Harga Terendah</option>
                                <option>Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    <!-- Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <article v-for="property in featuredProperties" :key="property.id"
                            class="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-soft group hover:-translate-y-2 transition-all duration-300">
                            <div class="relative aspect-4/3 overflow-hidden">
                                <img :src="property.imageUrl" :alt="property.title"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div class="absolute top-4 left-4 flex flex-col gap-2">
                                    <span v-for="badge in property.badges" :key="badge.label" :class="[
                                        'text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg',
                                        badge.variant === 'primary'
                                            ? 'bg-emerald-syariah text-white shadow-emerald-900/20'
                                            : 'bg-[#D4AF37] text-white shadow-gold-500/20'
                                    ]">
                                        {{ badge.label }}
                                    </span>
                                </div>
                                <button
                                    class="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                    <iconify-icon icon="lucide:heart" class="text-xl"></iconify-icon>
                                </button>
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-1 text-[#D4AF37] mb-2">
                                    <iconify-icon icon="material-symbols:star"></iconify-icon>
                                    <iconify-icon icon="material-symbols:star"></iconify-icon>
                                    <iconify-icon icon="material-symbols:star"></iconify-icon>
                                    <iconify-icon icon="material-symbols:star"></iconify-icon>
                                    <iconify-icon icon="material-symbols:star-half"></iconify-icon>
                                    <span class="text-[11px] font-bold text-gray-400 ml-1">
                                        ({{ 24 + property.id * 6 }} Review)
                                    </span>
                                </div>
                                <a href="#"
                                    class="block text-xl font-bold text-emerald-syariah mb-1 hover:text-[#D4AF37] transition-colors serif">
                                    {{ property.title }}
                                </a>
                                <div class="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                                    <iconify-icon icon="lucide:map-pin" class="text-[#D4AF37]"></iconify-icon>
                                    {{ property.location }}
                                </div>
                                <div class="flex items-center justify-between mb-5">
                                    <div class="flex items-center gap-4">
                                        <div class="flex flex-col items-center">
                                            <iconify-icon icon="lucide:bed-double"
                                                class="text-emerald-syariah mb-0.5"></iconify-icon>
                                            <span class="text-[10px] font-bold text-gray-500">
                                                {{ property.bedrooms }}
                                            </span>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <iconify-icon icon="lucide:bath"
                                                class="text-emerald-syariah mb-0.5"></iconify-icon>
                                            <span class="text-[10px] font-bold text-gray-500">
                                                {{ property.bathrooms }}
                                            </span>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <iconify-icon icon="lucide:maximize"
                                                class="text-emerald-syariah mb-0.5"></iconify-icon>
                                            <span class="text-[10px] font-bold text-gray-500">
                                                {{ property.area }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-[10px] font-bold text-gray-400 uppercase">
                                            Mulai Dari
                                        </span>
                                        <p class="text-lg font-extrabold text-emerald-syariah">
                                            {{ property.price }}
                                        </p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <a href="#"
                                        class="py-3 rounded-xl border border-emerald-100 text-emerald-syariah text-center font-bold text-xs hover:bg-emerald-50 transition-all">
                                        Detail
                                    </a>
                                    <a href="#"
                                        class="py-3 rounded-xl bg-emerald-syariah text-white text-center font-bold text-xs hover:bg-emerald-800 transition-all flex items-center justify-center gap-2">
                                        <iconify-icon icon="lucide:message-circle" class="text-sm"></iconify-icon>
                                        Chat
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-12 flex justify-center">
                        <nav class="flex items-center gap-2">
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-emerald-syariah hover:text-emerald-syariah transition-all">
                                <iconify-icon icon="lucide:chevron-left"></iconify-icon>
                            </button>
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-syariah text-white font-bold text-sm">
                                1
                            </button>
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:border-emerald-syariah hover:text-emerald-syariah transition-all">
                                2
                            </button>
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:border-emerald-syariah hover:text-emerald-syariah transition-all">
                                3
                            </button>
                            <span class="px-2 text-gray-400">...</span>
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:border-emerald-syariah hover:text-emerald-syariah transition-all">
                                10
                            </button>
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-emerald-syariah hover:text-emerald-syariah transition-all">
                                <iconify-icon icon="lucide:chevron-right"></iconify-icon>
                            </button>
                        </nav>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { featuredProperties } from '~/lib/data';

useHead({
    title: 'Cari Properti Syariah | SyariahPro'
});
</script>