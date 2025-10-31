<script setup lang="ts">
import ExampleImage from "@/components/Advanced/ExampleImage.vue";
</script>

<template>
  <div class="row examples-container">
    <ExampleImage/>
    <ExampleImage/>
    <ExampleImage/>
  </div>

  <div class="main-text"><p><b>THE TITLE</b> - функциональный планировщик задач для личного
    пользования. Создавайте задачи, гибко настраивайте их,
    ставьте себе дедлайны, и награждайте себя прокачкой... себя же.</p>
    <p><b>THE TITLE</b> позволяет:</p>
    <ul>
      <li> Отвлечься от рутины представлением себя персонажем весьма специфической РПГ-игры,
        в которой предстоит стоять в очередях и ходить на работу.
      </li>
      <li> Гибко настраивать свои задачи. Расставляйте приоритеты, ставьте дедлайны, разбивайте
        задачи на подзадачи,
        подсчитывайте циклические задачи и так далее.
      </li>
      <li> Просматривать свою летопись... И лишь ваше мировоззрение определит, с содроганием ли, или
        с гордостью.
      </li>
      <li> Прокачиваться. Потому что почему бы и нет. Особого смысла в этом нет. Как и в 83% ваших
        дел.
      </li>
    </ul>
  </div>

  <div class="welcome-text" id="start-to-work">
    <h1>Начнём?</h1>
    <h4>Тот, кто откажется, покинет веб-страницу...</h4>
  </div>

  <div class="button-box">
    <router-link to="/register" class="default-button">Начнём!</router-link>
    <router-link to="/login" class="default-button">Уже начал. Дайте продолжить</router-link>
  </div>
</template>

<style scoped>
.examples-container {
  flex-wrap: wrap;
  gap: 5px;
}

.button-box {
  display: flex;
  flex-direction: column;

  width: 500px;
  margin: 0 auto;
  align-items: center;
}


@media screen and (max-width: 500px) {
  .button-box {
    width: 250px;
  }
}

</style>
