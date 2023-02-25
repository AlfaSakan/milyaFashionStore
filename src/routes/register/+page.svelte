<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { TextInput } from "$lib/components";
  import { signUpDto } from "$lib/schema/user.schema";
  import { validateData } from "$lib/utils/validate-data.util";

  let loading = false;
  let fieldErrors: Record<string, string> = {};

  const submitForm: SubmitFunction = async ({ data, cancel }) => {
    loading = true;
    const formData = Object.fromEntries(data);

    const { errors } = validateData(formData, signUpDto);

    if (errors) {
      fieldErrors = errors;
      loading = false;
      cancel();
    }

    return ({ result, update }) => {
      switch (result.type) {
        case "failure":
          fieldErrors = { ...fieldErrors, email: result.data?.email };
          break;

        case "redirect":
          update();
          break;

        default:
          update();
          break;
      }
      loading = false;
    };
  };
</script>

<div class="flex w-full h-screen items-center justify-center px-10 bg-white">
  <form
    action="?/signUp"
    method="post"
    class="card shadow-xl w-96 bg-base-100 p-10 border"
    use:enhance={submitForm}
  >
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
      placeholder="******"
      type="password"
    />
    <TextInput
      label="Konfirmasi password"
      name="confirmPassword"
      error={fieldErrors?.confirmPassword}
      placeholder="******"
      type="password"
    />
    <button class="btn btn-primary w-full" disabled={loading}>Masuk</button>
  </form>
</div>
