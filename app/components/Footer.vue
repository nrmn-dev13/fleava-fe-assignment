<template>
  <footer class="page-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>

      <div class="footer-section">
        <h4>Quick Links</h4>
        <nav class="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Program</a>
          <a href="#">What's On</a>
          <a href="#">Contact</a>
        </nav>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} {{ copyrightText }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  copyrightText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'MEDIA',
  description: 'Your go-to platform for exploring movies',
  copyrightText: 'MEDIA'
})

const currentYear = new Date().getFullYear()
</script>

