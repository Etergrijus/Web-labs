<script setup lang="ts">

import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";
</script>

<template>
  <div class="row" style="align-items: center; margin-top: 30px; margin-bottom: 30px">
    <div class="column">
      <label style="font-size: 26px; margin-bottom: 80px">Что-то эпическое</label>
      <input type="checkbox" class="checkbox" >
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
.checkbox {
  appearance: none;
  width: 70px;
  height: 70px;
  border: 2px solid darkgoldenrod;
  border-radius: 15px;
  background-color: #151719;
  cursor: pointer;
}

.checkbox:checked {
  background-image: url("/img/stamp.png");
  background-size: 100%, 100%;
  background-position: center center;
  background-repeat: no-repeat;
}

.task-buttons {
  display: flex;
  flex-direction: column;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
}
</style>
