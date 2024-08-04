<script lang="ts">
  let isSidebarOpen = false;
</script>

<div
  class="flex flex-col gap-4 border-r-2 border-slate-300 bg-slate-700 text-white transition-[min-width] duration-200 {isSidebarOpen
    ? 'min-w-80'
    : 'min-w-20'}"
>
  <button
    on:click={() => {
      isSidebarOpen = !isSidebarOpen;
    }}
  >
    {isSidebarOpen ? "Close Icon" : "Open Icon"}
  </button>
</div>
