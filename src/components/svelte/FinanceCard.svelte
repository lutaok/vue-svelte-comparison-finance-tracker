<script lang="ts">
  export let title: string;
  export let headingElement: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
</script>

<section class="w-80 rounded-lg border-2 border-slate-300 bg-slate-700 p-4">
  <svelte:element this={headingElement}>{title}</svelte:element>

  <slot />
</section>
