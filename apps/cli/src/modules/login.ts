import type { UserCredentials } from '@sub-tv/open-subtitle';
import prompts from 'prompts';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';

export async function loginPrompt(): Promise<void> {
  const credentials = await prompts([
    {
      type: 'text',
      name: 'username',
      message: 'OpenSubtitles username',
      validate: (input) => (input.length < 3 ? 'Username is too short' : true),
    },
    {
      type: 'password',
      name: 'password',
      message: `OpenSubtitles password`,
      validate: (input) => (input.length < 1 ? 'Please type a password' : true),
    },
    {
      type: 'text',
      name: 'apiKey',
      message: `OpenSubtitles API key?`,
      validate: (input) => (input.length !== 32 ? 'Invalid API Key' : true),
    },
  ]);

  await apiClient.login(credentials);

  saveCredentials(credentials);
}

function saveCredentials(credentials: UserCredentials): void {
  db.setUserCredentials(credentials);
}

export function hasPersistedCredentials() {
  return db.hasCredentials();
}

export async function refreshSection() {
  return apiClient.login(db.userCredentials!);
}
