<template>
  <NuxtLayout>
    <AuthContext>
      <template v-if="!isRoute">
        <Header />
      </template>
      <NuxtPage />
      <template v-if="!isRoute">
        <Footer />
      </template>
      <ClientOnly>
        <Toaster position="top-center" rich-colors :toast-options="{
          duration: 3000,
          className: 'font-medium',
        }" />
        <template #fallback />
      </ClientOnly>
    </AuthContext>
  </NuxtLayout>
</template>

<script setup>
import { Toaster } from '@/components/ui/sonner'

const route = useRoute()
const pathname = computed(() => route.path)

const isRoute = computed(
  () =>
    pathname.value?.includes('/signin') ||
    pathname.value?.includes('/signup') ||
    pathname.value?.includes('/dashboard') ||
    pathname.value?.includes('/profile') ||
    false
)

useHead({
  title: 'SyariahPro | Direktori Properti Syariah Nomor #1 di Indonesia',
  htmlAttrs: {
    lang: 'id'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Gambetta:wght@400;500;600;700&display=swap'
    }
  ],
})
</script>