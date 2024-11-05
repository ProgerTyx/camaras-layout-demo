<script setup lang="ts">
import { ICamera } from "../data";

interface Props extends ICamera {}

const props = defineProps<Props>();

const statusName = props.status === 1 ? "online" : "offline";
</script>

<template>
  <div class="camera">
    <div :class="`camera__status camera__status--${statusName}`"></div>
    <p>{{ props.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.camera {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(38, 38, 38);
  }

  &:not(:last-child) {
    border-bottom: 2px solid rgb(38, 38, 38);
  }

  &__status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 16px;

    &--online {
      background-color: rgb(10, 180, 10);
      box-shadow: 0 0 8px rgb(10, 180, 10);
    }

    &--offline {
      background-color: rgb(180, 10, 10);
      box-shadow: 0 0 8px rgb(180, 10, 10);
    }
  }
}
</style>
