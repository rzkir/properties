<script setup lang="ts">
import { computed } from "vue";

import { IconDotsVertical, IconLogout } from "@tabler/icons-vue";

import { toast } from "vue-sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAuthContext } from "@/services/useStateAuth";

const { isMobile } = useSidebar();
const auth = useAuthContext();
const { user, signOut } = auth;

const currentUser = computed(() => {
  const u = user.value;
  if (!u) {
    return {
      name: "Guest",
      email: "-",
      avatar: "",
    };
  }
  return {
    name: u.displayName ?? "User",
    email: u.email ?? "-",
    avatar: u.photoURL ?? "",
  };
});

const router = useRouter();

const onLogout = async () => {
  try {
    await signOut();
    await router.push("/signin");
  } catch {
    toast.error("Gagal keluar. Silakan coba lagi.");
  }
};
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg grayscale">
              <AvatarImage :src="currentUser.avatar" :alt="currentUser.name" />
              <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ currentUser.name }}</span>
              <span class="text-muted-foreground truncate text-xs">
                {{ currentUser.email }}
              </span>
            </div>
            <IconDotsVertical class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
          align="end"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                />
                <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{{ currentUser.name }}</span>
                <span class="text-muted-foreground truncate text-xs">
                  {{ currentUser.email }}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onLogout">
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>