<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-background">
        <img src="/hero-background.jpg" alt="Hero Background" />
      </div>
      <div class="hero-content">
        <div class="title-wrapper">
          <span class="hero-title">BRINGING</span>
          <span class="hero-title">THE UNSEEN</span>
          <span class="hero-title">ON SCREEN</span>
        </div>
        <div class="description-wrapper">
          <div class="img-wrapper">
            <img src="/person.jpg" alt="Hero Background" />
          </div>
          <p>We’re a global media company
            that specializes in emerging markets. We find powerful stories from unique creators, and take them from
            development & financing to production & distribution.</p>
        </div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="base-bottom"></div>
    </section>
    <MovieSection />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'MEDIA - Movie Discovery Platform',
  meta: [
    { name: 'description', content: 'Discover and explore movies from around the world' }
  ]
})
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
}
</style>