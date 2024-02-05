import { keycloakClient } from '@/utils/axiosUtil';
import { refreshAccessToken } from '@/utils/tokenRefreshUtil';

const ADMIN_API_PATH = '/admin/realms';
const SESSION_API_PATH = '/realms/master/protocol/openid-connect/token';

const ACCESS_TOKEN_REQUEST_BODY = {
  grant_type: 'password',
  client_id: 'admin-rest-client'
};

const client_id = 'admin-rest-client';

let currentToken = null;

export async function fetchAccessToken(username, password) {
  const tokenResponse = await keycloakClient.post(
    ACCESS_TOKEN_REQUEST_PATH,
    { username, password, ...ACCESS_TOKEN_REQUEST_BODY },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  currentToken = tokenResponse.data;
  return currentToken;
}

export function refreshAccess() {
  refreshAccessToken(currentToken, client_id, 'master').then((response) => {
    currentToken = response?.data;
  });
}

export function endCurrentSession(realm, userId) {
  // const userResponse = await keycloakClient.post(
  //   `${BASE_REQUEST_PATH}/${realm}/users/${userId}/logout`,
  //   {client_id: 'admin-rest-client', refresh_token: currentToken.refresh_token},
  //   { headers: { Authorization: getAuthHeader() } }
  // );

  // return userResponse;
  window.location.href = 'https://accounts.tds.ai/realms/master/protocol/openid-connect/logout';
}

export function endUserSessions(realm, userId) {}

// TODO: add params for searching later
export async function fetchRealmUsers(realm, params = '') {
  const userResponse = await keycloakClient.get(`${ADMIN_API_PATH}/${realm}/users`, {
    headers: { Authorization: getAuthHeader() },
    params
  });

  return userResponse.data;
}

// TODO: add params for searching later
export async function fetchRealmRoles(realm, params = '') {
  const roleResponse = await keycloakClient.get(`${ADMIN_API_PATH}/${realm}/roles`, {
    headers: { Authorization: getAuthHeader() }
  });

  return roleResponse.data;
}

export async function fetchAgentDetails(realm, agentId) {
  const agentDetails = await keycloakClient.get(`${ADMIN_API_PATH}/${realm}/users/${agentId}`, {
    headers: { Authorization: getAuthHeader() }
  });

  return agentDetails.data;
}

export async function createNewAgent(realm, agentModel) {
  const roleResponse = await keycloakClient.post(`${ADMIN_API_PATH}/${realm}/users`, agentModel, {
    headers: { Authorization: getAuthHeader() }
  });

  return roleResponse.data;
}

export default {
  fetchAccessToken,
  refreshAccess,
  endCurrentSession,
  fetchRealmRoles,
  fetchRealmUsers,
  fetchAgentDetails,
  createNewAgent
};

function getAuthHeader() {
  if (!currentToken) {
    throw 'No access token present to use for authorization header';
  }
  return `Bearer ${currentToken?.access_token}`;
}
