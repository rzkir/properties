export const featuredProperties: FeaturedProperty[] = [
    {
        id: 1,
        title: 'Griya Al-Fatih Residence',
        location: 'Ciputat, Tangerang Selatan',
        imageUrl:
            'https://images.unsplash.com/photo-1617096445535-07dee0629f60?auto=format&fit=crop&q=80&w=900',
        badges: [
            { label: 'Ready Stock', variant: 'primary' },
            { label: 'Akad Syariah', variant: 'secondary' }
        ],
        bedrooms: '3 KT',
        bathrooms: '2 KM',
        area: '90m²',
        price: 'Rp 1,1 Milyar'
    },
    {
        id: 2,
        title: 'Darussalam Hills',
        location: 'Cileungsi, Bogor',
        imageUrl:
            'https://images.unsplash.com/photo-1600607687920-4e2a534da391?auto=format&fit=crop&q=80&w=900',
        badges: [
            { label: 'Cluster Islami', variant: 'primary' },
            { label: 'Tanpa BI Checking', variant: 'secondary' }
        ],
        bedrooms: '2 KT',
        bathrooms: '1 KM',
        area: '72m²',
        price: 'Rp 650 Juta'
    },
    {
        id: 3,
        title: 'Nurul Jannah Residence',
        location: 'Bekasi Timur',
        imageUrl:
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
        badges: [
            { label: 'Inden 6 Bulan', variant: 'primary' },
            { label: 'DP 0%', variant: 'secondary' }
        ],
        bedrooms: '3 KT',
        bathrooms: '2 KM',
        area: '84m²',
        price: 'Rp 780 Juta'
    },
    {
        id: 4,
        title: 'Al-Firdaus Valley',
        location: 'Sentul, Bogor',
        imageUrl:
            'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=900',
        badges: [
            { label: 'View Pegunungan', variant: 'primary' },
            { label: 'Cicilan Hingga 15 Tahun', variant: 'secondary' }
        ],
        bedrooms: '4 KT',
        bathrooms: '3 KM',
        area: '160m²',
        price: 'Rp 2,3 Milyar'
    }
];

export const advantages: Advantage[] = [
    {
        id: 1,
        title: '100% Akad Syariah',
        description:
            'Seluruh transaksi menggunakan akad yang sesuai syariat, tanpa riba, denda keterlambatan, atau penalti yang memberatkan.',
        icon: 'mdi:mosque'
    },
    {
        id: 2,
        title: 'Legalitas Jelas & Lengkap',
        description:
            'Pengecekan menyeluruh dokumen SHM, IMB/PBG, dan izin-izin lain sebelum proyek dipasarkan kepada konsumen.',
        icon: 'mdi:file-certificate'
    },
    {
        id: 3,
        title: 'Tanpa Keterlibatan Bank',
        description:
            'Skema cicilan langsung ke developer dengan jadwal yang disepakati bersama, lebih tenang dan transparan.',
        icon: 'mdi:handshake'
    },
    {
        id: 4,
        title: 'Lingkungan Keluarga Islami',
        description:
            'Mayoritas penghuni muslim, dilengkapi masjid, kajian rutin, dan kegiatan sosial yang mendukung tumbuh kembang anak.',
        icon: 'mdi:human-male-female-child'
    },
    {
        id: 5,
        title: 'Lokasi Strategis',
        description:
            'Dekat dengan akses tol, sekolah Islam, rumah sakit, dan pusat belanja untuk memudahkan aktivitas harian Anda.',
        icon: 'mdi:map-marker-radius'
    },
    {
        id: 6,
        title: 'Fasilitas Lengkap',
        description:
            'Tersedia taman bermain anak, area olahraga, dan ruang komunal untuk mempererat ukhuwah antar tetangga.',
        icon: 'mdi:park'
    }
];

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Hj. Siti Aminah',
        project: 'Griya Al-Fatih Residence',
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
        quote:
            'MasyaAllah, dari awal akad sampai serah terima kunci semuanya dijelaskan dengan sangat rinci. Kami merasa tenang karena bebas dari skema riba.',
        highlight: true
    },
    {
        id: 2,
        name: 'Bpk. Rahmad Hidayat',
        project: 'Darussalam Hills',
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
        quote:
            'Proses pengajuan dan cicilan sangat manusiawi. Ketika usaha kami sedang turun, developer mau diajak musyawarah untuk atur ulang jadwal pembayaran.'
    },
    {
        id: 3,
        name: 'Ibu Diana Putri',
        project: 'Al-Firdaus Valley',
        avatarUrl: 'https://i.pravatar.cc/150?u=3',
        quote:
            'Lingkungannya adem dan hijau, anak-anak betah bermain di taman cluster. Komunitas penghuninya juga aktif mengadakan kajian dan kegiatan sosial.'
    }
];