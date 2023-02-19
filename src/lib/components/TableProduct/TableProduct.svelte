<script lang="ts">
  import type { Product } from "@prisma/client";

  export let products: Product[] = [];

  const exclude = ["id", "createdat", "updatedat"];

  $: tableHeads = Object.keys(products[0]).filter(
    (value) => !exclude.includes(value.toLowerCase())
  );
</script>

<div class="overflow-x-auto w-full">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        {#each tableHeads as tableHead, i (i + tableHead)}
          <th>{tableHead}</th>
        {/each}
        <th>Favorite Color</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      {#each products as product (product.id)}
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    src="https://picsum.photos/200"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{product.name}</div>
                <div class="text-sm opacity-50">United States</div>
              </div>
            </div>
          </td>
          <td>
            {product.description}
            <br />
            <span class="badge badge-ghost badge-sm">{product.description}</span
            >
          </td>
          <td>Purple</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th />
        {#each tableHeads as tableHead, i (i + tableHead)}
          <th>{tableHead}</th>
        {/each}
        <th>Favorite Color</th>
        <th />
      </tr>
    </tfoot>
  </table>
</div>
