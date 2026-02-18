export const featuredProperties: FeaturedProperty[] = [
    {
        id: 1,
        title: 'Griya Al-Fatih Residence',
        location: 'Ciputat, Tangerang Selatan',
        type: 'Rumah Modern',
        imageUrl:
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'Ready Stock', variant: 'primary' },
            { label: 'Akad Syariah', variant: 'secondary' }
        ],
        bedrooms: '3 KT',
        bathrooms: '2 KM',
        area: '90m²',
        price: 'Rp 1,1 Milyar',
        priceValue: 1100
    },
    {
        id: 2,
        title: 'Darussalam Hills',
        location: 'Cileungsi, Bogor',
        type: 'Rumah Modern',
        imageUrl:
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'Cluster Islami', variant: 'primary' },
            { label: 'Tanpa BI Checking', variant: 'secondary' }
        ],
        bedrooms: '2 KT',
        bathrooms: '1 KM',
        area: '72m²',
        price: 'Rp 650 Juta',
        priceValue: 650
    },
    {
        id: 3,
        title: 'Nurul Jannah Residence',
        location: 'Bekasi Timur',
        type: 'Apartemen Halal',
        imageUrl:
            'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'Inden 6 Bulan', variant: 'primary' },
            { label: 'DP 0%', variant: 'secondary' }
        ],
        bedrooms: '3 KT',
        bathrooms: '2 KM',
        area: '84m²',
        price: 'Rp 780 Juta',
        priceValue: 780
    },
    {
        id: 4,
        title: 'Al-Firdaus Valley',
        location: 'Sentul, Bogor',
        type: 'Villa Tropis',
        imageUrl:
            'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'View Pegunungan', variant: 'primary' },
            { label: 'Cicilan Hingga 15 Tahun', variant: 'secondary' }
        ],
        bedrooms: '4 KT',
        bathrooms: '3 KM',
        area: '160m²',
        price: 'Rp 2,3 Milyar',
        priceValue: 2300
    },
    {
        id: 5,
        title: 'Baiti Jannati Residence',
        location: 'Depok, Jawa Barat',
        type: 'Rumah Modern',
        imageUrl:
            'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'Cluster Syariah', variant: 'primary' },
            { label: 'Dekat Tol', variant: 'secondary' }
        ],
        bedrooms: '3 KT',
        bathrooms: '2 KM',
        area: '96m²',
        price: 'Rp 980 Juta',
        priceValue: 980
    },
    {
        id: 6,
        title: 'Al-Hijrah Green Living',
        location: 'Bandung, Jawa Barat',
        type: 'Villa Tropis',
        imageUrl:
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=900',
        badges: [
            { label: 'Green Concept', variant: 'primary' },
            { label: 'Cicilan Ringan', variant: 'secondary' }
        ],
        bedrooms: '4 KT',
        bathrooms: '3 KM',
        area: '140m²',
        price: 'Rp 1,7 Milyar',
        priceValue: 1700
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
        avatarUrl:
            'https://ui-avatars.com/api/?name=Hj.+Siti+Aminah&background=0D8ABC&color=fff',
        quote:
            'MasyaAllah, dari awal akad sampai serah terima kunci semuanya dijelaskan dengan sangat rinci. Kami merasa tenang karena bebas dari skema riba.',
        highlight: true
    },
    {
        id: 2,
        name: 'Bpk. Rahmad Hidayat',
        project: 'Darussalam Hills',
        avatarUrl:
            'https://ui-avatars.com/api/?name=Rahmad+Hidayat&background=F39C12&color=fff',
        quote:
            'Proses pengajuan dan cicilan sangat manusiawi. Ketika usaha kami sedang turun, developer mau diajak musyawarah untuk atur ulang jadwal pembayaran.'
    },
    {
        id: 3,
        name: 'Ibu Diana Putri',
        project: 'Al-Firdaus Valley',
        avatarUrl:
            'https://ui-avatars.com/api/?name=Diana+Putri&background=27AE60&color=fff',
        quote:
            'Lingkungannya adem dan hijau, anak-anak betah bermain di taman cluster. Komunitas penghuninya juga aktif mengadakan kajian dan kegiatan sosial.'
    }
];

