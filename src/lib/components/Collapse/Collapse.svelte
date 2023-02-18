<script lang="ts">
  import ChevronDown from "../Icons/ChevronDown.svelte";
  import ChevronUp from "../Icons/ChevronUp.svelte";

  export let onClick: () => void;
  export let isShow: boolean;
  export let title: string;
  export let description: string;
</script>

<div class="flex flex-col w-full">
  <button
    class="flex flex-col w-full transition-all {isShow ? 'h-24' : 'h-12'}"
    on:click={onClick}
  >
    <div
      class="flex items-center justify-between w-full {isShow
        ? 'mb-4'
        : 'mb-0'}"
    >
      <p class="text-xl font-medium">{title}</p>
      {#if isShow}
        <ChevronUp width="20" height="20" />
      {:else}
        <ChevronDown width="20" height="20" />
      {/if}
    </div>
    {#if isShow}
      <p class="text-start">
        {description}
      </p>
    {/if}
  </button>
  <div class="border-b w-full mb-5 {isShow ? 'mt-5' : ''}" />
</div>
