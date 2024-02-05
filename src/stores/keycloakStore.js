import { defineStore } from 'pinia';
import keycloakService from '../api/keycloakService';

export const useKeycloakStore = defineStore('keycloak', {
  // --------STATE---------
  state: () => ({
    JWTToken: null,
    userInfo: null,
    selectedRealm: null,
    selectedAgent: null,
    realmOptions: [],
    realmRoles: [],
    realmUsers: []
  }),

  getters: {},

  actions: {
    setJWTToken(token) {
      this.JWTToken = token;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setSelectedRealm(realm) {
      this.selectedRealm = realm;
    },
    setRealmUsers(users) {
      this.realmUsers = users;
    },
    setRealmRoles(roles) {
      this.realmRoles = roles;
    },
    setSelectedAgent(agent) {
      this.selectedAgent = agent;
    },

    async initKeycloakSession(username, password) {
      const tokenResponse = await keycloakService.fetchAccessToken(username, password);
      const [header, data, signature] = tokenResponse.access_token.split('.');
      this.setJWTToken(tokenResponse);
      this.setUserInfo(JSON.parse(atob(data)));
      this.initTokenRefresher();
    },

    initTokenRefresher() {
      setTimeout(2500);
      setInterval(() => {
        keycloakService.refreshAccess();
      }, 15000);
    },

    async endAdminSession() {
      await keycloakService.endCurrentSession('master', this.userInfo.sub);
    },

    async setNewRealm(realm) {
      this.setSelectedRealm(realm);

      const realmRoles = await keycloakService.fetchRealmRoles(realm.value);
      const realmUsers = await keycloakService.fetchRealmUsers(realm.value, USER_PARAMS);

      this.setRealmRoles(realmRoles);
      this.setRealmUsers(realmUsers);
    },

    async fetchAgentDetails(agentId) {
      const agentDetails = await keycloakService.fetchAgentDetails(
        this.selectedRealm.value,
        agentId
      );
      this.setSelectedAgent(agentDetails);
    },

    async createNewAgent(agentModel) {
      await keycloakService.createNewAgent(
        this.selectedRealm.value,
        mappers.toNewAgentRequest(agentModel)
      );

      const realmUsers = await keycloakService.fetchRealmUsers(
        this.selectedRealm.value,
        USER_PARAMS
      );
      this.setRealmUsers(realmUsers);
    }
  }
});

const mappers = {
  toNewAgentRequest: (newAgent) => {
    return {
      username: newAgent.username,
      email: newAgent.email,
      firstName: newAgent.firstName,
      lastName: newAgent.lastName,
      credentials: [
        {
          type: 'password',
          value: newAgent.password,
          temporary: newAgent?.temporaryPass
        }
      ],
      enabled: newAgent?.enabled,
      emailVerified: !!newAgent?.emailValidated || '',
      realmRoles: newAgent?.selectedRoles,
      attributes: {},
      groups: []
    };
  }
};

const USER_PARAMS = {
  briefRepresentation: true,
  enabled: true,
  max: 500
};
