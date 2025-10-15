<template>
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

    <div v-else-if="movie" class="detail-container">
      <div class="detail-card scroll-animate">
        <NuxtImg
          :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'"
          :alt="movie.Title"
          quality="95"
          fit="cover"
          format="webp"
        />
        <div class="detail-content">
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
            {{ movie.Plot }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
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

useHead({
  title: movie.value ? `${movie.value.Title} - Movie Discovery` : 'Movie Details'
})
</script>

<style scoped lang="scss">

.detail-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
