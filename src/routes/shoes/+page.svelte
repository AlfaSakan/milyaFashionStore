<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <p>SHOES</p>
  {#each data.products as product}
    <p>{product.name}</p>
  {/each}
</div>
