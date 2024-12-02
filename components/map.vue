<template>
    <div id="map" style="height: 500px; width: 100%" class="z-0"></div>
  </template>
  
  <script setup>
  const { $leaflet } = useNuxtApp();
  
  // Props aniqlash
  const props = defineProps({
    address: Object, // Props sifatida ma'lumotni qabul qilamiz
  });
  
  // Reactive xarita holati
  const map = ref(null);
  
  // Lat va Lng qiymatlarini address propsdan olish
  const lat = props.address?.lat || 0;
  const lng = props.address?.lng || 0;
  
  onMounted(() => {
    const L = $leaflet;
  
    // Xarita yaratish
    map.value = L.map("map").setView([lat, lng], 16);
  
    // Tile layer ulash
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map.value);
  
    // Maxsus marker ikonkasi yaratish
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  
    // Marker qo'shish
    L.marker([lat, lng], {
      icon: customIcon,
    })
      .addTo(map.value)
      .bindPopup("Manzil")
      .openPopup();
  });
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 500px;
  }
  </style>
  