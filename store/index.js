import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isOpen: false,
      selectedItem: [],
    };
  },

  actions: {
    openModal(data) {
      this.isOpen = true;
      this.selectedItem = data;
    },
    closeModal() {
      this.isOpen = false;
      this.selectedItem = [];
    },
  },
});
