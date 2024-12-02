<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <Modal />
      <Table :users="users" />
    </div>
  </div>
</template>

<script setup></script>
