<script lang="ts">
  import FinanceCard from "../FinanceCard.svelte";
  import Expenses from "./Expenses/Expenses.svelte";
  import { expensesStore, incomesStore } from "./finance-tracker.stores";
  import Incomes from "./Incomes/Incomes.svelte";
  import TotalBalance from "./TotalBalance/TotalBalance.svelte";

  $: expenses = $expensesStore;
  $: incomes = $incomesStore;
</script>

<h1 class="text-center">Finance Tracker</h1>

<div>Range Date Picker here</div>

<div class="flex flex-wrap items-start justify-center gap-8">
  <FinanceCard title="Expense" headingElement="h2">
    <Expenses
      expenses={expenses}
      on:addExpense={({ detail }) => {
        expensesStore.update((state) => [...state, detail]);
      }}
    />
  </FinanceCard>

  <FinanceCard title="Income" headingElement="h2">
    <Incomes
      incomes={incomes}
      on:addExpense={({ detail }) => {
        incomesStore.update((state) => [...state, detail]);
      }}
    />
  </FinanceCard>
  <FinanceCard title="Total" headingElement="h2">
    <TotalBalance expenses={expenses} incomes={incomes} />
  </FinanceCard>
</div>
