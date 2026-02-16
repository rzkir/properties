<template>
    <div class="min-h-full flex flex-col">
        <!-- Auth loading: Full-page loading screen -->
        <Loading v-if="auth.loading.value" />

        <!-- Guest: full-page "Akses Login Profil" (header + card + footer, no container) -->
        <ProfileAksesLogin v-else-if="!user" />

        <!-- Sudah login tapi role bukan user -->
        <main v-else-if="!canAccessProfile" class="grow container mx-auto px-4 md:px-6 py-10">
            <ProfileBlockingRole :show-login-button="false" />
        </main>

        <!-- Dashboard: sidebar + main content (hanya untuk user yang sudah login dan role user) -->
        <main v-else class="grow container mx-auto px-4 md:px-6 py-10">
            <div class="grid grid-cols-12 gap-8">
                <ProfileSidebar :active-item="activeItem" />
                <div class="col-span-12 lg:col-span-9 space-y-6">
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAuthContext } from '@/services/useStateAuth'
import { Role } from '@/lib/role'
import ProfileBlockingRole from '@/components/profile/BlockingRole.vue'

const auth = useAuthContext()
const { user } = auth

const route = useRoute()

/** Hanya role "user" yang sudah login boleh akses profil. */
const canAccessProfile = computed(() => {
    const u = user.value
    return u !== null && u.role === Role.USER
})

const activeItem = computed<'profile' | 'wishlist' | 'riwayat' | 'settings'>(() => {
    const path = route.path
    if (path.includes('settings')) return 'settings'
    if (path.includes('riwayat')) return 'riwayat'
    if (path.includes('wishlist')) return 'wishlist'
    return 'profile' // /profile -> Profil Saya
})
</script>
