<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;
  export let placeholder: string | null = null;
  export let required: boolean | null = null;
  export let value: string | null;
  export let error: string | null;
  export let maxLength: number | null = null;
  export let pattern: string | null = null;
</script>

<label id="{id}-input-label" class="flex flex-col gap-1">
  {label}
  <input
    id="{id}-input"
    required={required}
    name={name}
    type="text"
    placeholder={placeholder}
    pattern={pattern}
    class="p-1 text-black placeholder:text-slate-800 placeholder:text-opacity-30"
    maxlength={maxLength}
    bind:value={value}
    on:input={() => {
      error = null;
    }}
    on:change
  />
</label>
