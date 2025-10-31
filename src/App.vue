<script setup lang="ts">
import {useRoute} from 'vue-router'
</script>

<template>
  <component :is="useRoute().meta.layout">
    <slot/>
  </component>

</template>
