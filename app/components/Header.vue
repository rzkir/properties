<template>
  <header
    class="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 shadow-sm"
  >
    <div
      class="container mx-auto px-4 md:px-6 flex items-center justify-between"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <div
          class="w-10 h-10 bg-emerald-syariah rounded-lg flex items-center justify-center"
        >
          <Icon name="lucide:home" class="text-white text-xl" />
        </div>
        <span
          class="text-xl font-bold tracking-tight text-emerald-syariah uppercase"
        >
          SYARIAH<span class="text-[#D4AF37]">PRO</span>
        </span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          to="/"
          id="nav-home"
          :class="[
            'text-sm transition-colors',
            route.path === '/'
              ? 'font-semibold text-emerald-syariah border-b-2 border-[#D4AF37] pb-1'
              : 'font-medium text-gray-600 hover:text-emerald-syariah',
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
              : 'font-medium text-gray-600 hover:text-emerald-syariah',
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
              : 'font-medium text-gray-600 hover:text-emerald-syariah',
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
              : 'font-medium text-gray-600 hover:text-emerald-syariah',
          ]"
        >
          FAQ
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <template v-if="user">
          <div class="hidden md:block">
            <Profile />
          </div>
        </template>
        <template v-else>
          <NuxtLink
            class="hidden md:inline-flex text-sm font-semibold text-emerald-syariah px-4 py-2 hover:bg-emerald-50 rounded-lg transition-all"
            to="/signin"
            id="nav-login"
          >
            Masuk
          </NuxtLink>
          <NuxtLink
            class="hidden md:inline-flex bg-emerald-syariah text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all"
            to="/signup"
            id="nav-register"
          >
            Daftar
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>

  <!-- Mobile bottom navigation (responsive) -->
  <nav
    class="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 bg-[#0f1318] rounded-2xl px-3 py-2 shadow-2xl shadow-black/30 border border-white/5 w-[calc(100vw-1rem)] max-w-md"
    aria-label="Mobile navigation"
  >
    <div class="grid grid-cols-5 gap-2">
      <NuxtLink
        to="/"
        class="w-full h-11 rounded-xl flex items-center justify-center transition-colors"
        :class="
          isActive('/')
            ? 'bg-emerald-syariah text-white'
            : 'text-gray-200/80 hover:text-white'
        "
        aria-label="Beranda"
      >
        <Icon name="lucide:home" class="text-xl leading-none" />
      </NuxtLink>

      <NuxtLink
        to="/search"
        class="w-full h-11 rounded-xl flex items-center justify-center transition-colors"
        :class="
          isActive('/search')
            ? 'bg-emerald-syariah text-white'
            : 'text-gray-200/80 hover:text-white'
        "
        aria-label="Cari Properti"
      >
        <Icon name="lucide:search" class="text-xl leading-none" />
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="w-full h-11 rounded-xl flex items-center justify-center transition-colors"
        :class="
          isActive('/about')
            ? 'bg-emerald-syariah text-white'
            : 'text-gray-200/80 hover:text-white'
        "
        aria-label="Tentang Kami"
      >
        <Icon name="lucide:map" class="text-xl leading-none" />
      </NuxtLink>

      <NuxtLink
        to="/faqs"
        class="w-full h-11 rounded-xl flex items-center justify-center transition-colors"
        :class="
          isActive('/faqs')
            ? 'bg-emerald-syariah text-white'
            : 'text-gray-200/80 hover:text-white'
        "
        aria-label="FAQ"
      >
        <Icon name="lucide:help-circle" class="text-xl leading-none" />
      </NuxtLink>

      <NuxtLink
        :to="profileHref"
        class="w-full h-11 rounded-xl flex items-center justify-center transition-colors"
        :class="
          isProfileActive
            ? 'bg-emerald-syariah text-white'
            : 'text-gray-200/80 hover:text-white'
        "
        :aria-label="user ? (isAdmin ? 'Dashboard' : 'Profil') : 'Masuk'"
      >
        <Icon name="lucide:user" class="text-xl leading-none" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Profile from "@/components/Profile.vue";
import { useAuthContext } from "@/lib/AuthContext";

const route = useRoute();
const { user } = useAuthContext();

const isActive = (path: string) => route.path === path;
const isAdmin = computed(() => user.value?.role === "admin");

const profileHref = computed(() => {
  if (!user.value) return "/signin";
  return isAdmin.value ? "/dashboard" : "/profile";
});

const isProfileActive = computed(() => {
  return (
    route.path === "/profile" ||
    route.path.startsWith("/profile/") ||
    route.path === "/dashboard" ||
    route.path.startsWith("/dashboard/")
  );
});
</script>
