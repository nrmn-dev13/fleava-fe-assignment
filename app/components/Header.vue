<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <div class="logo">
        <span class="logo-text">MEDIA</span>
      </div>

      <nav class="nav-menu" :class="{ active: menuOpen }">
        <ul class="nav-list">
          <li class="nav-item"><NuxtLink to="/" class="nav-link">Home</NuxtLink></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Program</a></li>
          <li class="nav-item"><a href="#" class="nav-link">What's On</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
        </ul>
      </nav>

      <button class="hamburger" :class="{ active: menuOpen }" @click="toggleMenu" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
