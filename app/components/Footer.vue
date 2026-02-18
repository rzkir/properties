<template>
  <footer class="bg-emerald-syariah pt-20 pb-10 text-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
              <Icon name="lucide:home" class="text-white" />
            </div>
            <span class="text-xl font-bold tracking-tight uppercase">
              SYARIAH<span class="text-[#D4AF37]">PRO</span>
            </span>
          </div>
          <p class="text-emerald-100/60 text-sm leading-relaxed">
            Platform direktori properti syariah nomor #1 di Indonesia. Menghubungkan Anda dengan
            hunian idaman yang berkah tanpa riba.
          </p>
          <div class="flex gap-4 mt-8">
            <a href="#"
              class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all">
              <Icon name="mdi:facebook" />
            </a>
            <a href="#"
              class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all">
              <Icon name="mdi:instagram" />
            </a>
            <a href="#"
              class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all">
              <Icon name="mdi:whatsapp" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6">Jelajahi</h4>
          <ul class="space-y-4 text-emerald-100/60 text-sm">
            <li>
              <a href="#" id="footer-link-house" class="hover:text-[#D4AF37] transition-colors">
                Rumah Syariah
              </a>
            </li>
            <li>
              <a href="#" id="footer-link-apt" class="hover:text-[#D4AF37] transition-colors">
                Apartemen Halal
              </a>
            </li>
            <li>
              <a href="#" id="footer-link-land" class="hover:text-[#D4AF37] transition-colors">
                Tanah Kavling
              </a>
            </li>
            <li>
              <a href="#" id="footer-link-shophouse" class="hover:text-[#D4AF37] transition-colors">
                Ruko Berkah
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6">Bantuan</h4>
          <ul class="space-y-4 text-emerald-100/60 text-sm">
            <li>
              <NuxtLink to="/faqs#pembayaran" id="footer-link-skema" class="hover:text-[#D4AF37] transition-colors">
                Skema Pembayaran
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faqs#akad" id="footer-link-akad" class="hover:text-[#D4AF37] transition-colors">
                Info Akad
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faqs#survey" id="footer-link-survey" class="hover:text-[#D4AF37] transition-colors">
                Panduan Survey
              </NuxtLink>
            </li>
            <li>
              <a href="#" id="footer-link-contact" class="hover:text-[#D4AF37] transition-colors">
                Kontak Kami
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6">Newsletter</h4>
          <p class="text-emerald-100/60 text-xs mb-4 uppercase font-bold tracking-widest">
            Dapatkan Info Unit Ready
          </p>
          <div class="flex gap-2">
            <input type="email" placeholder="Alamat Email"
              class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:ring-1 focus:ring-[#D4AF37] outline-none" />
            <button id="footer-subscribe-btn" class="bg-[#D4AF37] px-4 rounded-xl hover:bg-gold-600 transition-colors">
              <Icon name="lucide:send" class="text-white" />
            </button>
          </div>
          <p class="text-[10px] text-emerald-100/30 mt-4">
            Kami menghormati privasi Anda. Batalkan langganan kapan saja.
          </p>
        </div>
      </div>

      <div
        class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-100/40">
        <p>&copy; 2023 SyariahPro Indonesia. Hak Cipta Dilindungi.</p>
        <div class="flex gap-8">
          <a href="#" id="footer-link-privacy" class="hover:text-white transition-colors">
            Kebijakan Privasi
          </a>
          <a href="#" id="footer-link-terms" class="hover:text-white transition-colors">
            Syarat &amp; Ketentuan
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
