<template>
  <div :class="['popin-container', isPoppedIn && 'popped-in']">
    <div class="popin-icon"></div>
    <div class="popin-text">
      <span>{{ messageText }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const isPoppedIn = ref(false);
const messageText = ref('');

function togglePopIn(message) {
  isPoppedIn.value = true;
  messageText.value = message;
  setTimeout(() => {
    isPoppedIn.value = false;
  }, 3500);
}

defineExpose({ togglePopIn });
</script>

<style lang="scss" scoped>
.popin-container {
  position: absolute;
  text-align: center;
  left: 101%;
  top: 7%;
  font-weight: 600;
  border-radius: 10px;
  min-width: 225px;
  max-width: 225px;
  opacity: 0%;
  transition: all 1s ease-in-out;
  background-color: var(--vue-green-dark);
  &.popped-in {
    opacity: 100%;
    left: 87%;
    max-width: 225px;
    min-width: 225px;
  }
  .popin-text {
    margin: 0.5rem;
  }
}
</style>
