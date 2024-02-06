<template>
  <div class="agent-create-card" @click="$event.stopPropagation()">
    <form class="form-body">
      <div class="form-content">
        <div class="form-row email-user">
          <TextInput v-model:model-value="username" placeholder="devagent01" label="Username" />
          <TextInput v-model:model-value="email" placeholder="agent@gmail.com" label="Email" />
          <!-- <div class="container">
          <div class="form-label">Username</div>
          <span class="static-value">{{ username }}</span>
        </div> -->
        </div>
        <div class="form-row names">
          <TextInput v-model:model-value="firstName" placeholder="John" label="First Name" />
          <TextInput v-model:model-value="lastName" placeholder="Doe" label="Last Name" />
        </div>
        <div class="form-row">
          <div class="col roles">
            <div class="form-label" style="margin-bottom: 0.5rem">Select Agent Roles</div>
            <div style="max-height: 150px" class="tabbed-box scroll">
              <div
                v-for="(role, key) in realmRoles"
                :key="key"
                :class="['role-option', role?.selected && 'selected-role']"
                @click="toggleRoleSelection(role)"
              >
                {{ role.name }}
              </div>
            </div>
          </div>
          <div class="col options">
            <Checkbox label="Agent Enabled" v-model:checked="agentEnabled" />
            <Checkbox label="Temporary Password" v-model:checked="temporaryPass" />
            <Checkbox label="Email Validated" v-model:checked="emailValidated" />
          </div>
        </div>
      </div>
      <div class="form-submit-row">
        <BasicButton class="cancel-btn" label="Cancel" @click="submit()" />
        <BasicButton class="submit-btn" label="Save" height="2.5rem" @click="submit()" />
      </div>
    </form>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import TextInput from '@/components/inputs/TextInput.vue';
import BasicButton from '@/components/inputs/BasicButton.vue';
import Checkbox from '@/components/inputs/Checkbox.vue';

const keycloakStore = useKeycloakStore();
const emit = defineEmits(['submit']);

const realmRoles = computed(() => keycloakStore.realmRoles);
const selectedAgent = computed(() => keycloakStore.selectedAgent);

const agentId = selectedAgent.value.id;
const firstName = ref(selectedAgent.value.firstName);
const lastName = ref(selectedAgent.value.lastName);
const email = ref(selectedAgent.value.email);
const username = ref(selectedAgent.value.username);
const agentEnabled = ref(selectedAgent.value.enabled);
const emailValidated = ref(selectedAgent.value.emailVerified);

function toggleRoleSelection(role) {
  role.selected = role?.selected ? false : !role.selected;
}

function submit() {
  const selectedRoleNames = realmRoles.value.filter((opt) => opt?.selected).map((opt) => opt?.name);

  emit('submit', {
    id: agentId,
    email: email.value,
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
    enabled: agentEnabled.value,
    validEmail: emailValidated.value,
    selectedRoles: selectedRoleNames
  });
}
</script>
<style lang="scss" scoped>
.agent-create-card {
  background-color: #111111ff;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 60vh;
  max-height: 75%;
  border-radius: 10px;
  padding: 3rem 2.5rem 3rem 2.5rem;
}

.tabbed-box {
  border: 1px solid #666;
  border-radius: 7px;
  padding: 0.4rem;
}

.form-body {
  height: 100%;
}

.form-content {
  height: 100%;
  flex: 1 1 auto;
}

.static-value {
  margin-left: 0.5rem;
}

.form-row {
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
  &.names,
  &.pass,
  &.email-user {
    margin-bottom: 1rem;
    div {
      width: 45%;
    }
  }
  .col {
    width: 45%;
    &.options label {
      margin-top: 0.5rem;
    }
  }
}

.role-option {
  cursor: pointer;
  border-radius: 5px;
  padding-left: 5px;
  font-size: small;
  &:hover,
  &.selected-role {
    background-color: #777;
  }
}

.form-submit-row {
  display: flex;
  justify-content: end;
  .submit-btn {
    background-color: hsla(160, 100%, 50%, 0.5);
    transition: all 0.15s ease-in-out;
    border-radius: 10px;
    color: #ccc;
    &:hover {
      background-color: hsla(160, 100%, 50%, 0.65);
      color: #ddd;
    }
    font-size: medium;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
