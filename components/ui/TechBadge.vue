<script setup lang="ts">
interface Props {
  text: string
  variant?: 'emerald' | 'cyan' | 'indigo' | 'amber' | 'slate'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'slate'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'emerald':
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    case 'cyan':
      return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
    case 'indigo':
      return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
    case 'amber':
      return 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    case 'slate':
    default:
      return 'bg-slate-800/70 text-slate-300 border-slate-700/60'
  }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-all duration-200',
      variantClasses
    ]"
  >
    <slot name="icon" />
    <span>{{ text }}</span>
  </span>
</template>
