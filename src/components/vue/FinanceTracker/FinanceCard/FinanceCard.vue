<script lang="ts" setup>
type FinanceCardProps = {
  title: string;
  headingElement: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const { title, headingElement } = defineProps<FinanceCardProps>();
</script>

<template>
  <section class="w-80 rounded-lg border-2 border-slate-300 bg-slate-700 p-4">
    <component :is="headingElement">{{ title }}</component>

    <slot />
  </section>
</template>
