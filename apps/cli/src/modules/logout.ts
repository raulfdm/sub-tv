import prompts from 'prompts';

import { db } from '../config/db';

export type LogoutPromptReturnType = {
  logout: boolean;
};

export function logoutPrompt(): Promise<LogoutPromptReturnType> {
  return prompts({
    type: 'confirm',
    name: 'logout',
    message: 'Are you sure you want to logout?',
  });
}

export function removeCredentials(): void {
  db.removeCredentials();
}
