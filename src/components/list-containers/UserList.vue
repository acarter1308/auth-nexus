<template>
  <div class="list">
    <div class="list-header">
      <div class="status-header"><b>Status</b></div>
      <div><b>Name</b></div>
      <div><b>Email</b></div>
      <div><b>Username</b></div>
      <div></div>
    </div>
    <div v-for="(user, index) in userList" :key="index" class="list-item">
      <div class="user-status">
        <div :class="`${user?.enabled ? 'active' : 'inactive'}`" />
      </div>
      <div>{{ user.firstName }} {{ user.lastName }}</div>
      <div class="ellipses">{{ user.email }}</div>
      <div class="ellipses">{{ user.username }}</div>
      <div class="edit"><button>-</button></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  userList: {
    type: [Array, Object],
    required: true
  }
});
</script>
<style lang="scss" scoped>
.list {
  width: 100%;
  display: grid;
  padding: 0.5rem 1rem;
  overflow-y: scroll;
  .list-item {
    background-color: #151515;
  }
}

.list-header,
.list-item {
  display: grid;
  width: inherit;
  gap: 10px;
  grid-template-columns: 1fr 3fr repeat(2, 6fr) 1fr;
  grid-auto-rows: 2.5rem;
  div {
    display: flex;
    align-self: center;
    text-wrap: nowrap;
  }
  .ellipses {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .status-header {
    margin: auto;
  }
  .user-status {
    width: 100%;
    div {
      margin: auto;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      &.active {
        background-color: hsla(160, 100%, 37%, 1);
      }
      &.inactive {
        background-color: rgb(190, 66, 66);
      }
    }
  }
}
</style>
