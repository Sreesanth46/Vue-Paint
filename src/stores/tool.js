import { defineStore } from "pinia";

export const useToolStore = defineStore('ToolStore', {
    state: () => {
        return {
            selectedTool: 'none'
        }
    },

    getters: {},

    actions: {
        updateTool(tool) {
            if (this.selectedTool === tool) {
                this.selectedTool = 'none';
            } else {
                this.selectedTool = tool
            }
        }
    },
})