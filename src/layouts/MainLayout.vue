<template>
  <div class="page">
    <div class="top-bar">
      <!-- MAKE A NAV BAR COMPONENT -->
      <OptionSelect
        v-model:modelValue="selectedRealm"
        :options="realms"
        :disable="!sessionAlive"
        label="Realm Select"
        style="width: 12%"
        @update:modelValue="setSelectedRealm($event)"
      />
      <ProfileButton @click="endUserSession()" />
    </div>
    <div :class="['loading-bar', loading && 'loading']" />
    <main id="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { realmOptions } from '../utils/constUtil';
import { useKeycloakStore } from '../stores/keycloakStore';

import OptionSelect from '@/components/inputs/OptionSelect.vue';
import ProfileButton from '@/components/inputs/ProfileButton.vue';

const keycloakStore = useKeycloakStore();

const realms = reactive(realmOptions);
const selectedRealm = ref({});
const loading = ref(false);

async function setSelectedRealm(newRealm) {
  loading.value = true;
  selectedRealm.value = newRealm;
  await keycloakStore.setNewRealm(newRealm);
  loading.value = false;
}

async function endUserSession() {
  await keycloakStore.endAdminSession();
}
</script>

<style lang="scss">
.page {
  height: 100%;
  width: 100vw;
}
.top-bar {
  display: flex;
  max-height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  background-color: #111111;
}

.loading-bar {
  width: 100%;
  height: 5px;
  background-color: #111111;
  transition: background-color 0.5s ease-out;
  &.active-session {
    background-color: hsla(160, 100%, 37%, 0.75);
    height: 5px;
  }
}
</style>
