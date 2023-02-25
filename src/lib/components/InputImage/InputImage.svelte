<script lang="ts">
  import type { EventChangeInput } from "$lib/utils/types.util";
  import { createEventDispatcher } from "svelte";

  export let name: string;
  export let label: string = "";
  export let value: string = "";
  export let error: string = "";

  const dispatch = createEventDispatcher();

  function handleChange(e: EventChangeInput) {
    dispatch("select", {
      files: e.currentTarget.files,
    });
  }

  let className: string = "";
  export { className as class };
</script>

<div class={className}>
  <label for={name} class="label">{label}</label>
  <input
    multiple
    type="file"
    {name}
    id={name}
    accept="image/*"
    class="file-input file-input-bordered w-full"
    {value}
    on:change={handleChange}
  />
  <label for={name} class="label">
    <span class="label-text-alt text-error">{error}</span>
  </label>
</div>
