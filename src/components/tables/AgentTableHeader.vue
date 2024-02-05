<template>
  <div class="header-box">
    <div class="header-label">{{ heading }}</div>
    <div>
      <AddAgentIcon class="add-agent-icon" @click="createNewAgent()" />
    </div>
  </div>
</template>
<script setup>
import AddAgentIcon from '@/components/icons/AddAgentIcon.vue';

const props = defineProps({
  heading: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['createAgent']);

function createNewAgent() {
  emit('createAgent');
}
</script>
<style>
.header-box {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 2.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
  border-radius: 5px;
  .add-agent-icon {
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      color: rgb(0, 255, 170);
      transform: scale(1.05);
    }
  }
}
.header-label {
  font-size: x-large;
  font-weight: 800;
  letter-spacing: 2px;
  align-self: center;
}
</style>
