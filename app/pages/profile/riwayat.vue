<template>
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div class="space-y-1">
                <h1 class="text-3xl md:text-4xl font-bold text-emerald-syariah">Riwayat Booking</h1>
                <p class="text-gray-400 font-medium">
                    Kelola dan pantau status pemesanan unit properti syariah Anda.
                    <span v-if="user?.role === 'admin'" class="text-gold-accent">(Tampilan Admin)</span>
                </p>
            </div>
            <div class="flex gap-3">
                <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 px-6">
                    <div class="text-right">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Booking</p>
                        <p class="text-xl font-extrabold text-emerald-syariah">{{ totalBooking }} Unit</p>
                    </div>
                    <div
                        class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-syariah">
                        <Icon name="lucide:briefcase" class="text-xl" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex flex-wrap items-end gap-6">
            <div class="flex-1 min-w-[200px] space-y-2">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Filter
                    Status</label>
                <div class="relative">
                    <select v-model="filterStatus"
                        class="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 transition-all">
                        <option value="">Semua Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <Icon name="lucide:chevron-down"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
            <div class="flex-1 min-w-[200px] space-y-2">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Rentang
                    Tanggal</label>
                <div class="relative">
                    <Icon name="lucide:calendar"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-syariah" />
                    <input v-model="filterDate" type="text" placeholder="Pilih Tanggal"
                        class="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 transition-all" />
                </div>
            </div>
            <div class="flex gap-3">
                <button type="button"
                    class="px-6 py-3.5 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all"
                    @click="resetFilters">
                    Reset
                </button>
                <button type="button"
                    class="bg-emerald-syariah text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all flex items-center gap-2"
                    @click="applyFilters">
                    <Icon name="lucide:filter" />
                    Terapkan
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-4xl border border-gray-100 shadow-soft overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-emerald-syariah text-white">
                        <tr class="text-[11px] font-bold uppercase tracking-[0.15em]">
                            <th class="px-4 md:px-6 py-5">No.</th>
                            <th class="px-4 md:px-6 py-5">Properti & Detail</th>
                            <th class="px-4 md:px-6 py-5">Tgl Booking</th>
                            <th class="px-4 md:px-6 py-5 text-center">Status</th>
                            <th class="px-4 md:px-6 py-5 text-right">Booking Fee</th>
                            <th class="px-4 md:px-6 py-5 text-center">DP / Tenor</th>
                            <th class="px-4 md:px-6 py-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="(row, idx) in paginatedBookings" :key="row.ref"
                            class="hover:bg-gray-50/50 transition-colors group"
                            :class="{ 'bg-gray-50/30': idx % 2 === 1 }">
                            <td class="px-4 md:px-6 py-6 text-sm font-bold text-gray-400">{{ (currentPage -
                                1) * pageSize + idx + 1 }}</td>
                            <td class="px-4 md:px-6 py-6">
                                <div class="flex items-center gap-4">
                                    <img :src="row.image" :alt="row.propertyName"
                                        class="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                    <div class="flex flex-col">
                                        <p
                                            class="font-extrabold text-emerald-syariah leading-tight mb-1 group-hover:text-gold-accent transition-colors">
                                            {{ row.propertyName }}
                                        </p>
                                        <div
                                            class="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            <Icon name="lucide:map-pin" class="text-gold-accent shrink-0" />
                                            {{ row.location }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 md:px-6 py-6">
                                <p class="text-sm font-bold text-gray-700">{{ row.date }}</p>
                                <p class="text-[10px] text-gray-400 font-medium">Ref: {{ row.ref }}</p>
                            </td>
                            <td class="px-4 md:px-6 py-6 text-center">
                                <span :class="[
                                    'status-badge px-3 py-1.5 rounded-full inline-flex items-center gap-1.5',
                                    row.status === 'Confirmed' && 'bg-emerald-100 text-emerald-700',
                                    row.status === 'Pending' && 'bg-yellow-100 text-yellow-700',
                                    row.status === 'Cancelled' && 'bg-red-100 text-red-700',
                                ]">
                                    <Icon :name="row.status === 'Confirmed' ? 'lucide:check-circle' :
                                        row.status === 'Pending' ? 'lucide:clock' : 'lucide:alert-circle'
                                        " class="shrink-0" />
                                    {{ row.status }}
                                </span>
                            </td>
                            <td class="px-4 md:px-6 py-6 text-right font-bold text-emerald-syariah text-sm">
                                {{ row.bookingFee }}</td>
                            <td class="px-4 md:px-6 py-6 text-center">
                                <div class="space-y-0.5">
                                    <p class="text-xs font-bold text-gray-800">{{ row.dp }}</p>
                                    <p class="text-[10px] font-bold text-gold-accent uppercase">{{ row.tenor
                                    }}</p>
                                </div>
                            </td>
                            <td class="px-4 md:px-6 py-6 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="#"
                                        class="p-2.5 bg-emerald-50 text-emerald-syariah rounded-xl hover:bg-emerald-syariah hover:text-white transition-all shadow-sm inline-flex">
                                        <Icon name="lucide:eye" class="text-lg" />
                                    </a>
                                    <button v-if="row.status === 'Pending'" type="button"
                                        class="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        title="Batalkan booking" @click="cancelBooking(row.ref)">
                                        <Icon name="lucide:trash-2" class="text-lg" />
                                    </button>
                                    <button v-else type="button"
                                        class="p-2.5 bg-gray-50 text-gray-400 rounded-xl cursor-not-allowed opacity-50"
                                        :title="row.status === 'Confirmed' ? 'Tidak bisa cancel setelah confirmed' : 'Sudah dibatalkan'"
                                        disabled>
                                        <Icon name="lucide:x-circle" class="text-lg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Menampilkan {{ rangeStart }}-{{ rangeEnd }} dari {{ filteredBookings.length }} data
                    booking
                </p>
                <div class="flex gap-2">
                    <button type="button"
                        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white transition-all disabled:opacity-50"
                        :disabled="currentPage <= 1" @click="currentPage = Math.max(1, currentPage - 1)">
                        <Icon name="lucide:chevron-left" />
                    </button>
                    <button v-for="p in pageNumbers" :key="p" type="button" :class="[
                        'w-10 h-10 rounded-xl font-bold text-sm transition-all',
                        p === currentPage
                            ? 'bg-emerald-syariah text-white shadow-lg shadow-emerald-900/10'
                            : 'border border-gray-200 text-gray-600 hover:bg-white'
                    ]" @click="currentPage = p">
                        {{ p }}
                    </button>
                    <button type="button"
                        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white transition-all disabled:opacity-50"
                        :disabled="currentPage >= totalPages"
                        @click="currentPage = Math.min(totalPages, currentPage + 1)">
                        <Icon name="lucide:chevron-right" />
                    </button>
                </div>
            </div>
        </div>

        <!-- CTA cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-soft flex items-center gap-6">
                <div
                    class="w-16 h-16 bg-gold-accent/10 rounded-2xl flex items-center justify-center text-gold-accent text-3xl shrink-0">
                    <Icon name="lucide:help-circle" class="text-3xl" />
                </div>
                <div>
                    <h3 class="text-xl font-bold text-emerald-syariah">Butuh Bantuan Booking?</h3>
                    <p class="text-sm text-gray-500 leading-relaxed mb-4">
                        Tim konsultan kami siap membantu Anda menyelesaikan proses akad dan pembayaran
                        secara syariah.
                    </p>
                    <a href="#"
                        class="text-emerald-syariah font-bold text-sm hover:text-gold-accent flex items-center gap-2">
                        Hubungi Customer Care
                        <Icon name="lucide:arrow-right" />
                    </a>
                </div>
            </div>
            <div class="bg-emerald-syariah p-6 rounded-4xl shadow-soft relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div class="relative z-10 text-white">
                    <h3 class="text-xl font-bold mb-2">Upgrade Membership?</h3>
                    <p class="text-emerald-100/80 text-sm mb-6">
                        Dapatkan akses prioritas unit ready stock dan diskon booking fee hingga 50%.
                    </p>
                    <a href="#"
                        class="inline-block bg-white text-emerald-syariah px-8 py-3 rounded-xl font-bold text-sm hover:bg-gold-accent hover:text-white transition-all">
                        Pelajari Member Platinum
                    </a>
                </div>
                <Icon name="lucide:award" class="absolute -bottom-6 -right-6 text-[120px] text-white/10" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthContext } from '@/lib/AuthContext'

