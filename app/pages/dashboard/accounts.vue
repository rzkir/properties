<template>
  <div class="space-y-6">
    <!-- Header -->
    <SectionHeader
      title="Daftar Akun"
      description="Kelola semua akun pengguna yang terdaftar di sistem"
      icon="lucide:users"
      :badge="loading ? undefined : `${accounts.length} akun`"
      :loading="loading"
      :stats="
        !loading && accounts.length > 0
          ? [
              { value: adminCount, label: 'admin', color: 'bg-primary' },
              {
                value: userCount,
                label: 'pengguna',
                color: 'bg-muted-foreground',
              },
            ]
          : []
      "
    />

    <!-- Table Card -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableHead class="font-semibold text-foreground">Foto</TableHead>
              <TableHead class="font-semibold text-foreground">Nama</TableHead>
              <TableHead class="font-semibold text-foreground">Email</TableHead>
              <TableHead class="font-semibold text-foreground"
                >No. WhatsApp</TableHead
              >
              <TableHead class="font-semibold text-foreground">Role</TableHead>
              <TableHead class="font-semibold text-foreground"
                >Dibuat</TableHead
              >
              <TableHead class="font-semibold text-foreground"
                >Diperbarui</TableHead
              >
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="i in 5" :key="i" class="hover:bg-transparent">
                <TableCell>
                  <Skeleton class="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-5 w-32" />
                </TableCell>
              </TableRow>
            </template>
            <TableRow
              v-else-if="accounts.length === 0"
              class="hover:bg-transparent"
            >
              <TableCell colspan="7" class="text-center py-12">
                <div class="flex flex-col items-center justify-center gap-2">
                  <Icon
                    name="lucide:inbox"
                    class="h-10 w-10 text-muted-foreground/50"
                  />
                  <p class="text-sm font-medium text-muted-foreground">
                    Tidak ada data akun
                  </p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              v-else
              v-for="account in accounts"
              :key="account.uid"
              class="transition-colors hover:bg-muted/50"
            >
              <TableCell>
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 rounded-full border-2 border-border bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <img
                      v-if="account.photoURL"
                      :src="account.photoURL"
                      :alt="account.displayName || 'User'"
                      class="w-full h-full object-cover"
                    />
                    <Icon
                      v-else
                      name="lucide:user"
                      class="h-5 w-5 text-muted-foreground/50"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell class="font-medium text-foreground">
                {{ account.displayName || "-" }}
              </TableCell>
              <TableCell class="text-muted-foreground">
                {{ account.email || "-" }}
              </TableCell>
              <TableCell class="text-muted-foreground">
                {{ account.phoneNumber || "-" }}
              </TableCell>
              <TableCell>
                <Badge
                  :variant="account.role === 'admin' ? 'default' : 'secondary'"
                  :class="
                    account.role === 'admin'
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : ''
                  "
                >
                  <Icon
                    :name="
                      account.role === 'admin'
                        ? 'lucide:shield-check'
                        : 'lucide:user'
                    "
                    class="mr-1.5 h-3 w-3"
                  />
                  {{ account.role === "admin" ? "Admin" : "Pengguna" }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground text-sm">
                {{
                  account.createdAt
                    ? new Date(account.createdAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"
                }}
              </TableCell>
              <TableCell class="text-muted-foreground text-sm">
                {{
                  account.updatedAt
                    ? new Date(account.updatedAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"
                }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { apiFetch, getApiSecret } from "@/lib/config";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

useHead({
  title: "Daftar Akun | SyariahPro",
});

interface Account {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  role: string;
  createdAt: string | null;
  updatedAt: string | null;
}

const accounts = ref<Account[]>([]);
const loading = ref(true);

const adminCount = computed(() => {
  return accounts.value.filter((acc) => acc.role === "admin").length;
});

const userCount = computed(() => {
  return accounts.value.filter((acc) => acc.role === "user").length;
});

async function fetchAccounts() {
  loading.value = true;
  try {
    const response = await apiFetch<{ data: Account[] }>("/accounts", {
      headers: {
        "x-api-secret": getApiSecret(),
      },
    });
    accounts.value = response.data;
  } catch (error: any) {
    console.error("[accounts] Fetch error:", error);
    // Show error toast if available
    if (error?.data?.message) {
      console.error("[accounts] Error message:", error.data.message);
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAccounts();
});
</script>
