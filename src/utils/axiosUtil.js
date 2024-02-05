import axios from 'axios';

const keycloakClient = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL
});

export { keycloakClient };
