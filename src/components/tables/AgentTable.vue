<template>
  <div class="table-container">
    <div class="agent-table scroll">
      <table>
        <thead class="header-row">
          <tr class="text-medium">
            <th class="text-center"><b>Status</b></th>
            <th><b>Name</b></th>
            <th><b>Email</b></th>
            <th><b>Username</b></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index" class="body-row">
            <td class="user-status">
              <div :class="`${user?.enabled ? 'active' : 'inactive'}`" />
            </td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td class="ellipses">{{ user.email }}</td>
            <td class="ellipses">{{ user.username }}</td>
            <td class="edit">
              <PencilIcon class="edit-icon" @click="editAgent(user)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import PencilIcon from '@/components/icons/PencilIcon.vue';
const props = defineProps({
  userList: {
    type: [Array, Object],
    required: true
  }
});

const emit = defineEmits(['edit-agent']);

function editAgent(user) {
  emit('edit-agent', user?.id);
}
</script>
<style lang="scss" scoped>
.table-container {
  position: relative;
  padding: 0.75rem;
}

.agent-table {
  max-height: 60vh;
  border-radius: 15px;
  table {
    border-collapse: collapse;

    text-align: left;
    width: 100%;
    //
    tr:last-child td {
      border-bottom: none;
    }
    th,
    td {
      padding: 0.5rem 0.5rem;
      &.edit {
        width: 20px;
        padding-right: 1.5rem;
      }
    }
    //
    td {
      overflow-x: hidden;
      text-overflow: ellipsis;
      border-bottom: 2px solid #111;
      background-color: #191919;
      &:first-child {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
      }
      &:last-child {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        margin-right: 1rem;
      }
    }
  }
}

.edit-icon {
  width: 14px;
  transition: 0.25s;
  cursor: pointer;
  &:hover {
    color: hsla(160, 100%, 37%, 1);
    transform: scale(1.15);
  }
}
.user-status {
  div {
    margin: auto;
    width: 9px;
    height: 9px;
    border-radius: 100%;
    &.active {
      background-color: hsla(160, 100%, 37%, 1);
    }
    &.inactive {
      background-color: rgb(190, 66, 66);
    }
  }
}
</style>
