<script lang="ts" setup>
import { ref } from "vue";
import ExpensesContent, { type Expense } from "./ExpensesContent/ExpensesContent.vue";
import FinanceCard from "./FinanceCard/FinanceCard.vue";
import type { Income } from "./IncomesContent/IncomesContent.vue";
import IncomesContent from "./IncomesContent/IncomesContent.vue";
import TotalBalance from "./TotalBalance/TotalBalance.vue";

const expenses = ref<Expense[]>([]);
const incomes = ref<Income[]>([]);
</script>

<template>
  <h1 class="text-center">Finance Tracker</h1>

  <div>Range Date Picker here</div>

  <div class="flex flex-wrap items-start justify-center gap-8">
    <FinanceCard title="Expense" heading-element="h2">
      <ExpensesContent :expenses="expenses" @add-expense="expenses.push($event)" />
    </FinanceCard>

    <FinanceCard title="Income" heading-element="h2">
      <IncomesContent :incomes="incomes" @add-income="incomes.push($event)" />
    </FinanceCard>

    <FinanceCard title="Total" heading-element="h2">
      <TotalBalance :incomes="incomes" :expenses="expenses" />
    </FinanceCard>
  </div>
</template>
