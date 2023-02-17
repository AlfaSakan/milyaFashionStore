<script>
  import Card from "$lib/components/Card/Card.svelte";

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
</script>

<div />
<div class="carousel w-full">
  <div id="item1" class="carousel-item w-full">
    <img src="https://picsum.photos/720/300" class="w-full" alt="lorem" />
  </div>
  <div id="item2" class="carousel-item w-full">
    <img src="https://picsum.photos/720/300" class="w-full" alt="lorem" />
  </div>
  <div id="item3" class="carousel-item w-full">
    <img src="https://picsum.photos/720/300" class="w-full" alt="lorem" />
  </div>
  <div id="item4" class="carousel-item w-full">
    <img src="https://picsum.photos/720/300" class="w-full" alt="lorem" />
  </div>
</div>
<div class="flex justify-center w-full py-2 gap-2">
  <a href="#item1" class="btn btn-xs">1</a>
  <a href="#item2" class="btn btn-xs">2</a>
  <a href="#item3" class="btn btn-xs">3</a>
  <a href="#item4" class="btn btn-xs">4</a>
</div>

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
