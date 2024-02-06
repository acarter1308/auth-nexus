<template>
  <div class="page">
    <div class="top-bar">
      <!-- MAKE A NAV BAR COMPONENT -->
      <OptionSelect
        v-model:modelValue="selectedRealm"
        :options="realmOptions"
        :disable="!sessionAlive"
        label="Realm Select"
        style="width: 12%"
        @update:modelValue="setSelectedRealm($event)"
      />
      <ProfileButton @click="endUserSession()" />
    </div>
    <div :class="['loading-bar', loading && 'loading']" />
    <PopIn ref="popin" />
    <div class="main-container">
      <div :class="['side-bar', isSideBarOpen ? 'open' : 'closed']">
        <div class="side-bar-tab" @click="toggleSideBar()">||</div>
        <div class="side-bar-content"></div>
      </div>
      <main id="content">
        <router-view @success-pop="showPopIn($event)" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { realmOptions } from '@/utils/constUtil';
import { useKeycloakStore } from '@/stores/keycloakStore';

import OptionSelect from '@/components/inputs/OptionSelect.vue';
import ProfileButton from '@/components/inputs/ProfileButton.vue';
import PopIn from '@/components/toast/PopIn.vue';

const keycloakStore = useKeycloakStore();

const selectedRealm = ref(keycloakStore.selectedRealm);
const isSideBarOpen = ref(true);
const loading = ref(false);
const popin = ref(); // TOAST COMPONENT REF

async function setSelectedRealm(newRealm) {
  loading.value = true;
  selectedRealm.value = newRealm;
  await keycloakStore.setNewRealm(newRealm);
  loading.value = false;
}

async function endUserSession() {
  await keycloakStore.endAdminSession();
}

function showPopIn(message) {
  console.log(message);
  popin.value.togglePopIn(message);
}

function toggleSideBar() {
  console.log(popin.value);
  isSideBarOpen.value = !isSideBarOpen.value;
}
</script>

<style lang="scss">
#content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.page {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
}

.top-bar {
  display: flex;
  max-height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  background-color: #111111;
}

.main-container {
  display: flex;
  flex-direction: row;
}

.side-bar {
  display: flex;
  position: relative;
  height: 95%;
  width: 14vw;
  transition: all 0.7s ease-in-out;
  &.open {
    border-right: 1px solid #444;
  }
  &.closed {
    left: 0;
    width: 5px;
    border-right: none;
    transition: all 0.25s ease-in-out;
    &:hover {
      left: 0.25%;
    }
  }
  .side-bar-content {
    display: flex;
    height: 95vh;
    width: 14vw;
    flex-grow: 1;
    background-color: #111111;
  }
  .side-bar-tab {
    display: flex;
    text-align: center;
    align-items: center;
    position: absolute;
    font-size: smaller;
    left: 98.5%;
    top: 5%;
    width: 1rem;
    height: 2.5rem;
    background-color: #111111;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-right: 2px solid #666;
    transition: 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      border-color: #999;
    }
  }
}

.loading-bar {
  width: 100%;
  height: 5px;
  background-color: #111111;
  transition: background-color 0.5s ease-out;
  &.loading {
    background-color: hsla(160, 100%, 37%, 0.75);
    height: 5px;
  }
}
</style>
