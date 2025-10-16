<template>
  <section class="movie-section">
    <div class="title-wrapper">
        <span class="title">NOW ON SCREEN</span>
      </div>
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Loading movies...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Failed to load movies. Please try again later.</p>
    </div>

    <div v-else class="movie-slider">
      <!-- Custom Navigation Buttons -->
      <div class="swiper-button-prev-custom" :class="{ 'swiper-button-hidden': isPrevDisabled }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <div class="swiper-button-next-custom" :class="{ 'swiper-button-hidden': isNextDisabled }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <Swiper
        :modules="[SwiperNavigation]"
        :slides-per-view="1"
        :space-between="20"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        :breakpoints="{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(movie, index) in movies" :key="movie.imdbID">
          <div class="card scroll-animate"
            :style="{ animationDelay: `${index * 0.1}s` }" @click="navigateToDetail(movie.imdbID)">
            <div class="image-wrapper">
              <NuxtImg :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
                :alt="movie.Title" loading="lazy" quality="90" fit="cover" format="webp" @error="handleImageError" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const config = useRuntimeConfig()
const router = useRouter()
const SwiperNavigation = Navigation

interface Movie {
  imdbID: string
  Title: string
  Type: string
  Poster: string
}

const { data, pending, error } = await useFetch<{ Search: Movie[] }>(
  `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=movie&type=movie`,
  {
    key: 'all-movies', // Static key for proper caching
    transform: (response) => response
  }
)

const movies = computed(() => {
  if (data.value?.Search) {
    return data.value.Search.slice(0, 10)
  }
  return []
})

// Navigation state
const isPrevDisabled = ref(true)
const isNextDisabled = ref(false)
let swiperInstance: SwiperType | null = null

const onSwiper = (swiper: SwiperType) => {
  swiperInstance = swiper
  updateNavigationState(swiper)
}

const onSlideChange = (swiper: SwiperType) => {
  updateNavigationState(swiper)
}

const updateNavigationState = (swiper: SwiperType) => {
  isPrevDisabled.value = swiper.isBeginning
  isNextDisabled.value = swiper.isEnd
}

const navigateToDetail = (imdbID: string) => {
  router.push(`/movie/${imdbID}`)
}

const handleImageError = (event: any) => {
  if (event?.target) {
    const target = event.target as HTMLImageElement
    target.src = 'https://via.placeholder.com/300x450?text=No+Image'
  }
}

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll('.scroll-animate')
  animatedElements.forEach((el) => observer.observe(el))
})
</script>
