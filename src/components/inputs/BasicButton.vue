<template>
  <div class="btn-box" @click="emitClick()">
    <div class="btn-content">
      <button />
      <slot>
        <div class="label">{{ label }}</div>
      </slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '1rem'
  }
});

const emit = defineEmits(['click']);

function emitClick() {
  emit('click');
}
</script>
<style lang="scss" scoped>
.btn-box {
  display: flex;
  color: #888;
  transition: scale 0.15s ease-in-out;
  padding: 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    color: #aaa;
    transform: scale(1.015);
  }
}
.btn-content {
  text-align: center;
  width: 100%;
  display: flex;
  button {
    position: absolute;
    visibility: hidden;
  }
  .label {
    margin: auto;
  }
}
</style>
