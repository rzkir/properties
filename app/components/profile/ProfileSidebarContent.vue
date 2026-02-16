<template>
    <div class="space-y-6">
        <div class="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 text-center">
            <div class="relative inline-block mb-4">
                <UiAvatar
                    class="w-20 h-20 rounded-full border-4 border-emerald-50 shadow-md ring-2 ring-white overflow-hidden">
                    <UiAvatarImage v-if="hasPhotoURL" :src="user?.photoURL || ''" :alt="user?.displayName || 'Avatar'"
                        class="w-full h-full object-cover" @error="onImageError" />
                    <UiAvatarFallback class="bg-emerald-100 text-emerald-800 text-2xl font-bold">
                        {{ initials }}
                    </UiAvatarFallback>
                </UiAvatar>
                <div
                    class="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full border-2 border-white flex items-center justify-center">
                    <Icon name="lucide:check" class="text-[10px]" />
                </div>
            </div>
            <h2 class="text-lg font-bold text-emerald-syariah">{{ user?.displayName }}</h2>
            <p class="text-xs text-gray-400">
                {{ user?.role === 'admin' ? 'Admin' : 'Verified Platinum Member' }}
            </p>
        </div>

        <nav class="bg-white rounded-3xl p-2 shadow-soft border border-gray-100">
            <ul>
                <li>
                    <NuxtLink to="/profile" :class="linkClass('profile')" @click="onNavigate">
                        <Icon name="lucide:user" class="text-lg" />
                        Profil Saya
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile/wishlist" :class="linkClass('wishlist')" @click="onNavigate">
                        <Icon name="lucide:heart" class="text-lg" />
                        Wishlist Favorit
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile/riwayat" :class="linkClass('riwayat')" @click="onNavigate">
                        <Icon name="lucide:calendar-check" class="text-lg" />
                        Riwayat Booking
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile/settings" :class="linkClass('settings')" @click="onNavigate">
                        <Icon name="lucide:settings" class="text-lg" />
                        Pengaturan Akun
                    </NuxtLink>
                </li>
                <li class="pt-4 mt-4 border-t border-gray-50">
                    <button type="button"
                        class="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-colors"
                        @click="onSignOut">
                        <Icon name="lucide:log-out" class="text-lg" />
                        Keluar
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import UiAvatar from '@/components/ui/avatar/Avatar.vue'
import UiAvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import UiAvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'

const props = defineProps<{
    user: { displayName?: string; photoURL?: string; role?: string } | null
    initials: string
    activeItem?: 'profile' | 'wishlist' | 'riwayat' | 'settings'
}>()

const emit = defineEmits<{
    signOut: []
    navigate: []
}>()

const imageError = ref(false)

const hasPhotoURL = computed(() => {
    return !imageError.value && props.user?.photoURL && props.user.photoURL.trim() !== ''
})

function onImageError() {
    imageError.value = true
}

// Reset error saat photoURL berubah
watch(() => props.user?.photoURL, () => {
    imageError.value = false
})

function linkClass(item: 'profile' | 'wishlist' | 'riwayat' | 'settings') {
    return [
        'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
        props.activeItem === item
            ? 'nav-active shadow-lg shadow-emerald-900/10 text-white'
            : 'text-gray-500 hover:bg-gray-50'
    ]
}

function onNavigate() {
    emit('navigate')
}

function onSignOut() {
    emit('signOut')
}
</script>
