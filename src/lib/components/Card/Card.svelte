<script lang="ts">
  import { formatNumberToRupiah } from "$lib/utils/number.util";
  import type { Image } from "@prisma/client";
  import Person from "../Icons/Person.svelte";

  export let title: string;
  export let price: number;
  export let image: Image | undefined;
  export let href: string = "";
</script>

<a
  {href}
  class="card card-compact lg:w-96 lg:h-134 bg-white shadow-xl rounded-lg"
>
  <figure class="w-52 h-52 bg-slate-300">
    {#if image}
      <img
        class="h-52 w-52 animate-skeleton object-cover"
        src={image.imgUrl}
        alt={image.title}
        loading="lazy"
        decoding="async"
      />
    {:else}
      <Person class="fill-black" width="104" height="104" />
    {/if}
  </figure>
  <div class="card-body">
    <h2 class="font-bold lg:card-title text-black">
      {title}
      <div class="badge badge-secondary text-xs">NEW</div>
    </h2>
    <p class="text-black">
      {formatNumberToRupiah(price)}
    </p>
    <div class="card-actions justify-start">
      <div class="badge badge-outline text-xs">Fashion</div>
      <div class="badge badge-outline text-xs">Products</div>
    </div>
  </div>
</a>
