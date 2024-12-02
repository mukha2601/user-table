<template>
  <div class="p-4">
    <!-- Foydalanuvchi ismi bo‘yicha filtr -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name..."
        class="border px-4 py-2 rounded w-full"
      />
    </div>

    <!-- Jadval -->
    <table class="w-full divide-y divide-gray-200 overflow-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Phone
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Website
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Company
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Address
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="user in paginatedUsers"
          :key="user?.id"
          class="hover:bg-gray-300 cursor-pointer"
          @click="store.openModal(user)"
        >
          <td class="px-6 py-4 text-sm text-gray-500">{{ user?.id }}</td>
          <td class="px-6 py-4 text-sm text-gray-900">{{ user?.name }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ user?.email }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ user?.phone }}</td>
          <td class="px-6 py-4 text-sm text-blue-500">
            <a :href="`http://${user?.website}`" target="_blank">{{
              user?.website
            }}</a>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">
            {{ user?.company.name }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">
            {{ user?.address.street }}, {{ user?.address.suite }},
            {{ user?.address.city }}, {{ user?.address.zipcode }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Sahifalash -->
    <div class="flex justify-center mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-l"
      >
        Previous
      </button>
      <span class="px-4 py-2 bg-gray-100 text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-r"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { getUsers } from "@/services/userService";
import { useStore } from "~/store/index";
const store = useStore();

const users = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await getUsers();
    console.log(users.value);
  } catch (err) {
    error.value = "Foydalanuvchilarni yuklashda xatolik yuz berdi";
  } finally {
    isLoading.value = false;
  }
});

// Foydalanuvchi ismi bo‘yicha qidiruv
const searchQuery = ref("");

// Joriy sahifa va sahifalash uchun parametrlar
const currentPage = ref(1);
const itemsPerPage = 5;

// Filtrlangan foydalanuvchilar ro‘yxati
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value;
  }
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Umumiy sahifalar soni
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

// Sahifalangan foydalanuvchilar
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

// Sahifani o‘zgartirish funksiyalari
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
