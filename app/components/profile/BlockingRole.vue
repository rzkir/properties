<template>
    <div class="w-full min-h-[70vh] flex items-center justify-center py-20 px-4 md:px-6 islamic-pattern bg-(--cream)">
        <div
            class="max-w-2xl w-full bg-white rounded-[40px] p-8 md:p-12 lg:p-16 shadow-soft border border-gray-100 relative overflow-hidden text-center">
            <!-- Gradient bar -->
            <div class="absolute top-0 left-0 w-full h-2 rounded-t-[40px] blocking-role-gradient" />

            <div class="relative z-10">
                <!-- Icon -->
                <div
                    class="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6 md:mb-8 shadow-inner">
                    <Icon name="lucide:shield-alert" class="text-4xl md:text-5xl" />
                </div>

                <!-- Title -->
                <h1 class="text-3xl md:text-4xl font-bold text-emerald-syariah mb-3 md:mb-4 serif leading-tight">
                    Akses Dibatasi:<br />
                    <span class="italic font-normal text-gold-syariah">Khusus Anggota Terdaftar</span>
                </h1>

                <p class="text-gray-500 mb-8 md:mb-10 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                    Maaf, halaman profil pribadi ini hanya dapat diakses oleh pengguna dengan peran
                    <span class="font-bold text-emerald-syariah">'User'</span>
                    yang telah terautentikasi.
                </p>

                <!-- Info box -->
                <div class="bg-emerald-50/50 rounded-3xl p-6 md:p-8 mb-8 md:mb-10 text-left border border-emerald-100">
                    <h4
                        class="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                        <Icon name="lucide:info" class="size-4 shrink-0" />
                        Mengapa saya melihat ini?
                    </h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3 text-sm text-gray-600">
                            <Icon name="lucide:check-circle" class="text-emerald-600 mt-0.5 shrink-0 size-4" />
                            <span>Anda belum melakukan proses <strong>Masuk/Login</strong> ke sistem.</span>
                        </li>
                        <li class="flex items-start gap-3 text-sm text-gray-600">
                            <Icon name="lucide:check-circle" class="text-emerald-600 mt-0.5 shrink-0 size-4" />
                            <span>Akun Anda tidak memiliki role <strong>'User'</strong> (misal: Admin atau role
                                lain).</span>
                        </li>
                        <li class="flex items-start gap-3 text-sm text-gray-600">
                            <Icon name="lucide:check-circle" class="text-emerald-600 mt-0.5 shrink-0 size-4" />
                            <span>Sesi login Anda telah berakhir demi keamanan data.</span>
                        </li>
                    </ul>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                    <NuxtLink to="/"
                        class="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 border-2 border-emerald-syariah text-emerald-syariah font-bold rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                        <Icon name="lucide:arrow-left" class="size-5" />
                        Kembali ke Beranda
                    </NuxtLink>
                    <NuxtLink v-if="showLoginButton" to="/signin"
                        class="w-full sm:w-auto btn-gold px-8 md:px-12 py-3.5 md:py-4 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                        Masuk Sekarang
                        <Icon name="lucide:log-in" class="size-5" />
                    </NuxtLink>
                </div>

                <p class="mt-8 md:mt-10 text-xs text-gray-400 font-medium uppercase tracking-tighter">
                    Mengalami masalah teknis?
                    <NuxtLink to="/faqs" class="text-emerald-syariah font-bold hover:underline">
                        Hubungi Customer Support
                    </NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/** Tampilkan tombol "Masuk Sekarang" (untuk tamu); sembunyikan jika sudah login tapi role bukan user. */
withDefaults(
    defineProps<{
        showLoginButton?: boolean
    }>(),
    { showLoginButton: true }
)
</script>

<style scoped>
.blocking-role-gradient {
    background: linear-gradient(to right,
            rgb(6 78 59)
            /* emerald-800 */
            ,
            var(--gold),
            rgb(6 78 59));
}
</style>
