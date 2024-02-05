<template>
  <label class="custom-checkbox">
    <span class="label">{{ label }}</span>
    <input
      :id="id"
      class="checkbox"
      name="user-enabled"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="toggle($event)"
    />
    <div class="pseudo-checkbox">
      <slot>
        <span class="checkmark" />
      </slot>
    </div>
  </label>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:checked']);

const id = `checkbox-${Math.random().toString(36).substring(2, 9)}`;
const isChecked = ref(props.checked || false);

function toggle(event) {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
    emit('update:checked', isChecked.value);
  }
}
</script>
<style lang="scss" scoped>
.custom-checkbox {
  width: 100%;
  display: flex;
  position: relative;
  padding-left: 2rem; /* Adjust as needed for size */
  user-select: none;
}

.custom-checkbox input {
  opacity: 0;
  position: absolute;
  top: 13%;
  left: 0;
  height: 1.1rem; /* Adjust as needed for size */
  width: 1.1rem;
}

.pseudo-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  top: 18%;
  left: 0;
  height: 1.1rem; /* Adjust as needed for size */
  width: 1.1rem; /* Adjust as needed for size */
  border: 2px solid var(--vue-green-dark); /* Default border color */
  border-radius: 3px;
}
.checkmark {
  height: 0px;
  width: 0px;
  opacity: 0;
  border: 1px solid var(--vue-green-dark);
  border-right: 0;
  border-bottom: 0;
  margin-bottom: 3px;
  transform: rotate(-145deg);
  transition: all 0.2s ease-in-out;
}

.custom-checkbox:has(input:checked) .checkmark {
  height: 11px;
  width: 6px;
  opacity: 1;
  border: 3px solid var(--vue-green-dark);
  border-right: 0;
  border-bottom: 0;
  border-radius: 1px;
  /* Checked border color */
}

.label {
  font-weight: 500;
  letter-spacing: 1px;
}
</style>
