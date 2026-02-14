<template>
  <slot />
</template>

<script setup lang="ts">
import { useAuthContext } from '@/lib/AuthContext'

useAuthContext()
</script>
