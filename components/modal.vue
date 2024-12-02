<script setup >
import { useStore } from "~/store/index";
const store = useStore();
</script>

<template>
  <div>
    <UModal v-model="store.isOpen">
      <div class="p-4">
        <h1>{{ store.selectedItem.phone.key }}</h1>
      </div>
    </UModal>
  </div>
</template>
