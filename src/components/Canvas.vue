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
import { useBackgroundStore } from "../stores/background";
const { selectedTool } = storeToRefs(useToolStore());
const { stroke } = useStrokeStore();
const { background } = useBackgroundStore();

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

    canvas.on("mouse:down", (event) => mouseDown(event));
    canvas.on("mouse:move", (event) => mouseMove(event));
    canvas.on("mouse:up", () => mouseUp());
    canvas.on("mouse:over", () => mouseOver());
    canvas.on("before:transform", () => objectModified());
    canvas.on("before:selection:cleared", () => selectionCleared());
    canvas.on("mouse:wheel", (event) => mouseWheel(event));
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Delete") {
        let activeObject = canvas.getActiveObject();
        canvas.remove(activeObject);
    }
});

function mouseDown(event) {
    if (isModifying) return;
    canvas.selection = true;
    isDown = true;
    let pointer = canvas.getPointer(event.e);

    switch (selectedTool.value) {
        case "Free hand":
            freeHand();
            break;

        case "Straight Line":
            canvas.isDrawingMode = false;
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];

            straightLine = new fabric.Line(points, {
                strokeWidth: stroke.width,
                stroke: stroke.color,
                opacity: stroke.opacity,
                fill: null,
                originX: "center",
                originY: "center",
                strokeUniform: true,
            });
            canvas.add(straightLine);

            break;

        case "Rectangle":
            origX = pointer.x;
            origY = pointer.y;
            rect = new fabric.Rect({
                left: origX,
                top: origY,
                width: pointer.x - origX,
                height: pointer.y - origY,
                fill: null,
                strokeUniform: true,
                stroke: stroke.color,
                strokeWidth: stroke.width,
                opacity: stroke.opacity,
            });
            canvas.add(rect);
            break;

        case "Text":
            addText(0, pointer);
            break;

        case "Zoom":
            canvas.zoomToPoint({ x: zoomX, y: zoomY }, 1);
            break;

        default:
            canvas.isDrawingMode = false;
            break;
    }
}

function mouseMove(event) {
    if (!isDown) return;
    isMoving = true;
    let pointer = canvas.getPointer(event.e);

    switch (selectedTool.value) {
        case "Straight Line":
            straightLine.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
            break;

        case "Rectangle":
            if (origX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(origX - pointer.x) });
            rect.set({ height: Math.abs(origY - pointer.y) });
            break;

        default:
            break;
    }
}

function mouseUp() {
    switch (selectedTool.value) {
        case "Rectangle":
        case "Straight Line":
        case "Free hand":
            break;

        case "Eraser":
            let activeObject = canvas.getActiveObject();
            canvas.remove(activeObject);
            break;

        default:
            break;
    }

    isMoving = false;
    isDown = false;
}

function mouseOver() {
    if (selectedTool == "Free hand") {
        freeHand();
    } else {
        canvas.isDrawingMode = false;
    }
}

function objectModified() {
    isModifying = true;
    isDown = false;
    canvas.isDrawingMode = false;
}

function mouseWheel(event) {
    if (selectedTool == "Zoom") {
        let delta = event.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 10) zoom = 10;
        if (zoom < 0.45) zoom = 0.45;

        zoomX = event.e.offsetX;
        zoomY = event.e.offsetY;

        canvas.zoomToPoint({ x: zoomX, y: zoomY }, zoom);
        event.e.preventDefault();
        event.e.stopPropagation();
    }
}

function selectionCleared() {
    isModifying = false;
}

function freeHand() {
    let opacityHex = Math.floor(255 * stroke.opacity).toString(16);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = `${stroke.color}${opacityHex}`;
    canvas.freeDrawingBrush.width = stroke.width;
}

function addText(angle, pointer) {
    inputText = new fabric.Textbox("Text", {
        padding: 2,
        left: pointer.x,
        top: pointer.y,
        fill: stroke.color,
        opacity: stroke.opacity,
        angle,
    });
    canvas.setActiveObject(inputText);
    inputText.selectAll();
    canvas.add(inputText);
}
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