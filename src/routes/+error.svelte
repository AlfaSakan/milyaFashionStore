<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="">
  <h1>Error happen</h1>
  <p>Status: {$page.status}</p>
  <p>Message: {$page.error?.message}</p>
</div>
