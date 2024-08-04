<script lang="ts">
type TransactionCardProps = {
  id: string;
  title: string;
  value: number;
  date: string;
};
</script>

<script lang="ts" setup>
const { id, date, title, value } = defineProps<TransactionCardProps>();
</script>

<template>
  <div
    :id="`${id}-transaction-container`"
    class="flex justify-between gap-2 rounded-lg border-2 border-lime-300 bg-slate-400 p-4 text-slate-950"
  >
    <div class="flex flex-col gap-4">
      <h3 class="font-bold">{{ title }}</h3>
      <p>{{ value }}</p>
    </div>
    <p>{{ date }}</p>
  </div>
</template>
