<template>
  <div>
    <header class="page-header fade-in-up">
      <h1>Movie Discovery</h1>
      <p>Explore popular movies and their details</p>
    </header>

    <div class="container">
      <div v-if="pending" class="loading">
        <div class="spinner"></div>
        <p>Loading movies...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>Failed to load movies. Please try again later.</p>
      </div>

      <div v-else class="movie-grid">
        <div
          v-for="(movie, index) in movies"
          :key="movie.imdbID"
          class="card scroll-animate"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="navigateToDetail(movie.imdbID)"
        >
          <img
            :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
            :alt="movie.Title"
          />
          <div class="card-content">
            <h3>{{ movie.Title }}</h3>
            <p>{{ movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) }}</p>
            <span class="year">{{ movie.Year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const router = useRouter()

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

const { data, pending, error } = await useFetch<{ Search: Movie[] }>(
  `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=marvel&type=movie`,
  {
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
</style>