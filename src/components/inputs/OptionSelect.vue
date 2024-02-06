<template>
  <div ref="selectContainer" class="root-container">
    <span class="label">{{ label }}</span>
    <div class="select-box">
      <Transition>
        <span :key="modelValue?.label" class="select-value">{{ modelValue?.label }}</span>
      </Transition>
      <div :class="['arrow', optionsOpen ? 'up' : 'down']" />
    </div>
    <div :class="['options-container', optionsOpen && 'open']">
      <ul class="options">
        <li
          v-for="(option, key) in options"
          :key="key"
          :class="[option.label === modelValue?.label && 'selected']"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { watchOptionSelect } from '../../utils/composables/optionSelectWatcher';
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [String, Object],
    required: true
  },
  options: {
    type: [Array, Object],
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const selectContainer = ref(null);
const { optionsOpen } = watchOptionSelect(selectContainer);

function selectOption(option) {
  // option.selected = multi option support
  emit('update:modelValue', option);
}
</script>

<style lang="scss" scoped>
.root-container {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
}
.select-box {
  display: flex;
  width: 100%;
  padding-bottom: 3px;
  padding-left: 0.25rem;
  padding-right: 0.6rem;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
}

.options-container {
  display: flex;
  position: absolute;
  max-height: 0;
  width: 100%;
  top: 100%;
  z-index: 99;
  background-color: #111111;
  border-bottom: 1px solid hsla(160, 100%, 37%, 1);
  cursor: pointer;
  transition: max-height 0.4s ease-in-out;
  &.open {
    max-height: 8rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .options {
      &:hover {
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
}

.options {
  width: 100%;
  font-size: small;
  list-style-type: none;
  max-height: none;
  overflow-y: hidden;
  scrollbar-width: none;
  padding: 0.25rem 0.25rem;
  .selected {
    color: hsla(160, 100%, 37%, 1);
  }
  li {
    margin: 0.2rem 0;
    padding: 0 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      font-weight: 700;
    }
  }
}
.arrow {
  width: 8px;
  height: 8px;
  border: solid hsla(160, 100%, 37%, 1);
  border-width: 0 2px 2px 0;
  transition: 0.4s;
  margin-left: auto;
  &.down {
    margin-bottom: 0.2rem;
    transform: rotate(45deg);
  }
  &.up {
    margin-top: 0.2rem;
    transform: rotate(225deg);
  }
}

.label {
  font-size: x-small;
  font-weight: 600;
  padding-left: 0.25rem;
  letter-spacing: 1px;
}
.select-value {
  display: flex;
  align-items: center;
  font-size: medium;
  font-weight: 700;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 20px;
  max-height: 20px;
  max-width: 85%;
  color: #d0d0d0e7;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0;
}
</style>
