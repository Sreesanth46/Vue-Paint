import { defineStore } from "pinia";

export const useBackgroundStore = defineStore('BackgroundStore', {
    state: () => {
        return {
            backgroundColor: '#fff'
        }
    },

    getters: {},

    actions: {
        updateBackground(color) {
            this.backgroundColor = color
        }
    },
})