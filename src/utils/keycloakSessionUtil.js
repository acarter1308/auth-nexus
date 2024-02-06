import { keycloakClient } from '@/utils/axiosUtil';

const SESSION_API_PATH = '/realms/master/protocol/openid-connect';
const SESSION_OPTIONS = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

async function requestAccessToken(username, password) {
  const path = `${SESSION_API_PATH}/token`;

  const data = {
    grant_type: 'password',
    client_id: 'admin-rest-client',
    username,
    password
  };

  return await keycloakClient.post(path, data, SESSION_OPTIONS);
}

function requestAccessTokenRefresh(refreshToken, clientId) {
  const path = `${SESSION_API_PATH}/token`;

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId
  };

  return keycloakClient.post(path, data, SESSION_OPTIONS);
}

export async function initAdminSession(username, password) {
  return await requestAccessToken(username, password);
}

export function refreshAdminSession(access_token, clientId, realm) {
  const { refresh_token } = access_token;
  return requestAccessTokenRefresh(refresh_token, clientId, realm);
}

export function endAdminSession() {
  // TODO: Add a proper redirectURL
  window.location.href = `https://accounts.tds.ai${SESSION_API_PATH}logout`;
}
