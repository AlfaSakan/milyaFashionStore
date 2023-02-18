<script lang="ts">
  import BagShopping from "$lib/components/Icons/BagShopping.svelte";
  import Hamburger from "$lib/components/Icons/Hamburger.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
  import "../app.css";

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }
</script>

<div class="relative">
  <header class="flex items-center justify-between px-2 py-3">
    <button
      class="btn btn-square bg-transparent border-none"
      on:click={toggleMenu}
    >
      <Hamburger />
    </button>
    <div class="btn btn-square bg-transparent border-none opacity-0" />
    <div class="flex flex-1 items-center justify-center">
      <a href="/" class="font-bold text-2xl">Logo</a>
    </div>
    <div class="flex items-center">
      <button class="btn btn-square bg-transparent border-none">
        <BagShopping />
      </button>
      <button class="btn btn-square bg-transparent border-none">
        <Search />
      </button>
    </div>
  </header>
  <slot />
  <footer
    class="flex w-full bg-black text-white h-14 justify-center items-center mt-10"
  >
    <p class="text-2xl font-semibold">Footer</p>
  </footer>
  <button
    on:click={toggleMenu}
    class="fixed bg-black bg-opacity-50 inset-0 transition-all {showMenu
      ? 'opacity-100 visible'
      : 'opacity-0 invisible'}"
  >
    <button
      on:click|stopPropagation={() => {}}
      class="bg-white w-72 h-screen flex transition-all duration-300 {showMenu
        ? 'translate-x-0'
        : '-translate-x-10'}"
    >
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <li><a href="/about">About</a></li>
        <li><a href="/product/123">Product 123</a></li>
      </ul>
    </button>
  </button>
</div>
