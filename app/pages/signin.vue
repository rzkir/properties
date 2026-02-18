<template>
    <main class="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[#FBFBF9]">
        <div
            class="max-w-sm sm:max-w-md w-full space-y-8 bg-white px-6 py-8 md:px-8 md:py-10 rounded-4xl shadow-xl shadow-gray-200/50 border border-gray-50">
            <!-- Heading -->
            <div class="text-center">
                <h1 class="text-3xl font-bold text-emerald-syariah tracking-tight">
                    Selamat Datang Kembali
                </h1>
                <p class="mt-3 text-sm text-gray-500">
                    Silakan masuk ke akun Anda untuk melanjutkan pencarian properti syariah idaman.
                </p>
            </div>

            <!-- Form -->
            <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
                <div class="space-y-5">
                    <!-- Email -->
                    <div class="space-y-2">
                        <UiLabel for="email" class="text-gray-700">
                            Alamat Email
                        </UiLabel>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon name="lucide:mail" class="text-gray-400 text-xl" />
                            </div>
                            <UiInput id="email" v-model="email" name="email" type="email" autocomplete="email" required
                                placeholder="Email Anda"
                                class="pl-11 h-12 rounded-2xl bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="space-y-2">
                        <UiLabel for="password" class="text-gray-700">
                            Kata Sandi
                        </UiLabel>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon name="lucide:lock" class="text-gray-400 text-xl" />
                            </div>
                            <UiInput id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                autocomplete="current-password" required placeholder="Kata Sandi"
                                class="pl-11 h-12 rounded-2xl bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600 pr-11" />
                            <button type="button"
                                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600"
                                @click="togglePassword">
                                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Remember & Forgot -->
                <div class="flex items-center justify-between text-xs sm:text-sm">
                    <label class="flex items-center cursor-pointer select-none gap-2">
                        <input id="remember-me" v-model="rememberMe" name="remember-me" type="checkbox"
                            class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded-md cursor-pointer" />
                        <span class="block text-gray-600">
                            Ingat saya
                        </span>
                    </label>

                    <NuxtLink to="#" id="forgot-password-link"
                        class="font-semibold text-emerald-syariah hover:text-emerald-800 transition-colors"
                        @click.prevent="onForgotPassword">
                        Lupa kata sandi?
                    </NuxtLink>
                </div>

            <!-- Submit -->
            <div class="pt-1">
                    <UiButton id="btn-submit-login" type="submit" variant="default"
                        class="group relative w-full justify-center text-sm font-bold rounded-full bg-emerald-syariah hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5 py-3.5">
                        Masuk Sekarang
                    </UiButton>
                </div>
            </form>

            <!-- Footer link -->
            <p class="pt-4 text-center text-sm text-gray-600">
                Belum punya akun?
                <NuxtLink to="/signup" id="footer-register-link"
                    class="font-bold text-emerald-syariah hover:text-emerald-800 transition-colors underline underline-offset-4 decoration-emerald-200">
                    Daftar di sini
                </NuxtLink>
            </p>
        </div>
    </main>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/input/Input.vue'
import UiButton from '@/components/ui/button/Button.vue'
import UiLabel from '@/components/ui/label/Label.vue'
import { useSignInState } from '@/services/useStateAuth'

const {
    email,
    password,
    rememberMe,
    showPassword,
    loading,
    togglePassword,
    onSubmit,
    onForgotPassword,
} = useSignInState()

useHead({
    title: 'Masuk | SyariahPro Indonesia'
})
</script>