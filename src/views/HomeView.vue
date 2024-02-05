<template>
  <SyViewContainer class="body-container">
    <AgentTableCard
      class="agent-card"
      :agents="realmAgents"
      @create-agent="openAgentCreateModal()"
      @edit-agent="editAgent($event)"
    />
    <!-- MAKE COMPONENT FOR DIALOG -->
    <div
      :class="['agent-create-modal', (agentCreateOpen || agentDetailsOpen) && 'open']"
      @click="closeAgentCreateModal()"
    >
      <NewAgentCard v-if="agentCreateOpen" @submit="saveNewAgent($event)" />
      <AgentDetailsCard v-if="agentDetailsOpen" />
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

const keycloakStore = useKeycloakStore();

const agentCreateOpen = ref(false);
const agentDetailsOpen = ref(false);

const realmRoles = computed(() => keycloakStore.realmRoles);
const realmAgents = computed(() => keycloakStore.realmUsers);

function openAgentCreateModal() {
  agentCreateOpen.value = true;
}

function closeAgentCreateModal() {
  agentCreateOpen.value = false;
}

function openAgentDetailsModal() {
  agentDetailsOpen.value = true;
}

function closeAgentDetailsModal() {
  agentDetailsOpen.value = false;
}

async function saveNewAgent(agent) {
  await keycloakStore.createNewAgent(agent);
  closeAgentCreateModal();
}

async function editAgent(agent) {
  await keycloakStore.fetchAgentDetails(agent);
  openAgentDetailsModal();
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

.agent-create-modal {
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
