<template>
  <header class="page-header fade-in-up">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Movie Discovery',
  description: 'Explore popular movies and their details'
})
</script>

<style scoped lang="scss">
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.25rem;
    margin: 0;
    opacity: 0.95;
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 3rem 1.5rem;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
}
</style>
