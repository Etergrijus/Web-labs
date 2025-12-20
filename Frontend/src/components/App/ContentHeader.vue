<script setup lang="ts">
import SimpleImageButton from "../Design/SimpleImageButton.vue";

import api from "../../services/api"
import router from "@/router/index";

const logoutRequest = async () => {
  try {
    const response = await api.post('/logout', {})
    console.log("Ответ:", response.data)
    await router.push({name: 'home'})
  } catch (error) {
    console.error('Logout error:', error)
  }
}
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
      <SimpleImageButton
        button-text="Выйти в Okno"
        image-url="img/window.png"
        font_color="white"
        :font_size="24"
        :top_="94"
        font_family="Silkscreen"
        :image_width="200"
        :image_height="200"
        @click="logoutRequest"
      >
      </SimpleImageButton>
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
