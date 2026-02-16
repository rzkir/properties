<template>
  <div class="space-y-8">
    <!-- Edit Profil -->
    <section id="edit-profile">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah">
          <Icon name="lucide:user-cog" class="text-xl" />
        </div>
        <h2 class="text-3xl font-bold text-emerald-syariah">Edit Profil</h2>
      </div>
      <div class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-soft">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="saveProfile">
          <!-- Foto Profil -->
          <div class="md:col-span-2 space-y-2">
            <UiLabel class="text-xs font-bold text-gray-400 uppercase tracking-widest">Foto Profil</UiLabel>
            <div class="flex items-center gap-6">
              <div class="relative shrink-0">
                <div
                  class="w-24 h-24 rounded-2xl border-2 border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img v-if="form.photoURL" :src="form.photoURL" alt="Foto profil" class="w-full h-full object-cover" />
                  <Icon v-else name="lucide:user" class="text-4xl text-gray-300" />
                </div>
                <label
                  class="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Icon name="lucide:camera" class="text-2xl text-white" />
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only"
                    :disabled="uploadingPhoto" @change="onPhotoChange" />
                </label>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-700">Unggah foto profil (JPG, PNG, WebP, GIF, max 5MB)</p>
                <p v-if="uploadingPhoto" class="text-xs text-emerald-syariah font-medium mt-1">Mengunggah...</p>
                <p v-else-if="profileErrors.photoURL" class="text-xs text-red-500 font-medium mt-1">{{
                  profileErrors.photoURL }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="displayName" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap
            </UiLabel>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-syariah">
                <Icon name="lucide:user" class="text-lg" />
              </div>
              <UiInput id="displayName" v-model="form.displayName" type="text"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-500 outline-none transition-all"
                :class="profileErrors.displayName ? 'border-red-300' : 'border-gray-100'" />
            </div>
            <p v-if="profileErrors.displayName" class="text-xs text-red-500 font-medium">{{ profileErrors.displayName }}
            </p>
          </div>
          <div class="space-y-2">
            <UiLabel for="email" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Alamat Email
            </UiLabel>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-syariah">
                <Icon name="lucide:mail" class="text-lg" />
              </div>
              <UiInput id="email" v-model="form.email" type="email"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-500 outline-none transition-all"
                :class="profileErrors.email ? 'border-red-300' : 'border-gray-100'" :readonly="!!user?.email" />
            </div>
            <p v-if="profileErrors.email" class="text-xs text-red-500 font-medium">{{ profileErrors.email }}</p>
            <p v-else-if="user?.email" class="text-[10px] text-gray-400">Email login tidak dapat diubah dari sini.</p>
          </div>
          <div class="space-y-2">
            <UiLabel for="phoneNumber" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Nomor WhatsApp
            </UiLabel>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-syariah">
                <Icon name="lucide:phone" class="text-lg" />
              </div>
              <UiInput id="phoneNumber" v-model="form.phoneNumber" type="tel" placeholder="+62 812 3456 7890"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-500 outline-none transition-all"
                :class="profileErrors.phoneNumber ? 'border-red-300' : 'border-gray-100'" />
            </div>
            <p v-if="profileErrors.phoneNumber" class="text-xs text-red-500 font-medium">{{ profileErrors.phoneNumber }}
            </p>
          </div>
          <div class="space-y-2">
            <UiLabel for="areaDomisili" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Area Domisili
            </UiLabel>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-syariah">
                <Icon name="lucide:map-pin" class="text-lg" />
              </div>
              <UiInput id="areaDomisili" v-model="form.areaDomisili" type="text" placeholder="Kota / Kecamatan"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-500 outline-none transition-all"
                :class="profileErrors.areaDomisili ? 'border-red-300' : 'border-gray-100'" />
            </div>
            <p v-if="profileErrors.areaDomisili" class="text-xs text-red-500 font-medium">{{ profileErrors.areaDomisili
            }}</p>
          </div>
          <div class="md:col-span-2 pt-4">
            <button type="submit"
              class="bg-emerald-syariah text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Ubah Kata Sandi -->
    <section id="change-password">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah">
          <Icon name="lucide:lock" class="text-xl" />
        </div>
        <h2 class="text-3xl font-bold text-emerald-syariah">Ubah Kata Sandi</h2>
      </div>
      <div class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-soft">
        <form class="max-w-md space-y-6" @submit.prevent="updatePassword">
          <div class="space-y-2">
            <UiLabel for="password-current" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Sandi Lama
            </UiLabel>
            <UiInput id="password-current" v-model="password.current" type="password" placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 outline-none transition-all"
              :class="passwordErrors.current ? 'border-red-300' : 'border-gray-100'" />
            <p v-if="passwordErrors.current" class="text-xs text-red-500 font-medium">{{ passwordErrors.current }}</p>
          </div>
          <div class="space-y-2">
            <UiLabel for="password-new" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Sandi Baru
            </UiLabel>
            <UiInput id="password-new" v-model="password.new" type="password" placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 outline-none transition-all"
              :class="passwordErrors.new ? 'border-red-300' : 'border-gray-100'" />
            <p v-if="passwordErrors.new" class="text-xs text-red-500 font-medium">{{ passwordErrors.new }}</p>
            <div class="flex gap-1 h-1.5 mt-2">
              <div class="flex-1 rounded-full" :class="passwordStrength >= 1 ? 'bg-green-500' : 'bg-gray-200'" />
              <div class="flex-1 rounded-full" :class="passwordStrength >= 2 ? 'bg-green-500' : 'bg-gray-200'" />
              <div class="flex-1 rounded-full" :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'" />
            </div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Kekuatan Sandi: {{ passwordStrengthLabel }}
            </p>
          </div>
          <div class="space-y-2">
            <UiLabel for="password-confirm" class="text-xs font-bold text-gray-400 uppercase tracking-widest">Konfirmasi
              Sandi Baru</UiLabel>
            <UiInput id="password-confirm" v-model="password.confirm" type="password" placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-800/20 outline-none transition-all"
              :class="passwordErrors.confirm ? 'border-red-300' : 'border-gray-100'" />
            <p v-if="passwordErrors.confirm" class="text-xs text-red-500 font-medium">{{ passwordErrors.confirm }}</p>
          </div>
          <button type="submit"
            class="bg-emerald-syariah text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all">
            Perbarui Kata Sandi
          </button>
        </form>
      </div>
    </section>

    <!-- Notifikasi & 2FA -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section id="notifications" class="space-y-6">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-syariah">
              <Icon name="lucide:bell" />
            </div>
            <h3 class="text-xl font-bold text-emerald-syariah">Notifikasi Email</h3>
          </div>
          <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft space-y-5">
            <div class="flex items-center justify-between">
              <div class="pr-4">
                <p class="text-sm font-bold text-gray-800">Update Properti Baru</p>
                <p class="text-[11px] text-gray-400">Info unit terbaru sesuai preferensi Anda</p>
              </div>
              <label class="toggle-switch">
                <input v-model="notif.updateProperti" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div class="pr-4">
                <p class="text-sm font-bold text-gray-800">Promo Eksklusif</p>
                <p class="text-[11px] text-gray-400">Penawaran khusus dan diskon akad</p>
              </div>
              <label class="toggle-switch">
                <input v-model="notif.promoEksklusif" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div class="pr-4">
                <p class="text-sm font-bold text-gray-800">Pesan Marketing</p>
                <p class="text-[11px] text-gray-400">Notifikasi chat dari agen properti</p>
              </div>
              <label class="toggle-switch">
                <input v-model="notif.pesanMarketing" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section id="security" class="space-y-6">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-syariah">
              <Icon name="lucide:shield-check" />
            </div>
            <h3 class="text-xl font-bold text-emerald-syariah">Keamanan 2FA</h3>
          </div>
          <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft">
            <div class="flex items-center justify-between mb-6">
              <div>
                <p class="text-sm font-bold text-gray-800">Autentikasi Dua Faktor</p>
                <p class="text-[11px] text-gray-400">
                  Status:
                  <span
                    :class="twoFaEnabled ? 'text-green-600 font-bold uppercase' : 'text-red-500 font-bold uppercase'">
                    {{ twoFaEnabled ? 'Aktif' : 'Belum Aktif' }}
                  </span>
                </p>
              </div>
              <label class="toggle-switch">
                <input v-model="twoFaEnabled" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
            <div class="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
              <div
                class="w-16 h-16 bg-white border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="lucide:qr-code" class="text-3xl text-gray-200" />
              </div>
              <p class="text-xs text-gray-500">
                Scan QR code menggunakan Google Authenticator untuk mengaktifkan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Privasi Data -->
    <section id="privacy">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah">
          <Icon name="lucide:eye-off" class="text-xl" />
        </div>
        <h2 class="text-3xl font-bold text-emerald-syariah">Privasi Data</h2>
      </div>
      <div class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-soft">
        <div class="space-y-4">
          <label class="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
            <input v-model="privacy.profilPublik" type="checkbox"
              class="w-5 h-5 mt-0.5 rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
            <div>
              <p class="text-sm font-bold text-gray-800">Profil Publik</p>
              <p class="text-xs text-gray-400">
                Izinkan developer melihat profil dasar Anda saat melakukan booking
              </p>
            </div>
          </label>
          <label class="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
            <input v-model="privacy.tampilkanAktivitas" type="checkbox"
              class="w-5 h-5 mt-0.5 rounded border-gray-300 text-emerald-syariah focus:ring-emerald-syariah" />
            <div>
              <p class="text-sm font-bold text-gray-800">Tampilkan Aktivitas</p>
              <p class="text-xs text-gray-400">
                Tampilkan unit yang baru saja Anda lihat di beranda personal
              </p>
            </div>
          </label>
        </div>
      </div>
    </section>

    <!-- Danger zone -->
    <section id="danger-zone" class="pt-8">
      <div
        class="bg-red-50 border border-red-100 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
            <Icon name="lucide:trash-2" class="text-3xl" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-red-700">Hapus Akun Selamanya</h3>
            <p class="text-sm text-red-600/80 max-w-md">
              Tindakan ini tidak dapat dibatalkan. Seluruh riwayat booking dan wishlist Anda akan dihapus dari sistem
              kami secara permanen.
            </p>
          </div>
        </div>
        <button type="button"
          class="whitespace-nowrap bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/10"
          @click="confirmDeleteAccount">
          Hapus Akun
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthContext } from '@/lib/AuthContext'
import {
  profileFormSchema,
  changePasswordSchema,
  getFirstErrors,
} from '@/lib/validation'
import UiInput from '@/components/ui/input/Input.vue'
import UiLabel from '@/components/ui/label/Label.vue'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { getFirebaseDb, getFirebaseAuth } from '@/lib/firebase'

