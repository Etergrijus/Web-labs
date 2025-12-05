<script setup lang="ts">

import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";
</script>

<template>
  <div class="row task-style">
    <div class="column">
      <label class="task-header-text">Что-то эпическое</label>
      <input type="checkbox" class="checkbox">
    </div>

    <div class="task-buttons">
      <SimpleImageButton
        style="margin-bottom: 30px"
        button-text="Редактировать"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
      ></SimpleImageButton>

      <SimpleImageButton

        button-text="Отменить"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
      ></SimpleImageButton>
    </div>
  </div>
</template>

<style scoped>

</style>
