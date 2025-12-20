<script setup lang="ts">
import CharBlock from "../components/ContentBlocks/CharBlock.vue";
import TasksBlock from "../components/ContentBlocks/TasksBlock.vue";
import {onMounted} from "vue";

import api from "../services/api"

/*onMounted(async () => {
  await getCharacterData()
})

const getCharacterData = async () => {
  try {
    const response = api.get('/character/')
  }
}*/

</script>

<template>
    <CharBlock/>
    <TasksBlock/>
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
