<template>
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div class="space-y-1">
                <h1 class="text-3xl md:text-4xl font-bold text-emerald-syariah">Wishlist Favorit</h1>
                <p class="text-gray-400 font-medium">
                    Properti syariah yang Anda simpan untuk ditinjau nanti.
                </p>
            </div>
            <div class="flex gap-3">
                <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 px-6">
                    <div class="text-right">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tersimpan</p>
                        <p class="text-xl font-extrabold text-emerald-syariah">{{ wishlistItems.length }} Properti</p>
                    </div>
                    <div
                        class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah">
                        <Icon name="lucide:heart" class="text-xl" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-if="wishlistItems.length === 0"
            class="bg-white rounded-4xl border border-gray-100 shadow-soft p-12 md:p-16 text-center">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
                <Icon name="lucide:heart-off" class="text-4xl" />
            </div>
            <h2 class="text-xl font-bold text-gray-700 mb-2">Wishlist masih kosong</h2>
            <p class="text-gray-500 max-w-md mx-auto mb-8">
                Simpan properti favorit Anda dengan menekan ikon hati pada kartu properti. Daftar akan muncul di sini.
            </p>
            <NuxtLink to="/"
                class="inline-flex items-center gap-2 bg-emerald-syariah text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all">
                <Icon name="lucide:search" />
                Jelajahi Properti
            </NuxtLink>
        </div>

        <!-- Grid of wishlist cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="item in wishlistItems" :key="item.id"
                class="bg-white rounded-4xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-lg hover:border-emerald-100 transition-all group">
                <div class="relative aspect-4/3 overflow-hidden">
                    <img :src="item.image" :alt="item.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button type="button"
                        class="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center shadow-md transition-colors"
                        title="Hapus dari wishlist" @click="removeFromWishlist(item.id)">
                        <Icon name="lucide:heart" class="text-lg fill-current" />
                    </button>
                    <div class="absolute bottom-4 left-4 right-4">
                        <span
                            class="inline-block px-3 py-1 rounded-full bg-emerald-syariah/90 text-white text-[10px] font-bold uppercase tracking-wider">
                            {{ item.type }}
                        </span>
                    </div>
                </div>
                <div class="p-5">
                    <h3
                        class="font-bold text-emerald-syariah text-lg leading-tight mb-2 group-hover:text-gold-accent transition-colors line-clamp-2">
                        {{ item.name }}
                    </h3>
                    <div class="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                        <Icon name="lucide:map-pin" class="text-gold-accent shrink-0 text-base" />
                        <span class="line-clamp-1">{{ item.location }}</span>
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                        <p class="text-lg font-extrabold text-emerald-syariah">{{ item.price }}</p>
                        <NuxtLink :to="item.slug ? `/properti/${item.slug}` : '#'"
                            class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-syariah hover:text-gold-accent transition-colors">
                            Lihat Detail
                            <Icon name="lucide:arrow-right" class="text-base" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div class="bg-emerald-syariah p-6 rounded-4xl shadow-soft relative overflow-hidden group">
            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div class="relative z-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h3 class="text-xl font-bold mb-1">Temukan Properti Syariah Idaman</h3>
                    <p class="text-emerald-100/80 text-sm">
                        Jelajahi katalog properti dengan pembiayaan syariah dan akad yang transparan.
                    </p>
                </div>
                <NuxtLink to="/"
                    class="shrink-0 inline-flex items-center gap-2 bg-white text-emerald-syariah px-8 py-3 rounded-xl font-bold text-sm hover:bg-gold-accent hover:text-white transition-all">
                    Cari Properti
                    <Icon name="lucide:search" />
                </NuxtLink>
            </div>
            <Icon name="lucide:home" class="absolute -bottom-4 -right-4 text-[100px] text-white/10" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthContext } from '@/lib/AuthContext'

useHead({
    title: 'Wishlist Favorit | SyariahPro',
})

const auth = useAuthContext()
const { user } = auth

interface WishlistItem {
    id: string
    name: string
    location: string
    image: string
    price: string
    type: string
    slug?: string
}

// Mock data; in production fetch from API/Firestore by user.uid
const wishlistItems = ref<WishlistItem[]>([
    {
        id: 'wl-1',
        name: 'Royal Al-Ikhlas Residence',
        location: 'Bintaro, Jakarta Selatan',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600',
        price: 'Rp 1,2 M',
        type: 'Rumah',
        slug: 'royal-al-ikhlas',
    },
    {
        id: 'wl-2',
        name: 'Modern Halal Residence',
        location: 'BSD, Tangerang',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
        price: 'Rp 850 Jt',
        type: 'Apartemen',
        slug: 'modern-halal-residence',
    },
    {
        id: 'wl-3',
        name: 'Villa Madani Tropika',
        location: 'Puncak, Bogor',
        image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=600',
        price: 'Rp 2,5 M',
        type: 'Villa',
        slug: 'villa-madani',
    },
])

function removeFromWishlist(id: string) {
    wishlistItems.value = wishlistItems.value.filter((item) => item.id !== id)
    // TODO: sync with API/Firestore (remove from user wishlist)
}
</script>
