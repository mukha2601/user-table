<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <Table :users="users" />
    </div>
  </div>
</template>

<script setup>
import { getUsers } from "@/services/userService";

const users = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await getUsers(); // APIdan ma'lumotni olib kelamiz
    console.log(users.value);
    
  } catch (err) {
    error.value = "Foydalanuvchilarni yuklashda xatolik yuz berdi";
  } finally {
    isLoading.value = false;
  }
});
</script>
