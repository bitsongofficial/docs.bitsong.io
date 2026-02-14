<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="flex items-center gap-2">
    <UColorModeImage
      v-if="appConfig.header?.logo?.dark || appConfig.header?.logo?.light"
      :light="appConfig.header?.logo?.light || appConfig.header?.logo?.dark || ''"
      :dark="appConfig.header?.logo?.dark || appConfig.header?.logo?.light || ''"
      :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
      class="h-8 w-auto shrink-0"
    />
    <svg height="16" stroke-linejoin="round" class="w-4 h-4 text-[var(--ui-text-dimmed)]" viewBox="0 0 16 16" width="16">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z" fill="currentColor" />
    </svg>
    <span class="font-medium text-[var(--ui-text)]">
      {{ appConfig.header?.title || 'docs' }}
    </span>
  </div>
</template>