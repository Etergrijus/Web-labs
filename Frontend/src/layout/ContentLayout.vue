<script setup lang="ts">

import ContentHeader from "@/components/App/ContentHeader.vue";
import Footer from "@/components/App/Footer.vue";

</script>

<template>
  <div class="wrap content">
    <ContentHeader/>
    <main class="content-place wrap">
      <router-view/>
    </main>
  </div>
  <Footer/>
</template>

<style scoped>
.content {
  background-color: #fdf4e3;
}

.content-place {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 768px) {
  .content-place {
    flex-direction: column;
  }

  .content-place .default-button {
    width: 75%;
  }
}

@media screen and (max-width: 500px) {
  .content-place h1 {
    font-size: 18px;
  }

  .content-place .char-block h2 {
    font-size: 16px;
  }
}

</style>
