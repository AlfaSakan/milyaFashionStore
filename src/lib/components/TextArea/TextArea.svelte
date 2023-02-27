<script lang="ts">
  export let label: string;
  export let name: string;
  export let error: string = "";
  export let placeholder: string;
  export let value: string = "";
  export let disabled: boolean = false;
</script>

<div class="form-control w-full">
  <label for={name} class="label">
    <span class="label-text font-semibold">{label}</span>
    <!-- <span class="label-text-alt">Alt label</span> -->
  </label>
  <textarea
    {placeholder}
    class="textarea textarea-bordered h-24 w-full resize-none"
    id={name}
    {name}
    {value}
    {disabled}
  />
  <label for={name} class="label">
    <span class="label-text-alt text-error">{error ? error : ""}</span>
  </label>
</div>
