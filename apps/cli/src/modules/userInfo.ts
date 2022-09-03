import { apiClient } from '../config/apiClient';

export function getUserInfo() {
  return apiClient.getUserInfo();
}
