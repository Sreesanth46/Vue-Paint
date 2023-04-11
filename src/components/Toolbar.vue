<template>
    <div class="toolbar-container">
        <div class="tools-box">
            <div
                class="tool"
                v-for="(data, index) in icons"
                :key="index"
                :title="data.title"
                @click="onClick(data)"
            >
                <Icon :icon="data.icon" />
            </div>
            <div class="tool">
                <Icon icon="mdi:color" />
                <input type="color" :value="`white`" @change="strokeColor" />
            </div>
        </div>
    </div>
</template>data

<script setup>
import { Icon } from "@iconify/vue";
import { useToolStore } from "../stores/tool";
import { useStrokeStore } from "../stores/stroke";

const tool = useToolStore();
const stroke = useStrokeStore();

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
    tool.updateTool(button.title);
}

function strokeColor(event) {
    stroke.updateStrokeColor(event.target.value);
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
    /* background: rgb(168, 168, 252); */
    position: absolute;
    top: 80px;
    width: inherit;
    min-height: 500px;
    display: grid;
    justify-items: center;
}

.tool {
    width: 60px;
    height: 60px;
    margin-top: 10px;
    border-radius: 8px;
    background: #d9d9d9;
    box-shadow: 7px 7px 14px #ababab, -7px -7px 14px #ffffff;
}
</style>