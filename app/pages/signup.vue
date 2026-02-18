<template>
    <main
        class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px]">
        <div class="w-full max-w-xl md:max-w-2xl space-y-20">
            <!-- Header Text -->
            <div class="text-center">
                <h1 class="text-3xl sm:text-4xl font-bold text-emerald-syariah mb-4 leading-tight">
                    Mulai Langkah Berkah Anda
                </h1>
                <p class="text-gray-500 text-sm sm:text-base font-medium">
                    Temukan hunian syariah terbaik tanpa riba untuk keluarga tercinta.
                </p>
            </div>

            <!-- Registration Card -->
            <section
                class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-soft border border-gray-100 space-y-6">
                <form class="space-y-6" @submit.prevent="onSubmit">
                    <!-- Nama Lengkap -->
                    <div class="space-y-3">
                        <UiLabel for="name"
                            class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.16em] px-1">
                            Nama Lengkap
                        </UiLabel>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Icon name="lucide:user" class="text-xl" />
                            </div>
                            <UiInput id="name" v-model="name" name="name" type="text" required
                                placeholder="Masukkan nama lengkap sesuai KTP"
                                class="pl-11 h-12 rounded-2xl bg-gray-50 border-gray-100 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-syariah" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="space-y-3">
                        <UiLabel for="email"
                            class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.16em] px-1">
                            Alamat Email
                        </UiLabel>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Icon name="lucide:mail" class="text-xl" />
                            </div>
                            <UiInput id="email" v-model="email" name="email" type="email" autocomplete="email" required
                                placeholder="contoh@email.com"
                                class="pl-11 h-12 rounded-2xl bg-gray-50 border-gray-100 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-syariah" />
                        </div>
                    </div>

                    <!-- Nomor WhatsApp -->
                    <div class="space-y-3">
                        <UiLabel for="phone"
                            class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.16em] px-1">
                            Nomor WhatsApp
                        </UiLabel>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Icon name="lucide:phone" class="text-xl" />
                            </div>
                            <UiInput id="phone" v-model="phone" name="phone" type="tel" required
                                placeholder="0812 XXXX XXXX"
                                class="pl-11 h-12 rounded-2xl bg-gray-50 border-gray-100 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-syariah" />
                        </div>
                    </div>

                    <!-- Password & Confirm -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <UiLabel for="password"
                                class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.16em] px-1">
                                Kata Sandi
                            </UiLabel>
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Icon name="lucide:lock" class="text-xl" />
                                </div>
                                <UiInput id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                    autocomplete="new-password" required placeholder="••••••••"
                                    class="pl-11 pr-11 h-12 rounded-2xl bg-gray-50 border-gray-100 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-syariah" />
                                <button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    :aria-label="showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'"
                                    @click="showPassword = !showPassword">
                                    <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="text-xl" />
                                </button>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <UiLabel for="confirm-password"
                                class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.16em] px-1">
                                Ulangi Sandi
                            </UiLabel>
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Icon name="lucide:lock" class="text-xl" />
                                </div>
                                <UiInput id="confirm-password" v-model="confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    autocomplete="new-password" required placeholder="••••••••"
                                    class="pl-11 pr-11 h-12 rounded-2xl bg-gray-50 border-gray-100 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-syariah" />
                                <button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    :aria-label="showConfirmPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'"
                                    @click="showConfirmPassword = !showConfirmPassword">
                                    <Icon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'"
                                        class="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Terms -->
                    <div class="flex items-start gap-3 px-1">
                        <div class="flex items-center h-5">
                            <input id="terms" v-model="agreeTerms" name="terms" type="checkbox" required
                                class="focus:ring-emerald-syariah h-4 w-4 text-emerald-syariah border-gray-300 rounded" />
                        </div>

                        <p class="text-xs leading-5 text-gray-500">
                            <label for="terms" class="cursor-pointer">
                                Saya setuju dengan
                                <NuxtLink to="#" class="text-emerald-syariah font-bold hover:underline">
                                    Syarat &amp; Ketentuan
                                </NuxtLink>
                                serta
                                <NuxtLink to="#" class="text-emerald-syariah font-bold hover:underline">
                                    Kebijakan Privasi
                                </NuxtLink>
                                SyariahPro.
                            </label>
                        </p>
                    </div>

                    <!-- Submit -->
                    <UiButton id="btn-submit-register" type="submit" variant="default"
                        class="group relative w-full justify-center text-sm font-bold rounded-full bg-emerald-syariah hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 transition-colors py-6">
                        Daftar Sekarang
                        <Icon name="lucide:arrow-right"
                            class="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1" />
                    </UiButton>
                </form>

                <!-- Footer link -->
                <div class="pt-6 text-center text-sm font-medium">
                    <span class="text-gray-500">Sudah memiliki akun?</span>
                    <NuxtLink to="/signin" class="text-emerald-syariah font-bold hover:underline ml-1">
                        Masuk di sini
                    </NuxtLink>
                </div>
            </section>

            <!-- Trust indicators -->
            <section
                class="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 opacity-60 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
                <div class="flex items-center gap-2">
                    <Icon name="lucide:shield-check" class="text-xl" />
                    <span>Data Terenkripsi</span>
                </div>
                <div class="flex items-center gap-2">
                    <Icon name="lucide:check-circle" class="text-xl" />
                    <span>Terverifikasi Syariah</span>
                </div>
                <div class="flex items-center gap-2">
                    <Icon name="lucide:user-check" class="text-xl" />
                    <span>Anti Riba &amp; Denda</span>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/input/Input.vue'
import UiButton from '@/components/ui/button/Button.vue'
import UiLabel from '@/components/ui/label/Label.vue'
import { useSignUpState } from '@/services/useStateAuth'

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const {
    name,
    email,
    phone,
    password,
    confirmPassword,
    agreeTerms,
    loading,
    onSubmit,
} = useSignUpState()

useHead({
    title: 'Registrasi | Direktori Properti Syariah'
})
</script>