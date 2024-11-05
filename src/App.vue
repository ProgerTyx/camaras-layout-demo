<script setup lang="ts">
import Builder from "./components/Builder.vue";
</script>

<template>
  <div class="main">
    <Builder />
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(34, 34, 34);

  width: 100vw;
  height: 100vh;
}
</style>
