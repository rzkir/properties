<template>
    <div class="min-h-screen flex flex-col islamic-pattern bg-(--cream)">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 shadow-sm">
            <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <NuxtLink to="/" class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-emerald-syariah rounded-lg flex items-center justify-center">
                        <Icon name="lucide:home" class="text-white text-xl" />
                    </div>
                    <span class="text-xl font-bold tracking-tight text-emerald-syariah uppercase">
                        SYARIAH<span class="text-gold-syariah">PRO</span>
                    </span>
                </NuxtLink>
                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink to="/" class="text-sm font-medium text-gray-600 hover:text-emerald-syariah transition-colors">
                        Beranda
                    </NuxtLink>
                    <NuxtLink to="/search" class="text-sm font-medium text-gray-600 hover:text-emerald-syariah transition-colors">
                        Cari Properti
                    </NuxtLink>
                    <NuxtLink to="/about" class="text-sm font-medium text-gray-600 hover:text-emerald-syariah transition-colors">
                        Tentang Kami
                    </NuxtLink>
                    <NuxtLink to="/faqs" class="text-sm font-medium text-gray-600 hover:text-emerald-syariah transition-colors">
                        FAQ
                    </NuxtLink>
                </nav>
                <div class="flex items-center gap-4">
                    <NuxtLink to="/search" class="p-2 text-gray-400 hover:text-emerald-syariah transition-colors" aria-label="Cari">
                        <Icon name="lucide:search" class="text-xl" />
                    </NuxtLink>
                    <div class="h-6 w-px bg-gray-200" />
                    <NuxtLink to="/signin" class="text-sm font-bold text-emerald-syariah">
                        Masuk
                    </NuxtLink>
                    <NuxtLink to="/signup" class="bg-emerald-syariah text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg hover:bg-emerald-800 transition-all">
                        Daftar
                    </NuxtLink>
                </div>
            </div>
        </header>

        <!-- Main -->
        <main class="grow flex items-center justify-center py-16 px-6">
            <div class="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-[48px] shadow-soft border border-gray-100 overflow-hidden">
                <!-- Left panel: emerald -->
                <div class="w-full md:w-5/12 bg-emerald-syariah p-12 flex flex-col justify-center relative">
                    <div class="absolute inset-0 opacity-10 islamic-ornament-panel" aria-hidden="true" />
                    <div class="relative z-10 text-center md:text-left">
                        <div class="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-gold-syariah mx-auto md:mx-0 mb-8 border border-white/20">
                            <Icon name="lucide:user-lock" class="text-5xl" />
                        </div>
                        <h2 class="text-white text-3xl font-bold mb-4 serif leading-tight">
                            Keamanan<br />Data Anda Adalah Prioritas
                        </h2>
                        <p class="text-emerald-100/70 text-sm leading-relaxed mb-8">
                            Halaman profil memuat informasi sensitif dan riwayat transaksi properti Anda. Kami memerlukan verifikasi identitas untuk memastikan privasi tetap terjaga.
                        </p>
                        <div class="flex items-center gap-4 text-emerald-100/40 text-xs font-bold uppercase tracking-widest">
                            <span>SSL Encrypted</span>
                            <span class="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Sharia Verified</span>
                        </div>
                    </div>
                </div>

                <!-- Right panel: form CTA -->
                <div class="w-full md:w-7/12 p-12 md:p-16 flex flex-col justify-center text-center md:text-left">
                    <div class="mb-10">
                        <h1 class="text-4xl md:text-5xl font-bold text-emerald-syariah mb-6 serif leading-tight">
                            Silakan Masuk Untuk Mengakses Profil
                        </h1>
                        <p class="text-gray-500 text-lg leading-relaxed">
                            Anda mencoba mengakses area terbatas. Mohon masuk ke akun SyariahPro Anda terlebih dahulu atau buat akun baru untuk mulai mengelola properti impian.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 mb-10">
                        <NuxtLink
                            to="/signin"
                            class="w-full sm:w-auto btn-gold px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        >
                            Masuk Sekarang
                            <Icon name="lucide:log-in" class="size-5" />
                        </NuxtLink>
                        <NuxtLink
                            to="/signup"
                            class="w-full sm:w-auto px-10 py-5 border-2 border-emerald-syariah text-emerald-syariah font-bold rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3"
                        >
                            Buat Akun Baru
                            <Icon name="lucide:user-plus" class="size-5" />
                        </NuxtLink>
                    </div>
                    <NuxtLink
                        to="/"
                        class="text-sm font-bold text-gray-400 hover:text-emerald-syariah transition-colors flex items-center justify-center md:justify-start gap-2"
                    >
                        <Icon name="lucide:arrow-left" class="size-4" />
                        Kembali ke Halaman Utama
                    </NuxtLink>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-emerald-syariah pt-20 pb-10 text-white">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div class="col-span-1 md:col-span-1">
                        <div class="flex items-center gap-2 mb-6">
                            <div class="w-8 h-8 bg-gold-accent rounded flex items-center justify-center">
                                <Icon name="lucide:home" class="text-white" />
                            </div>
                            <span class="text-xl font-bold tracking-tight uppercase">
                                SYARIAH<span class="text-gold-syariah">PRO</span>
                            </span>
                        </div>
                        <p class="text-emerald-100/60 text-sm leading-relaxed">
                            Platform direktori properti syariah nomor #1 di Indonesia. Menghubungkan Anda dengan hunian idaman yang berkah tanpa riba.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-6 uppercase tracking-wider text-[11px]">Jelajahi</h4>
                        <ul class="space-y-4 text-emerald-100/60 text-sm">
                            <li><NuxtLink to="/search" class="hover:text-gold-syariah transition-colors">Rumah Syariah</NuxtLink></li>
                            <li><NuxtLink to="/search" class="hover:text-gold-syariah transition-colors">Apartemen Halal</NuxtLink></li>
                            <li><NuxtLink to="/search" class="hover:text-gold-syariah transition-colors">Tanah Kavling</NuxtLink></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-6 uppercase tracking-wider text-[11px]">Bantuan</h4>
                        <ul class="space-y-4 text-emerald-100/60 text-sm">
                            <li><NuxtLink to="/faqs" class="hover:text-gold-syariah transition-colors">Skema Pembayaran</NuxtLink></li>
                            <li><NuxtLink to="/faqs" class="hover:text-gold-syariah transition-colors">Kontak Kami</NuxtLink></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-6 uppercase tracking-wider text-[11px]">Newsletter</h4>
                        <div class="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                class="bg-emerald-800 border-none rounded-lg px-4 py-3 text-sm w-full outline-none focus:ring-1 focus:ring-gold-syariah"
                            />
                            <button type="button" class="bg-gold-accent px-4 rounded-lg hover:opacity-90 transition-opacity" aria-label="Berlangganan">
                                <Icon name="lucide:send" class="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="pt-8 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-100/40">
                    <p>&copy; 2023 SyariahPro Indonesia. Hak Cipta Dilindungi.</p>
                    <div class="flex gap-6">
                        <NuxtLink to="#" class="hover:text-white transition-colors">Kebijakan Privasi</NuxtLink>
                        <NuxtLink to="#" class="hover:text-white transition-colors">Syarat &amp; Ketentuan</NuxtLink>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Login Diperlukan | SyariahPro',
})
</script>

<style scoped>
.islamic-ornament-panel {
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L55 35 L90 40 L60 55 L70 90 L50 70 L30 90 L40 55 L10 40 L45 35 Z' fill='%23d4af37' fill-opacity='0.03'/%3E%3C/svg%3E");
}
</style>
