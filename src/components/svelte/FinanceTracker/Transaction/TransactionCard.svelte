<script lang="ts">
  export let id: string;
  export let title: string;
  export let value: number;
  export let date: string;
</script>

<div
  id="{id}-transaction-container"
  class="flex justify-between gap-2 rounded-lg border-2 border-lime-300 bg-slate-400 p-4 text-slate-950"
>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold">{title}</h3>
    <p>{value}</p>
  </div>
  <p>{date}</p>
</div>
