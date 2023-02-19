<script lang="ts">
  import TableProduct from "$lib/components/TableProduct/TableProduct.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ products } = data);

  export const form: FormData;
  $: console.log({ form });
</script>

<div class="flex flex-col min-h-screen px-5.5">
  <form action="?/createProduct" method="post" class="gap-4 flex flex-col">
    <div>
      <label for="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
    </div>
    <div>
      <label for="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
    </div>
    <div>
      <label for="amount">Amount</label>
      <input
        id="amount"
        name="amount"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
    </div>
    <button class="btn w-full btn-primary" type="submit">Create Product</button>
  </form>

  <div class="mt-10 flex flex-col gap-6">
    <TableProduct {products} />
  </div>
</div>
