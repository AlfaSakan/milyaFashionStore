<script lang="ts">
  import ChevronDown from "../Icons/ChevronDown.svelte";

  export let name: string;
  export let label: string = "";
  export let value: string | undefined;
  export let items: { value: string; label: string }[] = [];

  let className: string = "";
  export { className as class };

  $: selectedValue = value || items.length > 0 ? items[0].value : "";
</script>

<div class={className}>
  <label for={name} class="label">{label}</label>
  <div class="input input-bordered w-full px-0 relative">
    <select
      id={name}
      {name}
      class="input bg-transparent appearance-none outline-none focus:outline-none w-full absolute"
      value={selectedValue}
    >
      {#each items as item (item.value)}
        <option value={item.value}>{item.label}</option>
      {/each}
    </select>
    <div class="absolute right-4 h-full flex items-center justify-center">
      <ChevronDown height="16" width="16" />
    </div>
  </div>
</div>
