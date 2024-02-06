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
        keycloakService.refreshAccess().then((token) => {
          this.setJWTToken(token);
        });
      }, 15000);
    },

    async endAdminSession() {
      keycloakService.endSession();
    },

    async setNewRealm(realm) {
      this.setSelectedRealm(realm);
      await this.refreshAgentList(this.selectedRealm.value);
      await this.refreshRealmRoles(this.selectedRealm.value);
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

      await this.refreshAgentList(this.selectedRealm.value);
    },

    async updateAgentDetails(updatedAgentDetails) {
      await keycloakService.updateAgent(
        this.selectedRealm.value,
        mappers.toAgentUpdateRequest(updatedAgentDetails)
      );

      await this.refreshAgentList(this.selectedRealm.value);
    },

    async refreshAgentList(realm) {
      const agentList = await keycloakService.fetchRealmUsers(realm, USER_PARAMS);
      this.setRealmUsers(agentList);
    },

    async refreshRealmRoles(realm) {
      const roleList = await keycloakService.fetchRealmRoles(realm);
      this.setRealmRoles(roleList);
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
  },
  toAgentUpdateRequest: (agent) => {
    return {
      id: agent.id,
      firstName: agent.firstName,
      lastName: agent.lastName,
      enabled: agent?.enabled
      //TODO: ADD ADDITIONAL EDITABLE PROPERTIES
    };
  }
};

const USER_PARAMS = {
  briefRepresentation: true,
  enabled: true,
  max: 500
};
