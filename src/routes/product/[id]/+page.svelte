<script lang="ts">
  import type { CarouselItem } from "$lib/components/Carousel/carousel";
  import Carousel from "$lib/components/Carousel/Carousel.svelte";
  import Collapse from "$lib/components/Collapse/Collapse.svelte";
  import { formatNumberToRupiah } from "$lib/utils/number.util";
  import type { PageData } from "./$types";

  export let data: PageData;

  let carousel: HTMLDivElement;
  $: carouselItems = data.product.Image.map((img) => ({
    title: img.title,
    imageUrl: img.imgUrl,
  })) satisfies CarouselItem[];

  const variants = [
    "https://picsum.photos/120/120",
    "https://picsum.photos/120/120",
    "https://picsum.photos/120/120",
    "https://picsum.photos/120/120",
  ];
  const sizes = [
    "EU 36",
    "EU 37",
    "EU 38",
    "EU 39",
    "EU 40",
    "EU 41",
    "EU 42",
    "EU 43",
    "EU 44",
    "EU 45",
  ];

  const init = {
    size: false,
    return: false,
    review: false,
  };

  let isCollapse = {
    size: false,
    return: false,
    review: false,
  };

  let scrollY: number;

  function toggleCollapse(type: keyof typeof init) {
    return () => (isCollapse = { ...init, [type]: !isCollapse[type] });
  }
</script>

<div class="flex flex-col relative">
  <div class="pl-[22px] mt-8">
    <h2 class="font-semibold text-2xl">{data.product.name}</h2>
    <p class="text-base font-medium">{data.product.description}</p>
    <p class="my-4">{formatNumberToRupiah(1000000)}</p>
  </div>

  <Carousel {carouselItems} bind:carousel withPagination={false} />
  <div class="flex overflow-x-scroll pr-1">
    {#each variants as variant, index (index)}
      <img src={variant} alt="lorem" class="p-1 pr-0" />
    {/each}
  </div>

  <div class="px-[22px] mt-16">
    <div class="flex items-center justify-between mb-2 px-4">
      <p class="font-semibold text-black dark:text-white">Select size</p>
      <p class="text-neutral font-medium dark:text-white">Select size</p>
    </div>
    <div class="grid grid-cols-3 gap-2 mb-4">
      {#each data.stocks as stock (stock.id)}
        <button class="btn btn-outline {stock.amount && 'btn-disabled'}">
          {stock.size.size}
        </button>
      {/each}
    </div>
    <button class="btn w-full btn-circle mb-2 h-14 bg-black">Bag</button>
    <button class="btn w-full btn-circle btn-outline h-14">Bag</button>
    <p class="mt-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
      accusantium at nostrum consequuntur. Nam, adipisci in dolorum similique ad
      cum culpa deserunt temporibus nobis repellendus placeat voluptatem quidem
      rem earum.
    </p>

    <div class="border-b w-full mt-10 mb-6" />
    <Collapse
      description="attribute is necessary to make the div focusable"
      title="Size & Fit"
      isShow={isCollapse.size}
      onClick={toggleCollapse("size")}
    />
    <Collapse
      description="attribute is necessary to make the div focusable"
      title="Free Delivery and Returns"
      isShow={isCollapse.return}
      onClick={toggleCollapse("return")}
    />
    <Collapse
      description="attribute is necessary to make the div focusable"
      title="Reviews"
      isShow={isCollapse.review}
      onClick={toggleCollapse("review")}
    />
  </div>

  <div
    class="fixed bottom-0 transition-all duration-300 {scrollY > 550
      ? 'scale-0 opacity-0'
      : 'scale-100 opacity-100'}"
  >
    <button class="btn bg-black h-14 w-screen rounded-none">Buy</button>
  </div>
</div>

<svelte:window bind:scrollY />
