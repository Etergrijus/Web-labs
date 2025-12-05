<script setup lang="ts">
import Header from "@/components/App/Header.vue";
import Footer from "@/components/App/Footer.vue";
</script>

<template>
  <div class="wrap">
    <Header/>
    <main>
      <router-view />
    </main>
  </div>

  <Footer />
</template>
