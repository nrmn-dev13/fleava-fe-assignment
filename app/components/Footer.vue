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

      <div class="footer-section">
        <h4>Connect</h4>
        <div class="social-links">
          <slot name="social">
            <p class="text-sm">Powered by OMDb API</p>
          </slot>
        </div>
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

<style scoped lang="scss">
.page-footer {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: #e2e8f0;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-section {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      color: #fff;
    }

    h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: #cbd5e0;
    }

    p {
      margin: 0;
      line-height: 1.6;
      color: #a0aec0;
    }

    .text-sm {
      font-size: 0.875rem;
    }
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    a {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #667eea;
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
    text-align: center;

    p {
      margin: 0;
      color: #718096;
      font-size: 0.875rem;
    }
  }
}

@media (max-width: 768px) {
  .page-footer {
    padding: 2rem 1.5rem 1rem;

    .footer-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
}
</style>