useHead({
  title: 'Pengaturan Akun | SyariahPro',
})

const auth = useAuthContext()
const { user, signOut } = auth

const form = reactive({
  displayName: '',
  email: '',
  phoneNumber: '',
  areaDomisili: '',
  photoURL: '',
})

watch(
  user,
  (u) => {
    if (u) {
      form.displayName = u.displayName ?? ''
      form.email = u.email ?? ''
      form.phoneNumber = u.phoneNumber ?? ''
      form.areaDomisili = '' // not in Accounts; could load from Firestore preferences
      form.photoURL = u.photoURL ?? ''
    }
  },
  { immediate: true },
)

const password = reactive({
  current: '',
  new: '',
  confirm: '',
})

const passwordStrength = computed(() => {
  const p = password.new
  if (!p.length) return 0
  let s = 0
  if (p.length >= 6) s++
  if (p.length >= 10 || /[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) s++
  return Math.min(3, s + (p.length >= 8 ? 1 : 0))
})

const passwordStrengthLabel = computed(() => {
  const s = passwordStrength.value
  return s === 0 ? '—' : s === 1 ? 'Lemah' : s === 2 ? 'Sedang' : 'Kuat'
})

watch(form, () => { profileErrors.value = {} }, { deep: true })
watch(password, () => { passwordErrors.value = {} }, { deep: true })

const notif = reactive({
  updateProperti: true,
  promoEksklusif: false,
  pesanMarketing: true,
})

const twoFaEnabled = ref(false)

const privacy = reactive({
  profilPublik: true,
  tampilkanAktivitas: false,
})

const profileErrors = ref<Record<string, string>>({})
const passwordErrors = ref<Record<string, string>>({})
const uploadingPhoto = ref(false)

const runtimeConfig = useRuntimeConfig()

async function onPhotoChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const currentUser = user.value
  if (!currentUser?.id) {
    profileErrors.value = { ...profileErrors.value, photoURL: 'User tidak ditemukan' }
    return
  }

  uploadingPhoto.value = true
  profileErrors.value = { ...profileErrors.value, photoURL: '' }
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await $fetch<{ url: string }>(runtimeConfig.public.apiUrl as string, {
      method: 'POST',
      body: formData,
      headers: {
        'x-api-secret': runtimeConfig.public.apiSecret as string,
      },
    })

    const photoURL = res.url
    form.photoURL = photoURL

    // Update Firestore accounts collection
    const db = getFirebaseDb()
    if (db) {
      const accountsRef = doc(db, 'accounts', currentUser.id)
      await setDoc(
        accountsRef,
        {
          photoURL: photoURL ?? null,
          updatedAt: Timestamp.now(),
          uid: currentUser.id,
        },
        { merge: true }
      )
    }

    // Update Firebase Auth user photoURL
    const authInstance = getFirebaseAuth()
    if (authInstance?.currentUser) {
      await updateProfile(authInstance.currentUser, {
        photoURL: photoURL,
      })
    }

    // Update local user state
    if (user.value) {
      user.value.photoURL = photoURL
    }
  } catch (e: any) {
    profileErrors.value = { ...profileErrors.value, photoURL: e?.data?.message ?? 'Gagal mengunggah foto' }
  } finally {
    uploadingPhoto.value = false
    input.value = ''
  }
}

function saveProfile() {
  const result = profileFormSchema.safeParse(form)
  profileErrors.value = getFirstErrors(result)
  if (!result.success) return
  // TODO: persist to Firestore accounts/{uid} (displayName, phoneNumber) and preferences (areaDomisili)
  console.log('Save profile', result.data)
}

function updatePassword() {
  const result = changePasswordSchema.safeParse(password)
  passwordErrors.value = getFirstErrors(result)
  if (!result.success) return
  // TODO: Firebase reauthenticate + updatePassword
  console.log('Update password')
}

async function confirmDeleteAccount() {
  if (typeof window === 'undefined') return
  if (!confirm('Yakin ingin menghapus akun permanen? Tindakan ini tidak dapat dibatalkan.')) return
  // TODO: delete Firestore account + Firebase auth user
  await signOut()
  await navigateTo('/signin')
}
</script>
