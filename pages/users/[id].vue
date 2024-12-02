<script setup>
import { useStore } from "~/store/index";
import { useRoute, useRouter } from "vue-router"; // useRoute orqali URL parametrlarini olish
import { onMounted, ref } from "vue";

const store = useStore();
const route = useRoute(); // URL parametrlarini olish
const { $leaflet } = useNuxtApp();

const map = ref(null); // mapni reaktiv holatda saqlash

// Sahifa yuklanganda user ma'lumotlarini olish
onMounted(() => {
  // URL parametridan id ni olish
  const userId = route.params.id;

  // userId bo'yicha ma'lumotni store'dan olish (agar mavjud bo'lsa)
  const selectedItem = store.selectedItem;

  // Agar selectedItem mavjud bo'lsa, xaritani yaratish
  if (selectedItem && selectedItem.id === userId) {
    const lat = selectedItem?.address?.geo?.lat;
    const lng = selectedItem?.address?.geo?.lng;

    console.log(selectedItem);

    if (lat && lng) {
      // Xarita yaratish
      map.value = $leaflet.map("map").setView([lat, lng], 16);

      // Tile layer ulash
      $leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        })
        .addTo(map.value);

      // Maxsus marker ikonkasi yaratish
      const customIcon = $leaflet.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Marker qo'shish
      $leaflet
        .marker([lat, lng], {
          icon: customIcon,
        })
        .addTo(map.value)
        .bindPopup("Manzil")
        .openPopup();
    } else {
      console.error("Latitude yoki Longitude ma'lumotlari mavjud emas.");
    }
  } else {
    console.error("User ma'lumotlari topilmadi yoki ID mos kelmaydi.");
  }
});
</script>

<template>
  <div>
    <div class="p-4">
      <p>
        <span class="font-extralight text-gray-300">Name: </span>
        {{ store.selectedItem.name }}
      </p>
      <p>
        <span class="font-extralight text-gray-300">Email: </span>
        {{ store.selectedItem.email }}
      </p>
      <p>
        <span class="font-extralight text-gray-300">Phone: </span>
        {{ store.selectedItem.phone }}
      </p>
      <p>
        <span class="font-extralight text-gray-300">Website: </span>
        <a :href="`http://${store.selectedItem.website}`" target="_blank">
          {{ store.selectedItem.website }}
        </a>
      </p>
      <p>
        <span class="font-extralight text-gray-300">Company: </span>
        {{ store.selectedItem.company.name }}
      </p>

      <div id="map" style="height: 500px; width: 100%" class="z-0"></div>
    </div>
  </div>
</template>
