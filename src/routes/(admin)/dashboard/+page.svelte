<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import {
    InputImage,
    InputOption,
    TableProduct,
    TextArea,
    TextInput,
  } from "$lib/components";
  import { imageSchema } from "$lib/schema/image.schema";
  import {
    createProductDto,
    type CreateProductDto,
  } from "$lib/schema/product.schema";
  import { uploadFileList } from "$lib/utils/firebase.util";
  import { validateData } from "$lib/utils/validate-data.util";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: firebaseOptions = data.firebaseOptions;
  // export let form: ActionData;

  let base64: string[] = [];
  let formErrors: Record<string, string | undefined>;
  let formData: CreateProductDto;

  function handleChange(e: CustomEvent<{ files: FileList }>) {
    const inputFiles = e.detail.files;
    formErrors = { ...formErrors, file: undefined };

    if (inputFiles) {
      for (const f of inputFiles) {
        const valid = imageSchema.safeParse(f);
        if (!valid.success) {
          const fileError = valid.error.flatten().formErrors[0];
          formErrors = { ...formErrors, file: fileError };
          continue;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = (ev.target?.result as string) || "";
          base64 = [...base64, result];
        };
        reader.readAsDataURL(f);
      }
    }
  }

  const handleSubmit: SubmitFunction = async ({ data, cancel }) => {
    const { files, ...rest } = Object.fromEntries(data);

    const dataFiles = data.getAll("files") as unknown as FileList;

    const { errors } = validateData(rest, createProductDto);

    if (errors) {
      formErrors = errors;
      cancel();
      return;
    }

    try {
      const urls = await uploadFileList(dataFiles, firebaseOptions);
      data.set("files", JSON.stringify(urls));
    } catch (err) {
      console.error({ err });
      cancel();
    }

    return ({ result, update }) => {
      switch (result.type) {
        case "success":
          base64 = [];
          update();
          break;
        case "error":
          update();
          break;

        default:
          break;
      }
    };
  };
</script>

<div class="flex flex-col px-5.5 lg:pl-0">
  <form
    action="?/createProduct"
    method="post"
    class="gap-4 flex flex-col"
    use:enhance={handleSubmit}
  >
    <TextInput
      label="Nama Produk"
      name="name"
      placeholder="Masukkan nama produk"
      error={formErrors?.name}
      value={formData?.name}
    />
    <InputOption
      class="-mt-4"
      name="gender"
      items={data.genders.map((gender) => ({
        label: gender.name,
        value: gender.id.toString(),
      }))}
      label="Pilih gender"
      value={formData?.gender}
    />
    <InputOption
      name="category"
      items={data.categories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }))}
      label="Pilih kategori"
      value={formData?.category}
    />
    <TextArea
      label="Deskripsi Produk"
      name="description"
      placeholder="Masukkan deskripsi produk"
      error={formErrors?.description}
      value={formData?.description}
    />
    {#if base64.length > 0}
      <div class="flex overflow-x-scroll gap-2">
        {#each base64 as src, i (i)}
          <img {src} alt="coba base64" class="w-52 h-52 object-cover" />
        {/each}
      </div>
    {/if}
    <InputImage
      name="files"
      label="Upload images"
      class="-mt-4"
      on:select={handleChange}
      error={formErrors?.file}
    />
    <button class="btn w-full btn-primary" type="submit">Create Product</button>
  </form>
</div>

{#if data.products.length > 0}
  <div class="pl-5.5 pt-5.5 lg:pl-0">
    <TableProduct products={data.products} class="pr-5.5" />
  </div>
{/if}
