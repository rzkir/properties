<template>
  <div class="min-h-full flex flex-col">
    <!-- Auth loading -->
    <Loading v-if="auth.loading.value" />

    <!-- Guest atau bukan admin: blok akses dashboard -->
    <main
      v-else-if="!canAccessDashboard"
      class="grow container mx-auto px-4 md:px-6 py-10 flex items-center justify-center"
    >
      <div class="text-center space-y-2">
        <p class="text-lg font-semibold">
          Anda tidak memiliki akses ke dashboard.
        </p>
        <p class="text-sm text-muted-foreground">
          Silakan login sebagai admin untuk melanjutkan.
        </p>
      </div>
    </main>

    <!-- Admin: layout dashboard + sidebar -->
    <main v-else class="grow flex flex-col">
      <SidebarProvider
        :style="{
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        }"
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div class="flex flex-1 flex-col">
            <div class="@container/main flex flex-1 flex-col gap-2">
              <div class="flex flex-col gap-4 py-4 px-4">
                <slot />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import AppSidebar from "@/components/AppSidebar.vue";

import SiteHeader from "@/components/SiteHeader.vue";

import { Role } from "@/lib/role";

import { useAuthContext } from "@/services/useStateAuth";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const auth = useAuthContext();

const { user } = auth;

const canAccessDashboard = computed(() => {
  const u = user.value;
  return u !== null && u.role === Role.ADMIN;
});
</script>
