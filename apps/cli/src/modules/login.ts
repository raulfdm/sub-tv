import type { UserCredentials } from '@sub-tv/open-subtitle';
import prompts from 'prompts';
import terminalLink from 'terminal-link';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';

export type LoginPromptReturnType = {
  username: string;
  password: string;
  apiKey: string;
};

export async function loginPrompt(): Promise<LoginPromptReturnType> {
  const link = terminalLink('Wiki - About Login', 'https://github.com/raulfdm/sub-tv/wiki/Credentials');
  console.log(`For more info about login, check "${link}"\n`);

  const credentials = await prompts(
    [
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
    ],
    {
      onCancel: () => {
        process.exit(0);
      },
    },
  );

  await apiClient.login(credentials);

  return credentials;
}

export function saveCredentials(credentials: UserCredentials): void {
  db.setUserCredentials(credentials);
}

export function hasPersistedCredentials() {
  return db.hasCredentials();
}

export async function refreshSection() {
  return apiClient.login(db.userCredentials!);
}
