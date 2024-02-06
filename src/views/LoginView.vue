<template>
  <div class="auth-form-card">
    <form id="login-form" autocomplete="off" @submit.prevent="isFormComplete && authenticate()">
      <div class="header-area">
        <img src="@/assets/icons/KLOGO.png" />
      </div>
      <div class="form-inputs">
        <span :class="['text-xs text-error', !isError && 'hidden']">
          Your username or password was incorrect
        </span>
        <TextInput
          v-model="username"
          styles="height: 3rem; margin-bottom: 0.75rem;"
          placeholder="Username / Email"
        />
        <TextInput
          v-model="password"
          type="password"
          styles="height: 3rem; margin-bottom: 1.25rem;"
          placeholder="Password"
        />
        <BasicButton
          :class="['auth-button', isFormComplete && 'valid']"
          label="Sign In"
          @click="isFormComplete && authenticate()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import BasicButton from '@/components/inputs/BasicButton.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import router from '@/router/index';

const keycloakStore = useKeycloakStore();

const username = ref('');
const password = ref('');

const isFormComplete = computed(() => username.value && password.value);
const isError = ref(false);
const loading = ref(false);

async function authenticate() {
  try {
    loading.value = true;
    await keycloakStore.initKeycloakSession(username.value, password.value);
    await keycloakStore.setNewRealm({
      label: 'Development',
      value: 'dev'
    }); // set dev as default realm for now
    await router.push({ name: 'HomePage' });
  } catch (e) {
    console.log(e);
    isError.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss">
.auth-form-card {
  min-height: 30rem;
  height: 35vh;
  width: 30vw;
  min-width: 25rem;
  max-width: 30rem;
  padding: 2rem 2rem 1rem 2rem;
  background: linear-gradient(
    to top,
    var(--vt-c-black-mute),
    var(--vt-c-black),
    82%,
    var(--vue-green-dark)
  );
  border-radius: 10px;
  animation: breath 4s infinite;
  box-shadow: 0px 4px 15px #242424;
}

.header-area {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;

  h2 {
    font-size: xx-large;
    font-weight: 600;
    letter-spacing: 2px;
  }
  img {
    margin-top: 2rem;
    width: 70px;
    height: 70px;
    color: #000;
  }
}

#login-form {
  justify-content: center;
  position: relative;
  height: 100%;
}

.form-inputs {
  margin-top: 8rem;
  input {
    font-size: 15px !important;
    letter-spacing: 1px;
    &::placeholder {
      font-size: small;
      letter-spacing: 0px;
    }
  }
  .auth-button {
    border: 1px solid #555;
    border-radius: 5px;
    letter-spacing: 0.5px;
    cursor: not-allowed;
    &.valid {
      transition:
        border-color 0.5s,
        color 0.5s;
      border-color: var(--vue-green-dark);
      color: #aaa;
      font-weight: 600;
      cursor: pointer;
    }
  }
}

@keyframes breath {
  47% {
    box-shadow: 0px 20px 30px 10px #00683d34;
  }
  53% {
    box-shadow: 0px 20px 30px 10px #00683d34;
  }
}
</style>