export const aboutStats = [
    {
        id: 1,
        value: '12,500+',
        label: 'Pembeli Puas',
        icon: 'lucide:users'
    },
    {
        id: 2,
        value: '1,200+',
        label: 'Properti Terdaftar',
        icon: 'lucide:home'
    },
    {
        id: 3,
        value: '850+',
        label: 'Proyek Selesai',
        icon: 'lucide:check-circle'
    },
    {
        id: 4,
        value: '8 Tahun',
        label: 'Pengalaman',
        icon: 'lucide:award'
    }
] as const;

export const aboutTeamMembers = [
    {
        id: 1,
        name: 'H. Ahmad Fauzan',
        role: 'Founder & CEO',
        subtitle: 'Expert in Islamic Real Estate Development',
        avatarUrl:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        name: 'Siti Rahayu, M.E.',
        role: 'Head of Finance',
        subtitle: 'Syariah Economics Specialist',
        avatarUrl:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        name: 'Ibrahim Malik, S.H.',
        role: 'Legal & Compliance',
        subtitle: 'Islamic Contract Law Expert',
        avatarUrl:
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 4,
        name: 'Nadia Jasmine',
        role: 'Public Relations',
        subtitle: 'Community Engagement Director',
        avatarUrl:
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400'
    }
] as const;

export const aboutCertifications = [
    {
        id: 1,
        title: 'DSN-MUI Approved',
        icon: 'mdi:certificate'
    },
    {
        id: 2,
        title: 'Verified Secure',
        icon: 'mdi:shield-check'
    },
    {
        id: 3,
        title: 'Halal Compliance',
        icon: 'mdi:scale-balance'
    }
] as const;

