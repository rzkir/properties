<template>
    <div class="space-y-6">
        <div class="space-y-1">
            <h1 class="text-3xl md:text-4xl font-bold text-emerald-syariah">Profil Saya</h1>
            <p class="text-gray-400 font-medium">
                Selamat datang di area profil. Kelola data pribadi, riwayat booking, dan pengaturan akun Anda.
                <span v-if="user?.role === 'admin'" class="text-gold-accent">(Tampilan Admin)</span>
            </p>
        </div>

        <!-- Quick links -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink to="/profile/riwayat"
                class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex items-center gap-4 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <div
                    class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah group-hover:bg-emerald-syariah group-hover:text-white transition-colors">
                    <Icon name="lucide:calendar-check" class="text-2xl" />
                </div>
                <div>
                    <h3 class="font-bold text-emerald-syariah text-lg">Riwayat Booking</h3>
                    <p class="text-sm text-gray-500">Lihat dan kelola pemesanan unit properti Anda.</p>
                </div>
                <Icon name="lucide:chevron-right"
                    class="text-gray-300 group-hover:text-emerald-syariah ml-auto shrink-0" />
            </NuxtLink>

            <NuxtLink to="/profile/settings"
                class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex items-center gap-4 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <div
                    class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah group-hover:bg-emerald-syariah group-hover:text-white transition-colors">
                    <Icon name="lucide:settings" class="text-2xl" />
                </div>
                <div>
                    <h3 class="font-bold text-emerald-syariah text-lg">Pengaturan Akun</h3>
                    <p class="text-sm text-gray-500">Edit profil, ubah password, dan notifikasi.</p>
                </div>
                <Icon name="lucide:chevron-right"
                    class="text-gray-300 group-hover:text-emerald-syariah ml-auto shrink-0" />
            </NuxtLink>

            <NuxtLink to="/profile/wishlist"
                class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex items-center gap-4 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <div
                    class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah group-hover:bg-emerald-syariah group-hover:text-white transition-colors">
                    <Icon name="lucide:heart" class="text-2xl" />
                </div>
                <div>
                    <h3 class="font-bold text-emerald-syariah text-lg">Wishlist Favorit</h3>
                    <p class="text-sm text-gray-500">Properti yang Anda simpan untuk nanti.</p>
                </div>
                <Icon name="lucide:chevron-right"
                    class="text-gray-300 group-hover:text-emerald-syariah ml-auto shrink-0" />
            </NuxtLink>
        </div>

        <!-- Info card -->
        <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex items-center gap-6">
            <div
                class="w-16 h-16 bg-gold-accent/10 rounded-2xl flex items-center justify-center text-gold-accent text-3xl shrink-0">
                <Icon name="lucide:info" class="text-3xl" />
            </div>
            <div>
                <h3 class="text-xl font-bold text-emerald-syariah mb-1">Butuh Bantuan?</h3>
                <p class="text-sm text-gray-500 leading-relaxed">
                    Tim konsultan kami siap membantu proses akad dan pembayaran secara syariah.
                </p>
                <a href="#"
                    class="text-emerald-syariah font-bold text-sm hover:text-gold-accent flex items-center gap-2 mt-2">
                    Hubungi Customer Care
                    <Icon name="lucide:arrow-right" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthContext } from '@/services/useStateAuth'

const auth = useAuthContext()
const { user } = auth

useHead({
    title: computed(() =>
        user.value?.displayName
            ? `Profil - ${user.value.displayName} | SyariahPro`
            : 'Profil Saya | SyariahPro'
    ),
    meta: [
        {
            name: 'description',
            content: computed(() =>
                user.value?.displayName
                    ? `Area profil ${user.value.displayName}. Kelola data pribadi, riwayat booking, dan pengaturan akun.`
                    : 'Area profil. Kelola data pribadi, riwayat booking, dan pengaturan akun.',
            ),
        },
    ],
})
</script>