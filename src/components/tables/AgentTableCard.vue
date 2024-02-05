<template>
  <HBFCard :list-items="agents" heading="Agents" @createAgent="openAgentCreateModal()">
    <template #header>
      <AgentTableHeader heading="Agents" @createAgent="createNewAgent($event)" />
    </template>
    <template #body="agentList">
      <div class="table-box">
        <AgentTable :user-list="agentList" @edit-agent="editAgent($event)" />
      </div>
    </template>
    <template #footer>
      <slot><div style="height: 50px" /></slot>
    </template>
  </HBFCard>
</template>

<script setup>
import HBFCard from '@/components/cards/HBFCard.vue';
import AgentTable from '@/components/tables/AgentTable.vue';
import AgentTableHeader from '@/components/tables/AgentTableHeader.vue';

const props = defineProps({
  agents: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['create-agent', 'edit-agent']);

function createNewAgent(event) {
  emit('create-agent');
}

function editAgent(event) {
  emit('edit-agent', event);
}
</script>

<style>
.flex-card {
  display: flex;
  width: 100%;
  min-height: 450px;
}

.table-box {
  padding: 0.5rem 1.5rem;
}
</style>
