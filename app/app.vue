<template>
  <NuxtLayout>
    <Header />
    <NuxtPage />
    <Footer />
  </NuxtLayout>
</template>

<script setup>
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