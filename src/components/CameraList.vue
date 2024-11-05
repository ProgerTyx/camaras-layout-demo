<script setup lang="ts">
import { ICamera } from "../data";
import Camera from "./Camera.vue";
import draggable from "vuedraggable";

interface IProps {
  cameras: ICamera[];
  mode: "edit" | "preview";
}

interface IEmits {
  (e: "dragstart", cameraId: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const onDragStart = (_: DragEvent, cameraId: string) => {
  if (props.mode === "edit") {
    emit("dragstart", cameraId);
  }
};
</script>

<template>
  <div class="camera-list">
    <draggable v-model="props.cameras" group="cameras">
      <template v-slot:item="{ element }">
        <Camera
          :key="element.id"
          v-bind="element"
          @dragstart="(event) => onDragStart(event, element.id)"
          :draggable="props.mode === 'edit'"
        />
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.camera-list {
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  flex: 1;
  width: 240px;
  background-color: rgb(28, 27, 27);
  border-top: 2px solid rgb(38, 38, 38);
  border-bottom: 2px solid rgb(38, 38, 38);
}
</style>
