<script lang="ts">
  import Plus from "$lib/components/Icons/Plus.svelte";
  import TextArea from "$lib/components/TextArea/TextArea.svelte";
  import TextInput from "$lib/components/TextInput/TextInput.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex flex-col min-h-screen px-5.5">
  <form action="?/updateStock" method="post" class="gap-4 flex flex-col">
    <TextInput
      label="Nama Produk"
      name="name"
      placeholder="Masukkan nama produk"
      value={data.product.name}
      disabled
    />
    <TextInput
      name="gender"
      disabled
      value={data.product.gender.name}
      label="Pilih gender"
    />
    <TextInput
      name="category"
      disabled
      value={data.product.category.name}
      label="Pilih kategori"
    />
    <TextArea
      label="Deskripsi Produk"
      name="description"
      placeholder="Masukkan deskripsi produk"
      value={data.product.description}
      disabled
    />
    {#if data.stocks && data.stocks.length !== 0}
      {#each data.stocks as stock (stock.id)}
        <div class="flex items-center justify-between gap-2">
          <TextInput
            label="Ukuran"
            name=""
            type="number"
            disabled
            value={stock.size.size}
          />
          <TextInput
            min={0}
            label="Stock"
            name={stock.size.id.toString()}
            placeholder="0"
            type="number"
            value={stock.amount}
          />
        </div>
      {/each}
    {:else}
      <form action="?/newStock" method="post">
        <button class="btn flex items-center gap-1 w-fit">
          <Plus height="16" width="16" class="fill-white" /> Buat Stock
        </button>
      </form>
    {/if}
    <button class="btn w-full btn-primary" type="submit">
      Simpan perubahan
    </button>
  </form>
</div>
