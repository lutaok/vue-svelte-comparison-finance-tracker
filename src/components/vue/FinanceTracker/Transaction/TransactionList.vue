<script lang="ts">
export type Transaction = {
  title: string;
  value: number;
  date: string;
};

type TransactionProps = {
  transactions: Transaction[];
};
</script>

<script lang="ts" setup>
import TransactionCard from "./TransactionCard.vue";

const { transactions } = defineProps<TransactionProps>();
</script>

<template>
  <ul class="my-4 flex flex-col gap-2">
    <!-- TODO: Use ID as key -->
    <li v-for="(transaction, index) in transactions" :key="index">
      <TransactionCard
        :id="`${index}-${transaction.title}`"
        :title="transaction.title"
        :value="transaction.value"
        :date="transaction.date"
      />
    </li>
  </ul>
</template>
