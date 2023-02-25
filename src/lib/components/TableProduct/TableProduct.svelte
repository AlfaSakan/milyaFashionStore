<script lang="ts">
  import type { Image, Product } from "@prisma/client";

  export let products: (Product & {
    gender: { name: string };
    category: { name: string };
    Image?: Image[];
  })[] = [];

  let className: string = "";
  export { className as class };

  const tableHeaders = ["name", "deskripsi", "gender", "kategori"];
</script>

<div class="overflow-x-auto w-full {className}">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        {#each tableHeaders as tableHead, i (i + tableHead)}
          <th>{tableHead}</th>
        {/each}
        <th>Keterangan</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <!-- rows -->
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
                    src={product.Image && product.Image.length > 0
                      ? product.Image[0].imgUrl
                      : "https://picsum.photos/200"}
                    alt={product.Image && product.Image.length > 0
                      ? product.Image[0].title
                      : "Avatar Tailwind CSS Component"}
                    class="animate-skeleton"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{product.name}</div>
                <div class="flex items-center gap-1">
                  <span class="badge badge-info badge-sm">
                    {product.category.name}
                  </span>
                  <span class="badge badge-info badge-sm">
                    {product.gender.name}
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            {product.description}
            <br />
            <span class="badge badge-ghost badge-sm">{product.description}</span
            >
          </td>
          <td>
            {product.gender.name}
          </td>
          <td>
            {product.category.name}
          </td>
          <th>
            <a href="/admin/stock/{product.id}" class="btn btn-ghost btn-xs"
              >details</a
            >
          </th>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th />
        {#each tableHeaders as tableHead, i (i + tableHead)}
          <th>{tableHead}</th>
        {/each}
        <th />
        <th />
      </tr>
    </tfoot>
  </table>
</div>
