<template></template>

<script setup></script>

<style lang="scss">
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
