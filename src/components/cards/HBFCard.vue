<template>
  <div class="card-content">
    <slot name="header"> </slot>
    <div class="body">
      <slot name="body" v-bind="listItems">
        <div v-for="(item, key) in listItems" :key="key">
          {{ item }}
        </div>
      </slot>
    </div>
    <div class="footer-section">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listItems: {
    type: [Array, Object],
    required: true
  },
  heading: {
    type: String,
    default: ''
  },
  subHeading: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['create-agent']);
</script>

<style lang="scss" scoped>
.card-content {
  width: 100%;
  height: 100%;
}
.body {
  width: 100%;
}
</style>
