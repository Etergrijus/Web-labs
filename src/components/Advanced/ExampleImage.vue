<script setup lang="ts">

</script>

<template>
  <div class="example-image"><img src="/img/macket.jpg"></div>
</template>

<style scoped>
.example-image {
  width: calc(33% - 5px);
  overflow: hidden;
  aspect-ratio: 1 / 0.7;
}

.example-image img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .example-image {
    width: calc(100% - 5px);
  }


}

</style>
