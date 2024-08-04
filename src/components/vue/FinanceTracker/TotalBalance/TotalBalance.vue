<script lang="ts">
type TotalBalanceProps = {
  expenses: Expense[];
  incomes: Income[];
};
</script>

<script lang="ts" setup>
import { computed } from "vue";
import type { Expense } from "../ExpensesContent/ExpensesContent.vue";
import type { Income } from "../IncomesContent/IncomesContent.vue";

const calculateBalance = (expenses: Expense[], incomes: Income[]): number => {
  const totalExpenses = expenses.reduce((acc, curr) => {
    return acc + curr.expense;
  }, 0);

  const totalIncomes = incomes.reduce((acc, curr) => {
    return acc + curr.income;
  }, 0);

  return totalIncomes - totalExpenses;
};

const { expenses, incomes } = defineProps<TotalBalanceProps>();

const balance = computed(() => calculateBalance(expenses, incomes));
</script>

<template>
  <div class="font-bold">
    {{ balance }}
  </div>
</template>