export const faqCategories = [
    {
        id: 'booking',
        slug: 'booking',
        title: 'Proses Booking',
        subtitle: 'Informasi mengenai langkah awal pemesanan unit',
        icon: 'lucide:calendar-check',
        items: [
            {
                id: 'booking-1',
                question: 'Apa itu booking fee dan berapa besarnya?',
                answer:
                    'Booking fee adalah tanda jadi untuk mengamankan unit properti pilihan Anda agar tidak diambil oleh calon pembeli lain. Besaran booking fee biasanya mulai dari Rp 5.000.000 hingga Rp 10.000.000 tergantung pada kebijakan developer dan tipe unit yang dipilih.'
            },
            {
                id: 'booking-2',
                question: 'Apakah booking fee hangus jika saya batal membeli?',
                answer:
                    "Dalam skema syariah murni, dana yang sudah dibayarkan harus dikembalikan jika terjadi pembatalan (tanpa potongan denda). Namun, beberapa developer menerapkan sistem 'Refundable with Deduction' untuk biaya administrasi. Pastikan Anda membaca syarat dan ketentuan pada Formulir Pemesanan Unit (FPU)."
            },
            {
                id: 'booking-3',
                question: 'Apa saja syarat dokumen untuk proses booking?',
                answer:
                    'Persyaratan umum meliputi Fotokopi KTP (Suami-Istri), Kartu Keluarga, NPWP, Slip Gaji 3 bulan terakhir (bagi karyawan) atau Laporan Keuangan (bagi pengusaha), dan Mutasi Rekening 3 bulan terakhir. Dokumen ini diperlukan untuk verifikasi data internal developer.'
            },
            {
                id: 'booking-4',
                question: 'Kapan saya harus membayar DP setelah booking?',
                answer:
                    'Down Payment (DP) biasanya dibayarkan paling lambat 7–14 hari kerja setelah pembayaran booking fee dilakukan. Beberapa developer juga menawarkan opsi cicilan DP hingga 6–12 bulan tergantung pada kesepakatan akad.'
            }
        ]
    },
    {
        id: 'pembayaran',
        slug: 'pembayaran',
        title: 'Skema Pembayaran Syariah',
        subtitle: 'Keunggulan transaksi tanpa riba dan tanpa bank',
        icon: 'lucide:banknote',
        items: [
            {
                id: 'pembayaran-1',
                question: 'Apa perbedaan utama skema syariah dengan KPR Konvensional?',
                answer:
                    'Skema syariah yang kami tawarkan adalah 100% Syariah: Tanpa Bank, Tanpa Bunga (Riba), Tanpa Denda, Tanpa Sita, dan Tanpa Asuransi yang mengandung gharar. Akad dilakukan langsung antara Pembeli dan Developer (Istishna atau Murabahah).'
            },
            {
                id: 'pembayaran-2',
                question: 'Bagaimana jika saya terlambat membayar cicilan?',
                answer:
                    'Sesuai prinsip syariah, tidak ada denda finansial atas keterlambatan. Namun, developer akan melakukan musyawarah untuk mencari solusi terbaik. Jika pembeli mengalami kesulitan ekonomi yang nyata, developer dapat memberikan relaksasi atau penjadwalan ulang pembayaran.'
            },
            {
                id: 'pembayaran-3',
                question: 'Apakah bisa pelunasan dipercepat?',
                answer:
                    'Ya, pelunasan dipercepat sangat dianjurkan dalam syariah. Berbeda dengan bank konvensional, tidak ada penalti (denda) untuk pelunasan awal. Bahkan, beberapa developer memberikan potongan harga (diskon) khusus bagi yang melunasi lebih awal.'
            }
        ]
    },
    {
        id: 'akad',
        slug: 'akad',
        title: 'Akad & Legalitas',
        subtitle: 'Keabsahan dokumen dan transaksi sesuai syariat',
        icon: 'lucide:file-text',
        items: [
            {
                id: 'akad-1',
                question: 'Apa itu akad Murabahah dan Istishna?',
                answer:
                    'Istishna adalah akad pesan bangun (untuk rumah indent), dimana developer membangun rumah sesuai spesifikasi. Murabahah adalah akad jual beli dengan margin keuntungan yang disepakati (untuk rumah ready stock). Kedua akad ini menjamin kepastian harga di awal tanpa ada perubahan cicilan di kemudian hari.'
            },
            {
                id: 'akad-2',
                question: 'Kapan sertifikat (SHM) diberikan ke pembeli?',
                answer:
                    'Sertifikat akan diserahkan kepada pembeli setelah pelunasan seluruh kewajiban pembayaran (harga rumah dan biaya pajak). Selama masa cicilan, sertifikat asli disimpan oleh developer dengan jaminan keamanan dan transparansi penuh kepada pembeli.'
            }
        ]
    },
    {
        id: 'survey',
        slug: 'survey',
        title: 'Survey Properti',
        subtitle: 'Panduan mengunjungi lokasi unit idaman Anda',
        icon: 'lucide:map',
        items: [
            {
                id: 'survey-1',
                question: 'Apakah survey lokasi dipungut biaya?',
                answer:
                    'Survey lokasi 100% GRATIS. Anda bahkan akan didampingi oleh konsultan properti kami yang ahli untuk menjelaskan detail bangunan dan lingkungan sekitar.'
            },
            {
                id: 'survey-2',
                question: 'Bisakah saya melakukan survey secara online?',
                answer:
                    "Ya, kami menyediakan layanan 'Virtual Tour' dan video call survey bagi Anda yang berada di luar kota. Tim kami akan berkeliling lokasi dan menunjukkan detail unit secara real-time."
            }
        ]
    },
    {
        id: 'cicilan',
        slug: 'cicilan',
        title: 'Cicilan Syariah',
        subtitle: 'Informasi tenor dan fleksibilitas cicilan',
        icon: 'lucide:credit-card',
        items: [
            {
                id: 'cicilan-1',
                question: 'Berapa lama tenor cicilan syariah yang tersedia?',
                answer:
                    'Umumnya tenor cicilan syariah berkisar antara 5 hingga 15 tahun, tergantung pada proyek dan kebijakan developer. Tenor dan skema pembayaran disepakati di awal dan tidak berubah sepanjang masa akad.'
            }
        ]
    },
    {
        id: 'transaksi',
        slug: 'transaksi',
        title: 'Durasi Transaksi',
        subtitle: 'Estimasi waktu dari booking hingga serah terima',
        icon: 'lucide:clock',
        items: [
            {
                id: 'transaksi-1',
                question: 'Berapa lama proses dari booking hingga akad?',
                answer:
                    'Rata-rata proses dari booking hingga akad memerlukan waktu 7–21 hari kerja, tergantung kecepatan kelengkapan dokumen dan jadwal tanda tangan akad antara pembeli dan developer.'
            }
        ]
    }
] as const;