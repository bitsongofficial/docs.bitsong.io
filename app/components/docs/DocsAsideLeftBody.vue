<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <UContentNavigation
    :highlight="false"
    :navigation="navigation"
    type="single"
    variant="pill"
    :default-open="true"
    :collapsible="true"
  />
</template>