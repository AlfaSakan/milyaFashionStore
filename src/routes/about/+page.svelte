<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  let scrollY: number;

  async function coba() {
    const res = await fetch("/api/hello", { method: "GET" });
    console.log({ coba: await res.json() });
  }

  export let data: PageData;

  onMount(() => {
    coba();
  });
</script>

{#if scrollY < 50}
  <div class="navbar">Navstuff</div>
{/if}

<div class="bg-white flex flex-col h-screen">
  <h1>Hello World</h1>
  box
  <p>{data.hello}</p>
</div>

<svelte:window bind:scrollY />
