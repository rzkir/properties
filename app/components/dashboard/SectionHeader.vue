<template>
  <div
    class="rounded-lg border bg-linear-to-br from-card via-card to-muted/20 p-6 shadow-sm"
  >
    <div
      class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
    >
      <div class="flex items-start gap-4">
        <div
          v-if="icon"
          class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0"
        >
          <Icon :name="icon" class="h-6 w-6 text-primary" />
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-3xl font-bold tracking-tight text-foreground">
              {{ title }}
            </h1>
            <Badge v-if="badge && !loading" variant="secondary" class="ml-2">
              {{ badge }}
            </Badge>
          </div>
          <p v-if="description" class="text-sm text-muted-foreground">
            {{ description }}
          </p>
          <div
            v-if="stats && stats.length > 0 && !loading"
            class="flex items-center gap-4 pt-2 flex-wrap"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="flex items-center gap-2 text-sm"
            >
              <div
                class="h-2 w-2 rounded-full"
                :class="stat.color || 'bg-primary'"
              ></div>
              <span class="text-muted-foreground">
                <span class="font-semibold text-foreground">{{
                  stat.value
                }}</span>
                {{ stat.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$slots.actions" class="w-full lg:w-auto shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

interface Stat {
  value: string | number;
  label: string;
  color?: string;
}

interface Props {
  title: string;
  description?: string;
  icon?: string;
  badge?: string | number;
  stats?: Stat[];
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  description: "",
  icon: "",
  badge: undefined,
  stats: () => [],
  loading: false,
});
</script>
