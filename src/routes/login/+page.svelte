<script lang="ts">
  import type { SubmitFunction } from "$app/forms";
  import { TextInput } from "$lib/components";
  import { loginDto, type LoginDto } from "$lib/schema/user.schema";
  import { validateData } from "$lib/utils/validate-data.util";

  let loading = false;
  let fieldErrors: Record<string, string>;

  const submitForm: SubmitFunction = async ({ data, cancel }) => {
    loading = true;
    const formData = Object.fromEntries(data) as LoginDto;

    const { errors } = validateData(formData, loginDto);

    if (errors) {
      fieldErrors = errors;
      cancel();
    }

    return ({ result }) => {
      switch (result.type) {
        case "failure":
          fieldErrors = { ...fieldErrors, email: result.data?.email };
          break;

        default:
          break;
      }
    };
  };
</script>

<div class="flex w-full h-screen items-center justify-center px-10 bg-white">
  <form method="post" class="card shadow-xl w-96 bg-base-100 p-10 border">
    <TextInput
      label="Masukkan email"
      name="email"
      error={fieldErrors?.email}
      placeholder="Email"
      type="email"
    />
    <TextInput
      label="Masukkan password"
      name="password"
      error={fieldErrors?.password}
      placeholder="Password"
      type="password"
    />
    <button class="btn btn-primary w-full">Masuk</button>
  </form>
</div>
