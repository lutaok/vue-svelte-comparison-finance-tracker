<script lang="ts" setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSideBar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div
    :class="`flex flex-col gap-4 border-r-2 border-slate-300 bg-slate-700 text-white transition-[min-width] duration-200 ${isSidebarOpen ? 'min-w-80' : 'min-w-20'}`"
  >
    <button @click="toggleSideBar">
      {{ isSidebarOpen ? "Close Icon" : "Open Icon" }}
    </button>
  </div>
</template>
