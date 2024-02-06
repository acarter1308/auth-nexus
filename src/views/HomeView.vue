<template>
  <SyViewContainer class="body-container">
    <AgentTableCard
      class="agent-card"
      :agents="realmAgents"
      @create-agent="toggleAgentCreateModal()"
      @edit-agent="openAgentDetailEditor($event)"
    />
    <div
      :class="['modal-card', (agentCreateOpen || agentDetailsOpen) && 'open']"
      @click="closeAllModals()"
    >
      <NewAgentCard
        v-if="agentCreateOpen"
        @submit="saveNewAgent($event)"
        @close="toggleAgentCreateModal()"
      />
      <AgentDetailsCard
        v-if="agentDetailsOpen"
        @submit="saveAgentDetailsEdit($event)"
        @close="toggleAgentDetailsModal()"
      />
    </div>
  </SyViewContainer>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import SyViewContainer from '@/components/SyViewContainer.vue';
import NewAgentCard from '@/components/cards/NewAgentCard.vue';
import AgentTableCard from '@/components/tables/AgentTableCard.vue';
import AgentDetailsCard from '@/components/cards/AgentDetailsCard.vue';

const emit = defineEmits(['success-pop']);

const keycloakStore = useKeycloakStore();

const agentCreateOpen = ref(false);
const agentDetailsOpen = ref(false);

const realmRoles = computed(() => keycloakStore.realmRoles);
const realmAgents = computed(() => keycloakStore.realmUsers);

function toggleAgentCreateModal() {
  agentCreateOpen.value = !agentCreateOpen.value;
}

function toggleAgentDetailsModal() {
  agentDetailsOpen.value = !agentDetailsOpen.value;
}

function closeAllModals() {
  agentDetailsOpen.value = false;
  agentCreateOpen.value = false;
}

async function saveNewAgent(agent) {
  await keycloakStore.createNewAgent(agent);
  toggleAgentCreateModal();
  emit('success-pop', 'Agent created successfully!');
}

async function openAgentDetailEditor(agent) {
  await keycloakStore.fetchAgentDetails(agent);
  toggleAgentDetailsModal();
}

async function saveAgentDetailsEdit(newAgentDetails) {
  await keycloakStore.updateAgentDetails(newAgentDetails);
  toggleAgentDetailsModal();
  emit('success-pop', 'Agent details saved successfully!');
}
</script>

<style lang="scss">
.body-container {
  padding: 3rem;
}
.agent-card {
  background-color: #1d1d1d;
  border-radius: 10px;
}

.modal-card {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #18181800;
  justify-content: center;
  align-items: center;
  transition: 0.25s all ease-in-out;
  &.open {
    z-index: 99;
    background-color: #181818bb;
  }
}
</style>
