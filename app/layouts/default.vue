<template>
  <div class="app-layout">
    <Header />

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
