<template>
    <div class="toolbar-container">
        <div class="tools-box">
            <div class="tool" v-for="(data, index) in icons" :key="index">
                <span class="icons">
                    <Icon :icon="data.icon" />
                </span>
            </div>
        </div>
    </div>
</template>data

<script>
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },

    data() {
        return {
            icons: [
                {
                    icon: "mdi:vector-rectangle",
                    title: "Rectangle",
                    visible: 1,
                },
                {
                    icon: "material-symbols:pen-size-2",
                    title: "Straight Line",
                    visible: 1,
                },
                {
                    icon: "ri:quill-pen-line",
                    title: "Free hand",
                    visible: 1,
                },
                {
                    icon: "ph:eraser-light",
                    title: "Eraser",
                    visible: 1,
                },
                {
                    icon: "material-symbols:back-hand",
                    title: "Hand Tool",
                    visible: 0,
                },
                {
                    icon: "carbon:zoom-area",
                    title: "Zoom",
                    visible: 0,
                },
            ],
        };
    },
};
</script>

<style scoped>
.toolbar-container {
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