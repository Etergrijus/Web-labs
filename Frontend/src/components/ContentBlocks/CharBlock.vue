<script setup lang="ts">

import {ref} from "vue";
import {useFileDialog} from "@vueuse/core";
import AttributeString from "../Advanced/AttributeString.vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";

const props = defineProps<{
  heart_value: number,
  bolt_value: number,
  star_value: number,
  gear_wheel_value: number,
  char_name: string,
}>()

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

const char_name = ref(props.char_name)

//Переменные для характеристик
const heartValue = ref(props.heart_value)
const boltValue = ref(props.bolt_value)
const starValue = ref(props.star_value)
const gearWheelValue = ref(props.gear_wheel_value)

</script>

<template>
  <div class="char-block">
    <h1 style="margin-top: 40px; color: #ff2400">{{char_name}}</h1>
    <img :src="imageSrc" width="400px">
    <SimpleImageButton style="margin-top: 30px; border: 2px #ff2400 solid; border-radius: 5px"
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
