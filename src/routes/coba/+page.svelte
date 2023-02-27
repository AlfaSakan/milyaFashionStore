<script lang="ts">
  let files: FileList;

  let image1 = "";

  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const reader = new FileReader();

    const inputFiles = e.currentTarget.files;

    if (inputFiles) {
      reader.onload = (ev) => {
        image1 = ev.target?.result as string;
      };
      reader.readAsDataURL(inputFiles[0]);
    }
  }
</script>

<form action="?/add" method="post" enctype="multipart/form-data">
  <!-- <div>
    <img src={image1} alt="coba imalsjcnlask" />
  </div> -->
  <input
    multiple
    type="file"
    name="file"
    id="file"
    accept="image/*"
    on:change={handleChange}
    {files}
  />
  <button type="submit">Submit Photo</button>
</form>
