<template>
  <div>
    <span v-if="label?.length > 0" class="input-label">{{ label }}</span>
    <span v-if="required" class="required">*</span>
    <div class="input-box" :style="styles">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="text-input"
        @input="updateValue($event)"
        @keydown="emitKeyValue && emitKeyPress($event)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  emitKeyValue: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  invalid: {
    type: Boolean,
    default: false
  },
  styles: {
    type: [String, Object],
    default: {}
  }
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  const { value, data } = event.target;
  emit('update:modelValue', value);
}
function emitKeyPress(event) {
  console.log(event);
  emit('keydown', event.target.value);
}
</script>

<style lang="scss" scoped>
.input-box {
  max-height: inherit;
  border: 1px solid #555;
  border-radius: 7px;
  display: flex;
  padding: 0.4rem;
  align-items: center;
  transition: 0.75s;
  &:focus-within {
    border-color: var(--vue-green-darker);
  }
}

.input-label {
  font-size: small;
  font-weight: 600;
  letter-spacing: 1px;
  padding-left: 0.2rem;
}

.text-input {
  background-color: transparent !important;
  width: 100%;
  border: none;
  height: 100%;
  color: #aaa;
  outline: none;
  &:focus::placeholder {
    opacity: 0;
  }
}

.required {
  color: #ff5050;
}
</style>
