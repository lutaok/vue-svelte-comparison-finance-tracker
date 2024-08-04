<script context="module" lang="ts">
  export type Transaction = {
    title: string;
    value: number;
    date: string;
  };
</script>

<script lang="ts">
  import TransactionCard from "./TransactionCard.svelte";

  export let transactions: Transaction[];
</script>

<ul class="my-4 flex flex-col gap-2">
  <!-- TODO: Use ID as key -->
  {#each transactions as transaction, index (index)}
    <li>
      <TransactionCard
        id="{index}-{transaction.title}"
        title={transaction.title}
        value={transaction.value}
        date={transaction.date}
      />
    </li>
  {/each}
</ul>
