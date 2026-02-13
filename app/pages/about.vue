<template>
    <main>
        <!-- Hero Section -->
        <section class="relative bg-white pt-24 pb-32 overflow-hidden">
            <div class="absolute inset-0 opacity-10"
                style="background-image: radial-gradient(#064e3b 0.5px, transparent 0.5px); background-size: 24px 24px;">
            </div>
            <div class="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <span
                    class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
                    Platform Properti Halal #1
                </span>
                <h1 class="text-4xl md:text-6xl font-bold text-emerald-syariah mb-8 leading-tight">
                    Membangun Masa Depan <br>
                    <span class="text-[#D4AF37] serif italic">Penuh Keberkahan</span>
                </h1>
                <p class="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
                    Kami hadir untuk menjembatani umat dengan hunian impian melalui skema yang 100% murni
                    syariah, bebas riba, dan penuh amanah.
                </p>
            </div>
        </section>

        <!-- Achievement Stats -->
        <section class="-mt-16 relative z-20 px-4 md:px-6">
            <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <article v-for="stat in aboutStats" :key="stat.id"
                    class="bg-white p-8 rounded-3xl shadow-soft border border-gray-50 flex flex-col items-center text-center">
                    <div
                        class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-syariah text-2xl mb-4">
                        <iconify-icon :icon="stat.icon"></iconify-icon>
                    </div>
                    <span class="text-3xl font-bold text-emerald-syariah">{{ stat.value }}</span>
                    <span class="text-sm text-gray-400 mt-1 uppercase font-semibold tracking-tighter">
                        {{ stat.label }}
                    </span>
                </article>
            </div>
        </section>

        <!-- Company Profile & Visi Misi -->
        <section class="py-24 px-4 md:px-6">
            <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                <div class="relative">
                    <div class="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                            alt="Kantor SyariahPro" class="w-full h-full object-cover">
                    </div>
                    <div
                        class="absolute -bottom-8 -right-8 bg-[#D4AF37] p-10 rounded-[40px] text-white shadow-xl hidden md:block max-w-xs">
                        <p class="text-lg font-medium italic serif">
                            "Menjadi wasilah bagi setiap muslim memiliki rumah tanpa riba."
                        </p>
                        <div class="mt-4 h-1 w-20 bg-white/40"></div>
                    </div>
                </div>
                <div class="space-y-8">
                    <h2 class="text-3xl md:text-4xl font-bold text-emerald-syariah leading-tight">
                        Komitmen Kami Untuk <br>
                        <span class="text-[#D4AF37] serif">Ekosistem Halal</span>
                    </h2>
                    <p class="text-gray-600 leading-relaxed">
                        SyariahPro didirikan dengan visi besar untuk merevolusi cara umat muslim dalam memiliki
                        properti. Kami menyadari kesulitan masyarakat dalam mencari hunian yang benar-benar menerapkan
                        prinsip syariah secara kaffah.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Melalui platform direktori ini, kami menyeleksi ketat setiap developer dan listing properti
                        untuk memastikan akad-akad yang dilakukan sesuai dengan fatwa Dewan Syariah Nasional, tanpa
                        denda, tanpa sita, dan tanpa asuransi konvensional.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                        <div class="space-y-4">
                            <div
                                class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah text-xl">
                                <iconify-icon icon="lucide:eye"></iconify-icon>
                            </div>
                            <h3 class="text-xl font-bold text-emerald-syariah">Visi</h3>
                            <p class="text-sm text-gray-500 leading-relaxed">
                                Menjadi direktori properti syariah terbesar dan paling terpercaya di Asia Tenggara pada
                                tahun 2030.
                            </p>
                        </div>
                        <div class="space-y-4">
                            <div
                                class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah text-xl">
                                <iconify-icon icon="lucide:compass"></iconify-icon>
                            </div>
                            <h3 class="text-xl font-bold text-emerald-syariah">Misi</h3>
                            <p class="text-sm text-gray-500 leading-relaxed">
                                Edukasi umat, verifikasi listing developer, dan penyediaan teknologi transaksi syariah
                                yang efisien.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Section -->
            <div class="container mx-auto mb-32">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-emerald-syariah mb-4">
                        Tim Profesional Kami
                    </h2>
                    <p class="text-gray-500">
                        Para ahli di balik keberhasilan setiap transaksi Anda
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <article v-for="member in aboutTeamMembers" :key="member.id" class="group">
                        <div class="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-6">
                            <img :src="member.avatarUrl" :alt="member.name"
                                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110">
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                <div class="flex gap-4">
                                    <button
                                        class="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors">
                                        <iconify-icon icon="lucide:linkedin"></iconify-icon>
                                    </button>
                                    <button v-if="member.id === 1 || member.id === 2"
                                        class="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors">
                                        <iconify-icon
                                            :icon="member.id === 1 ? 'lucide:twitter' : 'lucide:instagram'"></iconify-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h4 class="text-xl font-bold text-emerald-syariah">
                            {{ member.name }}
                        </h4>
                        <p class="text-[#D4AF37] font-semibold text-sm mb-2">
                            {{ member.role }}
                        </p>
                        <p class="text-xs text-gray-400">
                            {{ member.subtitle }}
                        </p>
                    </article>
                </div>
            </div>

            <!-- Certification & Trust -->
            <div class="container mx-auto">
                <div class="bg-emerald-syariah rounded-[48px] p-12 lg:p-20 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                        <iconify-icon icon="mdi:mosque" class="text-[300px] text-white"></iconify-icon>
                    </div>
                    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="text-white">
                            <h2 class="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                Sertifikasi &<br> Kepercayaan
                            </h2>
                            <p class="text-emerald-100/70 mb-8">
                                Keabsahan akad syariah adalah prioritas mutlak kami. Seluruh proses operasional dan
                                modul transaksi kami telah diaudit dan mendapatkan sertifikasi dari Dewan Syariah
                                Nasional.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-center gap-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[12px]">
                                        <iconify-icon icon="lucide:check"></iconify-icon>
                                    </div>
                                    <span class="text-emerald-50">Audit Rutin Setiap 6 Bulan</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[12px]">
                                        <iconify-icon icon="lucide:check"></iconify-icon>
                                    </div>
                                    <span class="text-emerald-50">Pendampingan Akad Oleh Ustadz Expert</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[12px]">
                                        <iconify-icon icon="lucide:check"></iconify-icon>
                                    </div>
                                    <span class="text-emerald-50">Transparansi Cash Flow Developer</span>
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-wrap justify-center gap-8">
                            <div v-for="cert in aboutCertifications" :key="cert.id"
                                class="bg-white/10 backdrop-blur p-8 rounded-[32px] border border-white/20 w-48 text-center flex flex-col items-center gap-4">
                                <iconify-icon :icon="cert.icon" class="text-5xl text-[#D4AF37]"></iconify-icon>
                                <span class="text-white text-xs font-bold uppercase tracking-widest">{{ cert.title
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-24 bg-white text-center px-4 md:px-6">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-emerald-syariah mb-8 leading-tight">
                    Siap Memulai Perjalanan <br>
                    <span class="text-[#D4AF37] serif italic">Menuju Baitii Jannatii?</span>
                </h2>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/search"
                        class="bg-emerald-syariah text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all flex items-center justify-center gap-2">
                        <iconify-icon icon="lucide:search"></iconify-icon>
                        Cari Properti Sekarang
                    </a>
                    <a href="#"
                        class="border-2 border-emerald-syariah text-emerald-syariah px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all">
                        Konsultasi Gratis
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { aboutStats, aboutTeamMembers, aboutCertifications } from '~/lib/data';

useHead({
    title: 'Tentang Kami | SyariahPro - Direktori Properti Syariah Terpercaya'
});
</script>