<template>
  <div class="agent-create-card" @click="$event.stopPropagation()">
    <form class="form-body">
      <div class="form-row email-user">
        <TextInput v-model:model-value="email" placeholder="agent@gmail.com" label="Email" />
        <TextInput v-model:model-value="username" placeholder="devagent01" label="Username" />
      </div>
      <div class="form-row names">
        <TextInput v-model:model-value="firstName" placeholder="John" label="First Name" />
        <TextInput v-model:model-value="lastName" placeholder="Doe" label="Last Name" />
      </div>
      <div class="form-row pass">
        <TextInput
          v-model:model-value="password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <TextInput
          v-model:model-value="passConfirm"
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          :invalid="passConfirm === password"
        />
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
      <div class="form-submit-row">
        <BasicButton
          class="submit-btn"
          label="Save Agent"
          height="2.25rem"
          width="50%"
          @click="submit()"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import { realmOptions } from '@/utils/constUtil';
import TextInput from '@/components/inputs/TextInput.vue';
import BasicButton from '@/components/inputs/BasicButton.vue';
import Checkbox from '@/components/inputs/Checkbox.vue';
1;

const keycloakStore = useKeycloakStore();
const emit = defineEmits(['submit']);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const passConfirm = ref('');
const agentEnabled = ref(false);
const emailValidated = ref(false);
const temporaryPass = ref(false);

const realmRoles = computed(() => keycloakStore.realmRoles);

function toggleRoleSelection(role) {
  role.selected = !role?.selected;
}

function submit() {
  const selectedRoleNames = realmRoles.value.filter((opt) => opt?.selected).map((opt) => opt?.name);

  emit('submit', {
    email: email.value,
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    enabled: agentEnabled.value,
    validEmail: emailValidated.value,
    temporaryPass: temporaryPass.value,
    selectedRoles: selectedRoleNames
  });
}
</script>
<style lang="scss" scoped>
.agent-create-card {
  background-color: #111111ff;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 60%;
  max-height: 75%;
  border-radius: 10px;
  position: relative;
  top: -6%;
}

.tabbed-box {
  border: 1px solid #666;
  border-radius: 7px;
  padding: 0.4rem;
}

.form-body {
  height: 100%;
  padding: 3rem 2.5rem 3rem 2.5rem;
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
  justify-content: space-around;
  padding-top: 5rem;
  .submit-btn {
    background-color: hsla(160, 100%, 50%, 0.5);
    color: #ccc;
    transition: all 0.15s ease-in-out;
    border-radius: 10px;
    &:hover {
      background-color: hsla(160, 100%, 50%, 0.65);
      color: #ddd;
    }
    font-size: medium;
    font-weight: 500;
    letter-spacing: 1px;
  }
}
</style>
