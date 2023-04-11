import { defineStore } from "pinia";

export const useStrokeStore = defineStore('StrokeStore', {
    state: () => {
        return {
            stroke: {
                width: 4,
                color: '#FF0000',
                opacity: 1
            }
        }
    },

    getters: {},

    actions: {
        updateStrokeColor(color) {
            this.stroke.color = color;
        },

        updateStrokeWidth(width) {
            this.stroke.width = width;
        },

        updateStrokeOpacity(opacity) {
            this.stroke.opacity = opacity;
        }
    },
})