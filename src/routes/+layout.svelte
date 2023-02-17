<script lang="ts">
  import BagShopping from "$lib/components/Icons/BagShopping.svelte";
  import Hamburger from "$lib/components/Icons/Hamburger.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
  import "../app.css";
</script>

<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="flex items-center justify-between px-2 py-3">
      <label for="my-drawer" class="btn btn-square bg-transparent border-none">
        <Hamburger />
      </label>
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
    </div>
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <ul class="menu p-4 w-80 bg-base-100 text-base-content">
      <li><a href="google.co.id">Sidebar Item 1</a></li>
      <li><a href="google.co.id">Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
