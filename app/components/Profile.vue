<template>
    <div class="relative" ref="profileRef">
        <button
            type="button"
            id="profile-trigger"
            class="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-syariah focus-visible:ring-offset-2"
            aria-haspopup="true"
            :aria-expanded="open"
            @click="open = !open"
        >
            <UiAvatar class="size-9 ring-2 ring-gray-100">
                <UiAvatarImage
                    v-if="user?.photoURL"
                    :src="user.photoURL"
                    :alt="user.displayName"
                />
                <UiAvatarFallback class="bg-emerald-100 text-emerald-800 text-sm font-semibold">
                    {{ initials }}
                </UiAvatarFallback>
            </UiAvatar>
        </button>

        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-show="open"
                class="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
                role="menu"
            >
                <div class="border-b border-gray-100 px-4 py-3">
                    <p class="truncate text-sm font-semibold text-gray-900">
                        {{ user?.displayName }}
                    </p>
                    <p class="truncate text-xs text-gray-500">
                        {{ user?.email }}
                    </p>
                </div>
                <NuxtLink
                    :to="user?.role === 'admin' ? '/dashboard' : '/profile'"
                    :id="user?.role === 'admin' ? 'dashboard-link' : 'profile-link'"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                    @click="open = false"
                >
                    <Icon :name="user?.role === 'admin' ? 'lucide:layout-dashboard' : 'lucide:user'" class="size-4 text-gray-400" />
                    {{ user?.role === 'admin' ? 'Dashboard' : 'Profil' }}
                </NuxtLink>
                <button
                    type="button"
                    id="profile-signout"
                    class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    role="menuitem"
                    @click="onSignOut"
                >
                    <Icon name="lucide:log-out" class="size-4" />
                    Keluar
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import UiAvatar from '@/components/ui/avatar/Avatar.vue'
import UiAvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import UiAvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import { useAuthContext } from '@/lib/AuthContext'
import { onClickOutside } from '@vueuse/core'

const { user, signOut } = useAuthContext()
const profileRef = ref<HTMLElement | null>(null)
const open = ref(false)

onClickOutside(profileRef, () => {
    open.value = false
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

const onSignOut = async () => {
    open.value = false
    await signOut()
}
</script>
