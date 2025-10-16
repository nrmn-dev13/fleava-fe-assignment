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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useHead({
  title: 'MEDIA - Movie Discovery Platform',
  meta: [
    { name: 'description', content: 'Discover and explore movies from around the world' }
  ]
})

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  })

  tl.from('.hero-background', {
    scale: 1.2,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out'
  })

  tl.from('.gradient-overlay', {
    opacity: 0,
    duration: 0.8
  }, '-=0.8')

  tl.from('.description-wrapper', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.3')

  tl.from('.description-wrapper .img-wrapper', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.2)'
  }, '-=0.5')

  tl.from('.description-wrapper p', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')

  tl.from('.base-bottom', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')

  nextTick(() => {
    setTimeout(() => {
      if (document.querySelector('.title-wrapper')) {
        gsap.fromTo('.title-wrapper',
          {
            y: 80,
            opacity: 0,
            scale: 0.95
          },
          {
            scrollTrigger: {
              trigger: '.title-wrapper',
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
          }
        )

        gsap.fromTo('.hero-title',
          {
            y: 100,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.title-wrapper',
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          }
        )
      }
    }, 100)
  })
})
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
}
</style>