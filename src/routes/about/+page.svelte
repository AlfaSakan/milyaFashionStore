<script lang="ts">
  let scrollY: number;
</script>

{#if scrollY < 50}
  <div class="navbar">Navstuff</div>
{/if}

<div class="main">
  <h1>Hello World</h1>
  box
</div>

<svelte:window bind:scrollY />

<style>
  .navbar {
    color: white;
    background: red;
    position: fixed;
    height: 50px;
    width: 100%;
  }
  .main {
    height: 200vh;
    background: yellow;
    margin-top: 50px;
  }
</style>
