<script lang="ts">
  import { NavBarAdmin } from "$lib/components";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<NavBarAdmin class="hidden lg:flex" />

<div class="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col pb-5.5 lg:py-5.5 lg:pl-5.5 static">
    <!-- Page content here -->
    <NavBarAdmin class="lg:hidden" />
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay" />
    <ul class="menu px-4 py-5.5 w-72 bg-base-300 text-base-content">
      <!-- Sidebar content here -->
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/product">Produk</a></li>
      <li><a href="/settings">Pengaturan</a></li>
    </ul>
  </div>
</div>
