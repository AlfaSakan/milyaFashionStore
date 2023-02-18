<script lang="ts">
  import Card from "$lib/components/Card/Card.svelte";
  import type { CarouselItem } from "$lib/components/Carousel/carousel";
  import Carousel from "$lib/components/Carousel/Carousel.svelte";
  import { onInterval } from "$lib/utils/interval.util";

  const cards = [
    {
      title: "Shoes",
      price: 120000,
    },
    {
      title: "Shoes",
      price: 120000,
    },
    {
      title: "Shoes",
      price: 120000,
    },
    {
      title: "Shoes",
      price: 120000,
    },
    {
      title: "Shoes",
      price: 120000,
    },
    {
      title: "Shoes",
      price: 120000,
    },
  ];

  const carouselItems: CarouselItem[] = [
    { imageUrl: "https://picsum.photos/720/300" },
    { imageUrl: "https://picsum.photos/720/300" },
    { imageUrl: "https://picsum.photos/720/300" },
    { imageUrl: "https://picsum.photos/720/300" },
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

<div class="grid grid-cols-2 w-full gap-2 place-items-center">
  {#each cards as card, index (index)}
    <Card price={card.price} title={card.title} />
  {/each}
</div>

<style lang="postcss">
  /* :global(html) {
    background-color: theme(colors.gray.100);
  } */
</style>
