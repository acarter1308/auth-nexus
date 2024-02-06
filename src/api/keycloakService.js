import { keycloakClient } from '@/utils/axiosUtil';
import {
  endAdminSession,
  initAdminSession,
  refreshAdminSession
} from '@/utils/keycloakSessionUtil';

const ADMIN_API_PATH = (realm) => `/admin/realms/${realm}`;

const client_id = 'admin-rest-client';

let currentToken = null;

export async function fetchAccessToken(username, password) {
  const tokenResponse = await initAdminSession(username, password);
  currentToken = tokenResponse.data;
  return currentToken;
}

export function refreshAccess() {
  return new Promise((resolve) => {
    refreshAdminSession(currentToken, client_id).then((response) => {
      currentToken = response?.data;
      resolve(currentToken);
    });
  });
}

export function endSession() {
  endAdminSession();
}

export function endUserSessions(realm, userId) {
  // THIS ENDS ALL ACTIVE USER SESSIONS! NOT JUST THE ONE IN USE BY THE CLIENT
  // const userResponse = await keycloakClient.post(
  //   `${BASE_REQUEST_PATH}/${realm}/users/${userId}/logout`,
  //   {client_id: 'admin-rest-client', refresh_token: currentToken.refresh_token},
  //   { headers: { Authorization: getAuthHeader() } }
  // );
  // return userResponse;
}

// TODO: add params for searching later
export async function fetchRealmUsers(realm, params = '') {
  const path = `${ADMIN_API_PATH(realm)}/users`;
  const options = {
    headers: {
      Authorization: getAuthHeader()
    },
    params
  };

  const userListResponse = await keycloakClient.get(path, options);
  return userListResponse.data;
}

// TODO: add params for searching later
export async function fetchRealmRoles(realm, params = '') {
  const path = `${ADMIN_API_PATH(realm)}/roles`;
  const options = { headers: { Authorization: getAuthHeader() } };

  const roleListResponse = await keycloakClient.get(path, options);
  return roleListResponse.data;
}

export async function fetchAgentDetails(realm, agentId) {
  const path = `${ADMIN_API_PATH(realm)}/users/${agentId}`;
  const options = { headers: { Authorization: getAuthHeader() } };

  const agentDetails = await keycloakClient.get(path, options);
  return agentDetails.data;
}

export async function createNewAgent(realm, newAgentModel) {
  const path = `${ADMIN_API_PATH(realm)}/users`;
  const options = { headers: { Authorization: getAuthHeader() } };
  const createResponse = await keycloakClient.post(path, newAgentModel, options);

  return createResponse.data;
}

export async function updateAgent(realm, agentUpdateModel) {
  const path = `${ADMIN_API_PATH(realm)}/users/${agentUpdateModel.id}`;
  const options = { headers: { Authorization: getAuthHeader() } };

  const updateResponse = await keycloakClient.put(path, agentUpdateModel, options);
  return updateResponse.data;
}

export default {
  endSession,
  refreshAccess,
  fetchAccessToken,
  fetchRealmRoles,
  fetchRealmUsers,
  fetchAgentDetails,
  createNewAgent,
  updateAgent
};

function getAuthHeader() {
  if (!currentToken) {
    throw 'No access token present to use for authorization header';
  }
  return `Bearer ${currentToken?.access_token}`;
}
