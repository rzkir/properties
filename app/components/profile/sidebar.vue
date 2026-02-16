<template>
    <!-- Desktop: sidebar sticky saat scroll -->
    <aside class="hidden lg:block col-span-12 lg:col-span-3 lg:sticky lg:top-0 lg:self-start space-y-6">
        <ProfileSidebarContent :user="user" :initials="initials" :active-item="activeItem" @sign-out="onSignOut" />
    </aside>

    <!-- Mobile: tombol menu + sheet navigasi (sticky di atas) -->
    <div
        class="lg:hidden col-span-12 flex items-center gap-4 sticky top-0 z-30 bg-white/95 backdrop-blur-sm py-2 -mx-4 px-4 md:-mx-6 md:px-6 rounded-xl">
        <Sheet v-model:open="sheetOpen">
            <SheetTrigger as-child>
                <button type="button"
                    class="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-soft text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                    <Icon name="lucide:menu" class="text-xl" />
                    Menu Profil
                </button>
            </SheetTrigger>
            <SheetContent side="left" class="w-[min(320px,85vw)] border-0 shadow-xl">
                <div class="space-y-6 pt-2">
                    <ProfileSidebarContent :user="user" :initials="initials" :active-item="activeItem"
                        @sign-out="onSignOut" @navigate="sheetOpen = false" />
                </div>
            </SheetContent>
        </Sheet>
        <span class="text-sm font-medium text-gray-500 truncate">
            {{ activeLabel }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthContext } from '@/services/useStateAuth'

const props = defineProps<{
    activeItem?: 'profile' | 'wishlist' | 'riwayat' | 'settings'
}>()

const auth = useAuthContext()
const { user, signOut } = auth
const route = useRoute()

const sheetOpen = ref(false)

watch(() => route.path, () => {
    sheetOpen.value = false
})

const initials = computed(() => {
    const name = user.value?.displayName?.trim()
    if (!name) return '?'
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
        const first = parts[0]?.[0] ?? ''
        const last = parts[parts.length - 1]?.[0] ?? ''
        return (first + last).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
})

const activeLabel = computed(() => {
    const labels: Record<string, string> = {
        profile: 'Profil Saya',
        wishlist: 'Wishlist Favorit',
        riwayat: 'Riwayat Booking',
        settings: 'Pengaturan Akun'
    }
    return labels[props.activeItem ?? 'profile'] ?? 'Profil'
})

async function onSignOut() {
    await signOut()
    await navigateTo('/signin')
}
</script>
