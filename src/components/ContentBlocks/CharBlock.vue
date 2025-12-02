<script setup lang="ts">

import Heart from "@/components/Drawnings/Heart.vue";
import Star from "@/components/Drawnings/Star.vue";
import Lightning from "@/components/Drawnings/Bolt.vue";
import GearWheel from "@/components/Drawnings/GearWheel.vue";
import {ref} from "vue";
import {useFileDialog} from "@vueuse/core";
import AttributeString from "@/components/Advanced/AttributeString.vue";
import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";

const imageSrc = ref('/img/empty_photo.jpg'); // Реактивная переменная для src

const {files, open, reset, onCancel, onChange} = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

onChange(() => {
  if (files.value && files.value.length > 0) {
    const file = files.value[0];
    imageSrc.value = URL.createObjectURL(file);
  }
})

//Переменные для характеристик
const heartValue = ref(0)
const boltValue = ref(0)
const starValue = ref(0)
const gearWheelValue = ref(0)

</script>

<template>
  <div class="char-block">
    <h1 style="margin-top: 40px">Тут будет ваше имя</h1>
    <img :src="imageSrc" width="400px">
    <SimpleImageButton style="margin-top: 30px"
                       button-text="Сменить портрет"
                       image-url="img/canvas.png"
                       @click="open"
                       :top_="90"
                       font_color="white"
                       :image_width="300"
                       font_family="Silkscreen"
    >
    </SimpleImageButton>
    <h2>Мои характеристики</h2>
    <div class="attributes-container">
      <AttributeString
        :attribute_value="heartValue"
        :attribute_emblem="'Heart'"
      >
      </AttributeString>
      <AttributeString
        :attribute_value="boltValue"
        :attribute_emblem="'Bolt'"
      >
      </AttributeString>
      <AttributeString
        :attribute_value="starValue"
        :attribute_emblem="'Star'"
      >
      </AttributeString>
      <AttributeString
        :attribute_value="gearWheelValue"
        :attribute_emblem="'GearWheel'"
      >
      </AttributeString>
    </div>
  </div>
</template>

<style scoped>
.char-block {
  display: flex;
  flex-direction: column;
  width: calc(33% - 1px);

  align-items: center;
  padding: 15px;
}

.char-block .content-button {
  margin-top: 30px;
}

.attributes-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*align-items: center;*/
  gap: 50px;
  margin-left: 50px;

  flex-wrap: wrap; /* Перенос на новую строку, если не помещаются */
  box-sizing: border-box; /* Учитываем padding/margin в ширине */
}

@media screen and (max-width: 768px) {
  .char-block {
    width: calc(100%);
  }

  .attributes-container {
    flex-direction: column;
    gap: 5px;
    width: 50%;
    align-items: start;
  }
}

@media screen and (max-width: 500px) {
  .char-block img {
    width: 200px;
  }
}
</style>
