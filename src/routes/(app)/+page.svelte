<script lang="ts">
  import { Card, Carousel } from "$lib/components";
  import { onInterval } from "$lib/utils/interval.util";
  import type { CarouselItem } from "$lib/utils/types.util";
  import type { PageData } from "./$types";

  export let data: PageData;

  const carouselItems: CarouselItem[] = [
    { imageUrl: "https://picsum.photos/720/300", title: "lorem" },
    { imageUrl: "https://picsum.photos/720/300", title: "lorem" },
    { imageUrl: "https://picsum.photos/720/300", title: "lorem" },
    { imageUrl: "https://picsum.photos/720/300", title: "lorem" },
  ];

  let carousel: HTMLDivElement;

  onInterval(() => {
    const { scrollLeft, scrollWidth } = carousel;
    const range = scrollWidth / carouselItems.length;

    if (scrollLeft >= scrollWidth - range) {
      carousel.scrollLeft = 0;
      return;
    }

    carousel.scrollLeft = scrollLeft + range;
  }, 3000);
</script>

<Carousel bind:carousel {carouselItems} />

{#if data.user}
  <p>{JSON.stringify(data.user)}</p>
{/if}

<div class="grid grid-cols-2 w-full gap-2 place-items-center">
  {#each data.products as product (product.id)}
    <Card
      href="/product/{product.id}"
      price={100000}
      title={product.name}
      image={product.Image[0]}
    />
  {/each}
</div>
