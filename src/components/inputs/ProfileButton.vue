<template>
  <div class="profile-circle">
    <div class="profile-icon">
      <DefaultProfileIcon class="default-icon" />
    </div>
  </div>
</template>

<script setup>
import DefaultProfileIcon from '@/components/icons/DefaultProfileIcon.vue';
</script>

<style lang="scss">
.profile-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  border: 2px solid var(--vue-green-dark);
  transition: border-color 0.5s;
  cursor: pointer;

  &:hover {
    border: 2px solid var(--vue-green);
  }
}

.profile-icon {
  display: flex;
  justify-content: center;
  padding-top: 5px;
}

.default-icon {
  color: var(--vue-green-dark);
}
</style>
