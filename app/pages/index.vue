<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-background">
        <img src="~/assets/img/hero-background.jpg" alt="Hero Background" />
      </div>
      <div class="hero-content">
        <div class="title-wrapper">
          <span class="hero-title">BRINGING</span>
          <span class="hero-title">THE UNSEEN</span>
          <span class="hero-title">ON SCREEN</span>
        </div>
        <div class="description-wrapper">
          <div class="img-wrapper">
            <img src="~/assets/img/person.jpg" alt="Hero Background" />
          </div>
          <p>We’re a global media company
            that specializes in emerging markets. We find powerful stories from unique creators, and take them from
            development & financing to production & distribution.</p>
        </div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="base-bottom"></div>
    </section>
    <div class="container">
      <section>
        <div v-if="pending" class="loading">
          <div class="spinner"></div>
          <p>Loading movies...</p>
        </div>

        <div v-else-if="error" class="error">
          <p>Failed to load movies. Please try again later.</p>
        </div>

        <div v-else class="movie-slider">
          <Swiper
            :modules="[SwiperNavigation]"
            :slides-per-view="1"
            :space-between="20"
            :navigation="true"
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
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }"
          >
            <SwiperSlide v-for="(movie, index) in movies" :key="movie.imdbID">
              <div class="card scroll-animate"
                :style="{ animationDelay: `${index * 0.1}s` }" @click="navigateToDetail(movie.imdbID)">
                <NuxtImg :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
                  :alt="movie.Title" loading="lazy" quality="90" fit="cover" format="webp" @error="handleImageError" />
                <div class="card-content">
                  <h3>{{ movie.Title }}</h3>
                  <p>{{ movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) }}</p>
                  <span class="year">{{ movie.Year }}</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

const config = useRuntimeConfig()
const router = useRouter()
const SwiperNavigation = Navigation

interface Movie {
  imdbID: string
  Title: string
  Year: string
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

<style scoped lang="scss">
.home-page {
  width: 100%;
}
</style>