useHead({
    title: 'Riwayat Booking | SyariahPro',
})

const auth = useAuthContext()
const { user } = auth

interface BookingRow {
    ref: string
    propertyName: string
    location: string
    image: string
    date: string
    status: 'Pending' | 'Confirmed' | 'Cancelled'
    bookingFee: string
    dp: string
    tenor: string
}

// Mock data: in real app fetch by user.uid (and optionally all for admin)
function getBookingsForUser(uid: string, role: string): BookingRow[] {
    const all: BookingRow[] = [
        {
            ref: '#SYA-00219',
            propertyName: 'Royal Al-Ikhlas Residence',
            location: 'Bintaro, Jaksel',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=80',
            date: '12 Okt 2023',
            status: 'Confirmed',
            bookingFee: 'Rp 10.000.000',
            dp: '30% (DP)',
            tenor: '10 Tahun',
        },
        {
            ref: '#SYA-00242',
            propertyName: 'Modern Halal Residence',
            location: 'BSD, Tangerang',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=80',
            date: '15 Okt 2023',
            status: 'Pending',
            bookingFee: 'Rp 5.000.000',
            dp: '20% (DP)',
            tenor: '5 Tahun',
        },
        {
            ref: '#SYA-00185',
            propertyName: 'Villa Madani Tropika',
            location: 'Puncak, Bogor',
            image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=80',
            date: '01 Okt 2023',
            status: 'Cancelled',
            bookingFee: 'Rp 10.000.000',
            dp: '30% (DP)',
            tenor: '10 Tahun',
        },
    ]
    // For demo: same data for everyone; in production filter by uid or for admin return all
    return all
}

const filterStatus = ref('')
const filterDate = ref('')
const currentPage = ref(1)
const pageSize = 10

const bookings = computed<BookingRow[]>(() => {
    const u = user.value
    if (!u) return []
    return getBookingsForUser(u.id, u.role)
})

const filteredBookings = computed(() => {
    let list = [...bookings.value]
    if (filterStatus.value) {
        list = list.filter((b) => b.status === filterStatus.value)
    }
    // filterDate could filter by date range when you have real dates
    return list
})

const totalBooking = computed(() => filteredBookings.value.length)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredBookings.value.length / pageSize)))

const pageNumbers = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const pages: number[] = []
    for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
        pages.push(i)
    }
    return pages
})

const paginatedBookings = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredBookings.value.slice(start, start + pageSize)
})

const rangeStart = computed(() => {
    if (filteredBookings.value.length === 0) return 0
    return (currentPage.value - 1) * pageSize + 1
})

const rangeEnd = computed(() => {
    return Math.min(currentPage.value * pageSize, filteredBookings.value.length)
})

function resetFilters() {
    filterStatus.value = ''
    filterDate.value = ''
    currentPage.value = 1
}

function applyFilters() {
    currentPage.value = 1
}

function cancelBooking(ref: string) {
    // TODO: call API to cancel booking for this user (uid)
    console.log('Cancel booking', ref, 'for uid', user.value?.id)
}
</script>
