<template>
  <div class="space-y-6">
    <SectionHeader
      title="Profil Admin"
      description="Informasi akun administrator yang sedang masuk"
      icon="lucide:user-cog"
    />

    <div
      class="rounded-lg border bg-card p-6 md:p-8 shadow-sm space-y-6"
    >
      <!-- Header profil -->
      <div class="flex items-center gap-6">
        <div class="relative shrink-0">
          <div
            class="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-border bg-muted flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="(form.photoURL || user?.photoURL) && !photoLoadError"
              :src="form.photoURL || user?.photoURL"
              alt="Foto profil admin"
              class="w-full h-full object-cover"
              @error="photoLoadError = true"
            />
            <Icon
              v-else
              name="lucide:user"
              class="text-4xl text-muted-foreground/50"
            />
          </div>
          <label
            class="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Icon name="lucide:camera" class="text-xl text-white" />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              class="sr-only"
              :disabled="uploadingPhoto"
              @change="onPhotoChange"
            />
          </label>
        </div>
        <div class="min-w-0 space-y-1">
          <p class="text-lg md:text-xl font-bold text-foreground truncate">
            {{ form.displayName || user?.displayName || "Admin" }}
          </p>
          <p class="text-xs font-semibold uppercase tracking-wide text-primary">
            {{ user?.role === "admin" ? "Administrator" : user?.role || "Pengguna" }}
          </p>
          <p class="text-xs md:text-sm text-muted-foreground truncate">
            {{ form.email || user?.email || "Email belum tersedia" }}
          </p>
        </div>
      </div>
      <div class="mt-2 text-xs text-muted-foreground">
        <p v-if="uploadingPhoto">Mengunggah foto profil...</p>
        <p v-else-if="profileErrors.photoURL" class="text-destructive">
          {{ profileErrors.photoURL }}
        </p>
      </div>

      <!-- Detail informasi -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div class="space-y-1">
          <p class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            Nama Lengkap
          </p>
          <p class="text-sm md:text-base font-medium text-foreground">
            {{ form.displayName || user?.displayName || "-" }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            Email
          </p>
          <p class="text-sm md:text-base font-medium text-foreground">
            {{ form.email || user?.email || "-" }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            Nomor WhatsApp
          </p>
          <p class="text-sm md:text-base font-medium text-foreground">
            {{ form.phoneNumber || user?.phoneNumber || "-" }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            Dibuat Pada
          </p>
          <p class="text-sm md:text-base font-medium text-foreground">
            {{
              user?.createdAt
                ? new Date(user.createdAt).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"
            }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            Terakhir Diperbarui
          </p>
          <p class="text-sm md:text-base font-medium text-foreground">
            {{
              user?.updatedAt
                ? new Date(user.updatedAt).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Ubah kata sandi -->
    <div class="rounded-lg border bg-card p-6 md:p-8 shadow-sm space-y-6">
      <div>
        <h2 class="text-base md:text-lg font-semibold text-foreground">
          Ubah Kata Sandi
        </h2>
        <p class="text-xs md:text-sm text-muted-foreground mt-1">
          Perbarui kata sandi akun admin Anda untuk menjaga keamanan.
        </p>
      </div>

      <form class="max-w-md space-y-4" @submit.prevent="updatePassword">
        <div class="space-y-2">
          <UiLabel
            for="admin-password-current"
            class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest"
          >
            Sandi Lama
          </UiLabel>
          <UiInput
            id="admin-password-current"
            v-model="password.current"
            type="password"
            placeholder="••••••••"
            class="w-full text-sm md:text-base"
            :class="
              passwordErrors.current
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            "
          />
          <p
            v-if="passwordErrors.current"
            class="text-[11px] text-destructive font-medium"
          >
            {{ passwordErrors.current }}
          </p>
        </div>

        <div class="space-y-2">
          <UiLabel
            for="admin-password-new"
            class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest"
          >
            Sandi Baru
          </UiLabel>
          <UiInput
            id="admin-password-new"
            v-model="password.new"
            type="password"
            placeholder="••••••••"
            class="w-full text-sm md:text-base"
            :class="
              passwordErrors.new
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            "
          />
          <p
            v-if="passwordErrors.new"
            class="text-[11px] text-destructive font-medium"
          >
            {{ passwordErrors.new }}
          </p>
          <div class="flex gap-1 h-1.5 mt-1">
            <div
              class="flex-1 rounded-full"
              :class="passwordStrength >= 1 ? 'bg-primary' : 'bg-muted'"
            />
            <div
              class="flex-1 rounded-full"
              :class="passwordStrength >= 2 ? 'bg-primary' : 'bg-muted'"
            />
            <div
              class="flex-1 rounded-full"
              :class="passwordStrength >= 3 ? 'bg-primary' : 'bg-muted'"
            />
          </div>
          <p
            class="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider"
          >
            Kekuatan Sandi: {{ passwordStrengthLabel }}
          </p>
        </div>

        <div class="space-y-2">
          <UiLabel
            for="admin-password-confirm"
            class="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest"
          >
            Konfirmasi Sandi Baru
          </UiLabel>
          <UiInput
            id="admin-password-confirm"
            v-model="password.confirm"
            type="password"
            placeholder="••••••••"
            class="w-full text-sm md:text-base"
            :class="
              passwordErrors.confirm
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            "
          />
          <p
            v-if="passwordErrors.confirm"
            class="text-[11px] text-destructive font-medium"
          >
            {{ passwordErrors.confirm }}
          </p>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Perbarui Kata Sandi
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileSettingsState } from "@/services/useStateAuth";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import UiInput from "@/components/ui/input/Input.vue";
import UiLabel from "@/components/ui/label/Label.vue";

useHead({
  title: "Profil Admin | SyariahPro",
});

const {
  user,
  form,
  photoLoadError,
  password,
  passwordStrength,
  passwordStrengthLabel,
  profileErrors,
  passwordErrors,
  uploadingPhoto,
  onPhotoChange,
  updatePassword,
} = useProfileSettingsState();
</script>
