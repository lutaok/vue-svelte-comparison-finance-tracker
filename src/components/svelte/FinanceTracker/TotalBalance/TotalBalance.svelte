<script lang="ts">
  import type { Expense } from "../Expenses/Expenses.svelte";
  import type { Income } from "../Incomes/Incomes.svelte";

  export let expenses: Expense[];
  export let incomes: Income[];

  $: balance = calculateBalance(expenses, incomes);

  const calculateBalance = (expenses: Expense[], incomes: Income[]): number => {
    const totalExpenses = expenses.reduce((acc, curr) => {
      return acc + curr.expense;
    }, 0);

    const totalIncomes = incomes.reduce((acc, curr) => {
      return acc + curr.income;
    }, 0);

    return totalIncomes - totalExpenses;
  };
</script>

<div class="font-bold">
  {balance}
</div>
