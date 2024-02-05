<template>
  <div class="page-body">
    <slot />
  </div>
</template>
<script setup></script>
<style>
.page-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
