<template>
  <div class="page">
    <main id="content">
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
</style>
