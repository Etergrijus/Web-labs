<script setup lang="ts">

</script>

<template>
  <header>
    <div class="row header-container">
      <img src="/img/new_book.png" width="200">
      <h1>THE TITLE</h1>
      <a href="#start-to-work" class="default-button">Пропустить<br>катсцену</a>
    </div>

    <div class="header-text-container">
      <h2 class="welcome-text">Игровизированный <br> Планировщик задач</h2>
      <h3><i>Для тех, кто купил Скурим...</i></h3>
      <h3><i>...и устал от заметок</i></h3>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  justify-content: space-between;
  align-items: center;
  position: relative;

  margin-bottom: 0;
}

.header-container h1 {
  font-size: 96px;
  letter-spacing: 9px;
  color: #ff2400;
}

.header-text-container {
  margin-top: -40px;
}

header h3 {
  margin-bottom: 10px;
  margin-top: 1px;
}

header .default-button {
  width: min-content;
}

header {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .header-container {
    flex-direction: column;
  }
}

@media screen and (max-width: 500px) {
  .header-container img {
    width: 80px;
  }

  .header-container h1 {
    font-size: 56px;
    letter-spacing: 4px;
  }

  .header-text-container {
    margin-top: -20px;
  }
}

</style>
