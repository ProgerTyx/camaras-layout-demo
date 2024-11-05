<script setup lang="ts">
import { computed, ref } from "vue";
import {
  layout as dataLayout,
  cameras as dataCameras,
  ILayoutBlock,
} from "../data";
import CameraList from "./CameraList.vue";

const layout = ref(dataLayout);
const mode = ref<"edit" | "preview">("edit");
const cameras = ref(dataCameras);
const selectedCameraId = ref<string | null>(null);

const hasFilledBlocks = computed(() => {
  return layout.value.blocks.some((block) => block.content);
});

const clearLayout = () => {
  layout.value.blocks.forEach((block) => {
    block.content = "";
  });
};

const handledCameras = computed(() => {
  if (mode.value === "edit") {
    const usedCameraIds = layout.value.blocks
      .filter((block) => block.content)
      .map((block) => block.content);

    return cameras.value.filter((camera) => !usedCameraIds.includes(camera.id));
  }

  return cameras.value;
});

const handledLayout = computed(() => {
  if (mode.value === "edit") {
    return layout.value;
  }

  const nonEmptyBlocks = layout.value.blocks.filter((block) => block.content);

  const areaRows = layout.value.gridStyles.areas
    .trim()
    .split("\n")
    .map((row) => row.trim().replace(/"/g, "").split(" "));

  const newAreaRows = areaRows.filter((row) =>
    row.some((area) => nonEmptyBlocks.some((block) => block.area === area))
  );

  const newAreas = newAreaRows
    .map((row) => {
      const processedRow = row
        .map((area) =>
          nonEmptyBlocks.some((block) => block.area === area) ? area : "."
        )
        .join(" ");
      return `"${processedRow}"`;
    })
    .join("\n");

  return {
    ...layout.value,
    blocks: nonEmptyBlocks,
    gridStyles: {
      areas: newAreas || '". . . ."',
    },
  };
});

const toggleMode = () => {
  mode.value = mode.value === "edit" ? "preview" : "edit";
};

const onDragStart = (cameraId: string) => {
  if (mode.value === "edit") {
    selectedCameraId.value = cameraId;
  }
};

const onDrop = (_: DragEvent, block: ILayoutBlock) => {
  if (mode.value === "edit" && selectedCameraId.value) {
    block.content = selectedCameraId.value;
    selectedCameraId.value = null;
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};
</script>

<template>
  <div class="app">
    <div class="app__builder">
      <div :class="`builder builder--${mode}`">
        <div
          class="grid"
          :style="{ gridTemplateAreas: layout.gridStyles.areas }"
        >
          <div
            v-for="block in handledLayout.blocks"
            :key="block.id"
            :class="['block', block.type, { 'block--empty': !block.content }]"
            :style="{ gridArea: block.area }"
            @drop="onDrop($event, block)"
            @dragover="onDragOver"
          >
            <div v-if="block.content">{{ block.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="app__camera-list">
      <div class="info-panel">
        <div class="info-panel__version">
          <span>Builder v0.0.1</span>
        </div>

        <div class="info-panel__setting">
          <p :class="`info-panel__mode info-panel__mode--${mode}`">
            Mode: <span>{{ mode }}</span>
          </p>
          <button class="info-panel__mode-button" @click="toggleMode">
            Change mode
          </button>
        </div>

        <div v-if="hasFilledBlocks" class="info-panel__setting">
          <button class="info-panel__mode-button" @click="clearLayout">
            Clear layout
          </button>
        </div>
      </div>
      <CameraList
        :cameras="handledCameras"
        :mode="mode"
        @dragstart="onDragStart"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  width: 75%;
  height: 75%;
  background-color: rgb(28, 27, 27);
  border-radius: 16px;
  box-shadow: 0 0 16px rgb(28, 27, 27);
  overflow: hidden;

  &__builder {
    flex: 1;
    border-right: 2px solid rgb(41, 41, 41);
  }

  &__camera-list {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .info-panel {
    height: 330px;
    box-sizing: border-box;

    &__version {
      text-align: right;
      font-size: 12px;
      font-weight: 600;
      padding: 12px;
      border-bottom: 2px solid rgb(41, 41, 41);
      font-family: "Courier New", Courier, monospace;
      margin-bottom: 16px;
    }

    &__setting {
      padding: 0 16px;
    }

    &__mode {
      font-size: 16px;
      font-weight: 600;
      span {
        font-weight: 400;
      }
    }

    &__mode--edit {
      span {
        color: rgb(255, 185, 100);
      }
    }

    &__mode--preview {
      span {
        color: rgb(100, 227, 255);
      }
    }

    &__mode-button {
      margin-top: 10px;
      cursor: pointer;
    }
  }
}

.builder {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.builder--edit {
  .block {
    background-color: rgb(80, 121, 80);
  }

  .block--empty {
    background-color: rgb(121, 80, 80);
  }
}

.grid {
  display: grid;
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
}

.block {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(41, 41, 41);
  box-sizing: border-box;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-width: 0;
    overflow: hidden;
    word-break: break-all;
    font-size: 48px;
    font-weight: 600;
  }
}

.small {
  width: 100%;
  height: 180px;
}

.big {
  width: 100%;
  height: 300px;
}
</style>
