<template>
    <div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <!-- Background Content (Blurred Dashboard) -->
        <div class="absolute inset-0 z-0 opacity-40 blur-xl pointer-events-none scale-105">
            <header class="w-full py-6 px-12 border-b flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-emerald-syariah rounded-lg" />
                    <div class="h-6 w-32 bg-gray-200 rounded-full" />
                </div>
                <div class="h-10 w-40 bg-gray-200 rounded-full" />
            </header>
            <main class="max-w-7xl mx-auto p-12 grid grid-cols-12 gap-8">
                <div class="col-span-3 h-96 bg-gray-100 rounded-4xl" />
                <div class="col-span-9 space-y-8">
                    <div class="h-20 w-full bg-gray-100 rounded-4xl" />
                    <div class="grid grid-cols-3 gap-6">
                        <div class="h-64 bg-gray-100 rounded-4xl" />
                        <div class="h-64 bg-gray-100 rounded-4xl" />
                        <div class="h-64 bg-gray-100 rounded-4xl" />
                    </div>
                </div>
            </main>
        </div>

        <!-- Main Loading Overlay -->
        <div class="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center p-6">
            <!-- Logo & Branding -->
            <div class="mb-16 flex flex-col items-center animate-[fade-in-up_0.8s_ease-out]">
                <div class="w-16 h-16 bg-emerald-syariah rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-900/10 mb-4">
                    <Icon name="lucide:home" class="text-white text-3xl" />
                </div>
                <span class="text-2xl font-bold tracking-widest text-emerald-syariah uppercase">
                    SYARIAH<span class="text-gold-syariah">PRO</span>
                </span>
            </div>

            <!-- Large Animated Spinner Hub -->
            <div class="relative mb-12 flex items-center justify-center">
                <!-- Outer Ring -->
                <div class="w-48 h-48 border-4 border-emerald-900/5 rounded-full" />
                <div
                    class="absolute w-48 h-48 border-t-4 border-r-4 border-transparent border-t-emerald-syariah border-r-gold-syariah rounded-full animate-spin-outer shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                />

                <!-- Inner Ring -->
                <div class="absolute w-36 h-36 border-4 border-emerald-900/5 rounded-full" />
                <div
                    class="absolute w-36 h-36 border-b-4 border-l-4 border-transparent border-b-emerald-syariah border-l-gold-syariah rounded-full animate-spin-inner opacity-60"
                />

                <!-- Center Percentage -->
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-4xl font-extrabold text-emerald-syariah tabular-nums">
                        {{ progress }}%
                    </span>
                    <div class="flex gap-1.5 mt-2">
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-gold-syariah pulse-dot"
                            :style="{ animationDelay: '0s' }"
                        />
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-gold-syariah pulse-dot"
                            :style="{ animationDelay: '0.2s' }"
                        />
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-gold-syariah pulse-dot"
                            :style="{ animationDelay: '0.4s' }"
                        />
                    </div>
                </div>
            </div>

            <!-- Loading Status & Quotes -->
            <div class="text-center max-w-md">
                <h2
                    class="text-lg font-semibold text-emerald-syariah mb-8 tracking-wide transition-all duration-300"
                    :class="{ 'animate-pulse': progress < 100 }"
                >
                    {{ statusText }}
                </h2>

                <div class="min-h-[60px] flex items-center justify-center">
                    <Transition name="quote-fade" mode="out-in">
                        <p :key="currentQuoteIndex" class="font-serif italic text-xl text-gray-600 px-4">
                            "{{ quotes[currentQuoteIndex] }}"
                        </p>
                    </Transition>
                </div>

                <!-- Progress Bar -->
                <div class="mt-12 flex flex-col items-center gap-3">
                    <div class="progress-track">
                        <div class="progress-bar" :style="{ width: `${progress}%` }" />
                    </div>
                    <span class="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                        Harap tunggu sejenak
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    /** Progress percentage (0-100). If not provided, will auto-simulate. */
    progressValue?: number
    /** Custom status text. If not provided, will auto-update based on progress. */
    statusTextValue?: string
    /** Auto-simulate progress. Default: true */
    autoProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    progressValue: undefined,
    statusTextValue: undefined,
    autoProgress: true,
})

const quotes = [
    'Rumah Syariah = Amanah dari Allah',
    'Properti Halal, Hati Tenteram',
    'Investasi Berkah tanpa Riba',
    'Membangun Hunian Islami yang Modern',
    'Investasi Properti untuk Bekal Akhirat',
    'Keberkahan Dimulai dari Cara Memiliki Rumah',
]

const progress = ref(0)
const currentQuoteIndex = ref(0)
const statusText = ref('Menyiapkan Dashboard Berkah...')

let progressInterval: ReturnType<typeof setInterval> | null = null
let quoteInterval: ReturnType<typeof setInterval> | null = null

// Auto-progress simulation
if (props.autoProgress && props.progressValue === undefined) {
    progressInterval = setInterval(() => {
        if (progress.value < 100) {
            progress.value += Math.floor(Math.random() * 3) + 1
            if (progress.value > 100) progress.value = 100

            // Update status text based on progress
            if (progress.value > 40 && progress.value < 80) {
                statusText.value = 'Sinkronisasi Data Properti...'
            } else if (progress.value >= 80) {
                statusText.value = 'Hampir Selesai...'
            }
        } else {
            if (progressInterval) {
                clearInterval(progressInterval)
                progressInterval = null
            }
            statusText.value = 'Selamat Datang di SyariahPro'
        }
    }, 150)
}

// Quote rotation
quoteInterval = setInterval(() => {
    currentQuoteIndex.value = (currentQuoteIndex.value + 1) % quotes.length
}, 4000)

// Watch external progress value
watch(
    () => props.progressValue,
    (newValue) => {
        if (newValue !== undefined) {
            progress.value = newValue
            // Update status based on external progress
            if (newValue > 40 && newValue < 80) {
                statusText.value = 'Sinkronisasi Data Properti...'
            } else if (newValue >= 80 && newValue < 100) {
                statusText.value = 'Hampir Selesai...'
            } else if (newValue >= 100) {
                statusText.value = 'Selamat Datang di SyariahPro'
            }
        }
    },
    { immediate: true },
)

// Watch external status text
watch(
    () => props.statusTextValue,
    (newValue) => {
        if (newValue !== undefined) {
            statusText.value = newValue
        }
    },
    { immediate: true },
)

onUnmounted(() => {
    if (progressInterval) {
        clearInterval(progressInterval)
    }
    if (quoteInterval) {
        clearInterval(quoteInterval)
    }
})
</script>

<style scoped>
.loader-container {
    backdrop-filter: blur(12px);
    background-color: rgba(251, 251, 249, 0.8);
}

.progress-track {
    background: rgba(6, 78, 59, 0.1);
    height: 4px;
    width: 240px;
    border-radius: 99px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--emerald), var(--gold));
    transition: width 0.3s ease-out;
}

@keyframes spin-outer {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes spin-inner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

@keyframes pulse-gold {
    0%,
    100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.5);
        opacity: 1;
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-spin-outer {
    animation: spin-outer 3s linear infinite;
}

.animate-spin-inner {
    animation: spin-inner 2s linear infinite;
}

.pulse-dot {
    animation: pulse-gold 1.5s ease-in-out infinite;
}

.quote-fade-enter-active,
.quote-fade-leave-active {
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.quote-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.quote-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
