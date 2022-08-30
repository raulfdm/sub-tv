import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import { createPromptModule } from '../config/inquirer';

export async function loginPrompt(): Promise<string> {
  const prompt = createPromptModule();

  const answers = await prompt([
    {
      type: 'input',
      name: 'username',
      message: `OpenSubtitles username`,
      validate: (input) => (input.length < 3 ? 'Username is too short' : true),
    },
    {
      type: 'password',
      name: 'password',
      message: `OpenSubtitles password`,
      validate: (input) => (input.length < 1 ? 'Please type a password' : true),
    },
    {
      type: 'input',
      name: 'apiKey',
      message: `OpenSubtitles API key?`,
      validate: (input) => (input.length !== 32 ? 'Invalid API Key' : true),
    },
  ]);

  return apiClient.login(answers.username, answers.password, answers.apiKey);
}

export function saveUserToken(token: string): void {
  db.setUserToken(token);
}

export function hasPersistedCredentials(): boolean {
  return db.userToken !== null;
}

export function updateApiClientCredentials() {
  apiClient.setCredentials(db.userToken, db.apiKey);
}
