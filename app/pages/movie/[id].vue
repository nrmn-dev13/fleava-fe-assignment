<template>
  <div class="movie-detail-page">
    <section class="hero">
      <div class="hero-background">
        <img src="/hero-background.jpg" alt="Hero Background" />
      </div>
      <div class="hero-content">
        <div class="title-wrapper" v-if="movie">
          <span class="hero-title">{{ movie.Title }}</span>
        </div>
        <div class="description-wrapper" v-if="movie">
          <div class="img-wrapper">
            <NuxtImg :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'"
              :alt="movie.Title" quality="95" fit="cover" format="webp" />
          </div>
          <p class="plot-preview">{{ movie.Plot }}</p>
        </div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="base-bottom"></div>
    </section>
    <section class="detail-section">
      <div class="container">
        <NuxtLink to="/" class="back-button fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Movies
        </NuxtLink>

        <div v-if="pending" class="loading">
          <div class="spinner"></div>
          <p>Loading movie details...</p>
        </div>

        <div v-else-if="error" class="error">
          <p>Failed to load movie details. Please try again.</p>
        </div>

        <div v-else-if="movie" class="detail-content">
          <div class="detail-card scroll-animate">
            <div class="detail-card-image-wrapper">
              <NuxtImg :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'"
                :alt="movie.Title" quality="95" fit="cover" format="webp" />
            </div>
            <div class="detail-info">
              <h1>{{ movie.Title }}</h1>

              <div class="info-row">
                <strong>Year:</strong> {{ movie.Year }}
              </div>

              <div class="info-row">
                <strong>Rated:</strong> {{ movie.Rated }}
              </div>

              <div class="info-row">
                <strong>Runtime:</strong> {{ movie.Runtime }}
              </div>

              <div class="info-row">
                <strong>Genre:</strong> {{ movie.Genre }}
              </div>

              <div class="info-row">
                <strong>Director:</strong> {{ movie.Director }}
              </div>

              <div class="info-row">
                <strong>Actors:</strong> {{ movie.Actors }}
              </div>

              <div class="info-row" v-if="movie.imdbRating">
                <strong>IMDB Rating:</strong> {{ movie.imdbRating }}/10
              </div>

              <div class="plot">
                <strong>Plot:</strong><br />
                <p class="plot-text">{{ movie.Plot }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const config = useRuntimeConfig()
const route = useRoute()

interface MovieDetail {
  imdbID: string
  Title: string
  Year: string
  Rated: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
}

const { data: movie, pending, error } = await useFetch<MovieDetail>(
  `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&i=${route.params.id}&plot=full`,
  {
    transform: (response) => response
  }
)

onMounted(() => {
  // Hero section animations
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  })

  // Animate hero background
  tl.from('.hero-background', {
    scale: 1.2,
    opacity: 0,
    duration: 1.2
  })

  // Animate title
  tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 0.8
  }, '-=0.6')

  // Animate description wrapper (image + plot)
  tl.from('.description-wrapper', {
    y: 60,
    opacity: 0,
    duration: 0.8
  }, '-=0.4')

  // Animate poster image
  tl.from('.description-wrapper .img-wrapper', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')

  // Animate back button
  gsap.from('.back-button', {
    x: -30,
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
    ease: 'power2.out'
  })

  // Wait for DOM to be ready and data to load
  nextTick(() => {
    setTimeout(() => {
      const detailCard = document.querySelector('.detail-card')

      if (detailCard) {
        // Set initial visibility to ensure elements are visible
        gsap.set('.detail-card', { clearProps: 'all' })
        gsap.set('.detail-card-image-wrapper', { clearProps: 'all' })
        gsap.set('.detail-info h1', { clearProps: 'all' })
        gsap.set('.info-row', { clearProps: 'all' })
        gsap.set('.plot', { clearProps: 'all' })

        // Detail card animation with ScrollTrigger
        gsap.fromTo('.detail-card',
          {
            y: 80,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.detail-card',
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          }
        )

        // Animate detail card image
        gsap.fromTo('.detail-card-image-wrapper',
          {
            scale: 0.9,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.detail-card-image-wrapper',
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          }
        )

        // Animate detail info title
        gsap.fromTo('.detail-info h1',
          {
            y: 30,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.detail-info',
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          }
        )

        // Animate info rows with stagger
        gsap.fromTo('.info-row',
          {
            x: -20,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.detail-info',
              start: 'top 70%',
              toggleActions: 'play none none none',
              once: true
            },
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
          }
        )

        // Animate plot section
        gsap.fromTo('.plot',
          {
            y: 30,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.plot',
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          }
        )
      }
    }, 200)
  })
})

useHead({
  title: movie.value ? `${movie.value.Title} - Movie Discovery` : 'Movie Details'
})
</script>

<style scoped lang="scss">
// Removed conflicting CSS animations - using GSAP only
</style>
