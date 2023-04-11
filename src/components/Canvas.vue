<template>
    <div class="canvas-container" id="canvas-container">
        <canvas ref="refCanvas"></canvas>
    </div>
</template>

<script setup>
import { fabric } from "fabric";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToolStore } from "../stores/tool";
import { useStrokeStore } from "../stores/stroke";
const { selectedTool } = storeToRefs(useToolStore());
const { stroke } = useStrokeStore();

const refCanvas = ref(null);
let canvas;
let rect,
    drawStraightLine = false,
    isDown = false,
    isMoving = false,
    straightLine = null,
    isModifying = false,
    inputText,
    textEditing = false,
    origX = 0,
    origY = 0,
    zoomX = 0,
    zoomY = 0;

onMounted(() => {
    const divElement = document.getElementById("canvas-container");
    canvas = new fabric.Canvas(refCanvas.value, {
        height: divElement.clientHeight,
        width: divElement.clientWidth,
        isDrawingMode: false,
        hoverCursor: "grab",
        moveCursor: "grabbing",
    });
});
</script>

<style scoped>
.canvas-container {
    position: absolute;
    top: 0;
    left: 80px;
    height: 100vh;
    width: calc(100% - 80px);
}
</style>