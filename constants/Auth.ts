export const API_BASE_URL = 'http://127.0.0.1:8000';
export const MEDIA_BASE_URL = 'http://127.0.0.1:8000/';

// Centralized authentication config for Basic Auth
// Usage: import { BASIC_AUTH_HEADER } from '../constants/Auth';

// Hardcoded credentials for development
const USERNAME = 'Oliver';
const PASSWORD = 'GigCard!';

export const BASIC_AUTH_HEADER =
  'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
