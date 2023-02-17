<script lang="ts">
  import { formatNumberToRupiah } from "$lib/utils/number.util";

  export let title: string;
  export let price: number;
</script>

<div
  class="card card-compact w-full lg:w-96 lg:h-134 bg-white shadow-xl rounded-lg"
>
  <figure class="w-full h-full object-cover">
    <img
      class="w-full h-full object-fill"
      src="https://picsum.photos/300/300"
      alt="Shoes"
    />
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
</div>
