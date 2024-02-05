<template>
  <label for="user-enabled">
    <span>{{ label }}</span>
    <input
      class="hidden"
      name="user-enabled"
      type="checkbox"
      checked
      @input="test($event)"
      @change="test($event)"
    />
  </label>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    required: true
  }
});

function test(event) {
  console.log(event);
}
</script>
<style>
label {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
}
</style>
