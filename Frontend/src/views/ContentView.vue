<script setup lang="ts">
import CharBlock from "../components/ContentBlocks/CharBlock.vue";
import TasksBlock from "../components/ContentBlocks/TasksBlock.vue";
import {onMounted, ref} from "vue";

import api from "../services/api"
import {useRoute} from "vue-router";


const charData = ref(null);
const route = useRoute()
const char_id = route.query.id;

onMounted(() => {
  console.log('ID из роута:', char_id);
  if (char_id)
    getCharacterData()
})

const getCharacterData = async () => {
  try {
    const response = await api.get(`/character/${char_id}`)
    charData.value = response.data
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

</script>

<template>
  <CharBlock
    v-if="charData"

    :heart_value="charData.heart_value"
    :bolt_value="charData.bolt_value"
    :star_value="charData.star_value"
    :gear_wheel_value="charData.gear_wheel_value"
    :char_name="charData.char_name"
  />
  <TasksBlock
    v-if="charData"

    :quests="charData.quests"
  />
</template>

<style scoped>
.content {
  background-color: #fdf4e3;
}

@media screen and (max-width: 768px) {
  .content-button {
    font-size: 1.0em;
  }
}

@media screen and (max-width: 500px) {
  .content-button {
    font-size: 0.8em;
  }
}
</style>
