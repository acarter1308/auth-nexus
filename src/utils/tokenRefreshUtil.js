import { keycloakClient } from '@/utils/axiosUtil';

function requestNewRefreshToken(refreshToken, clientId, realm) {
  const path = `/realms/${realm}/protocol/openid-connect/token`;

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId
  };

  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    path: `/realms/${realm}/protocol/openid-connect/token`
  };

  return keycloakClient.post(path, data, options);
}

export function refreshAccessToken(access_token, clientId, realm) {
  const { refresh_token } = access_token;
  return requestNewRefreshToken(refresh_token, clientId, realm);
}
