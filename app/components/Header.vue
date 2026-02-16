<template>
    <header class="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 shadow-sm">
        <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-emerald-syariah rounded-lg flex items-center justify-center">
                    <Icon name="lucide:home" class="text-white text-xl" />
                </div>
                <span class="text-xl font-bold tracking-tight text-emerald-syariah uppercase">
                    SYARIAH<span class="text-[#D4AF37]">PRO</span>
                </span>
            </div>

            <nav class="hidden md:flex items-center gap-8">
                <NuxtLink
                    to="/"
                    id="nav-home"
                    :class="[
                        'text-sm transition-colors',
                        route.path === '/' 
                            ? 'font-semibold text-emerald-syariah border-b-2 border-[#D4AF37] pb-1' 
                            : 'font-medium text-gray-600 hover:text-emerald-syariah'
                    ]"
                >
                    Beranda
                </NuxtLink>
                <NuxtLink
                    to="/search"
                    id="nav-listing"
                    :class="[
                        'text-sm transition-colors',
                        route.path === '/search' 
                            ? 'font-semibold text-emerald-syariah border-b-2 border-[#D4AF37] pb-1' 
                            : 'font-medium text-gray-600 hover:text-emerald-syariah'
                    ]"
                >
                    Cari Properti
                </NuxtLink>
                <NuxtLink
                    to="/about"
                    id="nav-about"
                    :class="[
                        'text-sm transition-colors',
                        route.path === '/about' 
                            ? 'font-semibold text-emerald-syariah border-b-2 border-[#D4AF37] pb-1' 
                            : 'font-medium text-gray-600 hover:text-emerald-syariah'
                    ]"
                >
                    Tentang Kami
                </NuxtLink>
                <NuxtLink
                    to="/faqs"
                    id="nav-faq"
                    :class="[
                        'text-sm transition-colors',
                        route.path === '/faqs' 
                            ? 'font-semibold text-emerald-syariah border-b-2 border-[#D4AF37] pb-1' 
                            : 'font-medium text-gray-600 hover:text-emerald-syariah'
                    ]"
                >
                    FAQ
                </NuxtLink>
            </nav>

            <div class="flex items-center gap-4">
                <template v-if="user">
                    <Profile />
                </template>
                <template v-else>
                    <NuxtLink
                        to="/signin"
                        id="nav-login"
                        class="text-sm font-semibold text-emerald-syariah px-4 py-2 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                        Masuk
                    </NuxtLink>
                    <NuxtLink
                        to="/signup"
                        id="nav-register"
                        class="bg-emerald-syariah text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all"
                    >
                        Daftar
                    </NuxtLink>
                </template>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Profile from '@/components/Profile.vue'
import { useAuthContext } from '@/lib/AuthContext'

const route = useRoute()
const { user } = useAuthContext()
</script>