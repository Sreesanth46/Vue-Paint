<template>
    <div class="toolbar-container">
        <div class="tools-box">
            <div
                v-for="(data, index) in icons"
                :key="index"
                :title="data.title"
                @click="onClick(data)"
                class="tool"
                :style="{
                    backgroundColor: selectedTool == data.title ? 'grey' : '',
                }"
            >
                <Icon :icon="data.icon" />
            </div>
            <div class="tool" :style="{ backgroundColor: stroke.color }">
                <Icon icon="mdi:color" />
                <input
                    type="color"
                    :value="`white`"
                    @change="strokeColor"
                    class="tool"
                    style="position: absolute; opacity: 0"
                />
            </div>
        </div>
    </div>
</template>data

<script setup>
import { Icon } from "@iconify/vue";
import { useToolStore } from "../stores/tool";
import { useStrokeStore } from "../stores/stroke";
import { ref } from "vue";

const tool = useToolStore();
const { stroke } = useStrokeStore();
const strokeStore = useStrokeStore();
const selectedTool = ref("none");

const icons = [
    {
        icon: "mdi:vector-rectangle",
        title: "Rectangle",
    },
    {
        icon: "material-symbols:pen-size-2",
        title: "Straight Line",
    },
    {
        icon: "ri:quill-pen-line",
        title: "Free hand",
    },
    {
        icon: "ph:eraser-light",
        title: "Eraser",
    },
    {
        icon: "material-symbols:back-hand",
        title: "Hand Tool",
    },
    {
        icon: "carbon:zoom-area",
        title: "Zoom",
    },
    {
        icon: "material-symbols:insert-text",
        title: "Text",
    },
];

function onClick(button) {
    if (selectedTool.value == button.title) {
        selectedTool.value = "none";
    } else {
        selectedTool.value = button.title;
    }
    tool.updateTool(button.title);
}

function strokeColor(event) {
    strokeStore.updateStrokeColor(event.target.value);
}
</script>

<style scoped>
.toolbar-container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 80px;
    background: #d9d9d9;
}

.tools-box {
    position: absolute;
    top: 80px;
    width: inherit;
    min-height: 500px;
    display: grid;
    justify-items: center;
}

.tool {
    display: grid;
    place-items: center;
    font-size: xx-large;
    cursor: pointer;
    width: 60px;
    height: 60px;
    margin-top: 10px;
    border-radius: 8px;
    background: #d9d9d9;
    box-shadow: 7px 7px 14px #ababab, -7px -7px 14px #ffffff;
}

.active {
    background: red !important;
    color: red;
}
</style>