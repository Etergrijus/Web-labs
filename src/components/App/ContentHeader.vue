<script setup lang="ts">
import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";
</script>

<template>
  <div class="content-header">
    <div class="img-button">
      <router-link to="/archive">
        <SimpleImageButton
          button-text="Посмотреть летопись"
          image-url="img/archive.png"
          :top_="94"
          font_family="Silkscreen"
          font_color="white"
        >
        </SimpleImageButton>
      </router-link>
    </div>

    <div class="img-button">
      <router-link to="/">
        <SimpleImageButton
          button-text="Выйти в Okno"
          image-url="img/window.png"
          font_color="white"
          :font_size="24"
          :top_="94"
          font_family="Silkscreen"
          :image_width="200"
          :image_height="200"
        >
        </SimpleImageButton>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.content-header {
  display: flex;
  justify-content: right;
}

.img-button {
  margin: 15px;
  width: initial;
}

@media screen and (max-width: 768px) {
  .content-header {
    flex-direction: column;
  }
}


</style>
