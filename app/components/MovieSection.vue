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
      <div class="swiper-button-prev-custom" :class="{ 'swiper-button-hidden': isPrevDisabled }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15205F"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <div class="swiper-button-next-custom" :class="{ 'swiper-button-hidden': isNextDisabled }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15205F"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <Swiper :modules="[SwiperNavigation]" :slides-per-view="1" :space-between="20" :navigation="{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }" :breakpoints="{
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
        }" @swiper="onSwiper" @slide-change="onSlideChange">
        <SwiperSlide v-for="(movie, index) in movies" :key="movie.imdbID">
          <div class="card movie-card" @click="navigateToDetail(movie.imdbID)">
            <div class="image-wrapper">
              <NuxtImg
                :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    key: 'all-movies',
    transform: (response) => response
  }
)

const movies = computed(() => {
  if (data.value?.Search) {
    return data.value.Search.slice(0, 10)
  }
  return []
})

const isPrevDisabled = ref(true)
const isNextDisabled = ref(false)

const onSwiper = (swiper: SwiperType) => {
  updateNavigationState(swiper)
  nextTick(() => {
    initGsapAnimations()
  })
}

const onSlideChange = (swiper: SwiperType) => {
  updateNavigationState(swiper)
  nextTick(() => {
    animateVisibleCards()
  })
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

const initGsapAnimations = () => {
  const cards = document.querySelectorAll('.movie-card')

  cards.forEach((card, index) => {
    gsap.set(card, {
      y: 100,
      opacity: 0
    })
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        end: 'top center',
        toggleActions: 'play none none reverse'
      },
      onComplete: () => {
        card.setAttribute('data-animated', 'true')
      }
    })
  })
}

const animateVisibleCards = () => {
  const cards = document.querySelectorAll('.movie-card')
  let visibleCardIndex = 0

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const isVisible = rect.left >= 0 && rect.right <= window.innerWidth

    const hasAnimated = card.getAttribute('data-animated') === 'true'

    if (isVisible && !hasAnimated) {
      card.setAttribute('data-animated', 'true')

      gsap.fromTo(card,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: visibleCardIndex * 0.1,
          ease: 'power3.out'
        }
      )
      visibleCardIndex++
    } else if (isVisible && hasAnimated) {
      gsap.set(card, { y: 0, opacity: 1 })
    }
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    const titleWrapper = document.querySelector('.movie-section .title-wrapper')
    if (titleWrapper) {
      gsap.fromTo('.movie-section .title-wrapper',
        {
          y: 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: '.movie-section .title-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      )

      gsap.fromTo('.movie-section .title',
        {
          y: 30,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: '.movie-section .title-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out'
        }
      )
    }

    initGsapAnimations()
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>
