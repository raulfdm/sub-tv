import type { OpenSubtitleLanguagesApiResponse } from '@sub-tv/open-subtitle';
import prompts from 'prompts';
import { assign, createMachine, interpret } from 'xstate';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';

const languagesMachine = createMachine(
  {
    id: 'languages',
    initial: 'languages',
    schema: {
      context: {} as {
        allLanguages: OpenSubtitleLanguagesApiResponse['data'];
        selectedLanguage: string[];
        initialLanguages: string[];
      },
    },
    on: {
      CANCEL: {
        target: 'finish',
      },
    },
    states: {
      languages: {
        invoke: {
          src: async (context) => {
            return prompts({
              type: 'autocompleteMultiselect',
              name: 'languages',
              message: 'Select the languages you want to search subtitles for:',
              choices: context.allLanguages.map((lang) => ({
                value: lang.language_code,
                title: lang.language_name,
                selected: context.initialLanguages.includes(lang.language_code),
              })),
            });
          },
          onDone: [
            {
              target: 'finish',
              cond: (_, event) => event.data.languages === undefined,
            },
            {
              target: 'confirm',
              cond: (_, event) => event.data.languages.length > 0,
              actions: ['saveSelectedLanguages'],
            },
            {
              target: 'languages',
            },
          ],
        },
      },
      confirm: {
        invoke: {
          src: async (context) => {
            return prompts({
              type: 'confirm',
              name: 'confirm',
              initial: true,
              message: `You selected the following languages: "${context.selectedLanguage.join(
                ', ',
              )}". Is this correct?`,
            });
          },
          onDone: [
            {
              target: 'finish',
              actions: ['saveLanguages'],
              cond: (_, event) => {
                console.log('event.data', event.data);
                return event.data.confirm === true;
              },
            },
            {
              target: 'languages',
            },
          ],
        },
      },
      finish: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      saveSelectedLanguages: assign({
        selectedLanguage: (context, event) => event.data.languages || context.initialLanguages,
      }),
      saveLanguages: (context) => {
        db.setLangs(context.selectedLanguage);
      },
    },
  },
);

export async function languagesPrompt() {
  const allLanguages = await apiClient.fetchLanguages();

  return new Promise((resolve) => {
    const service = interpret(
      languagesMachine.withContext({
        initialLanguages: db.preferredLanguages,
        selectedLanguage: [],
        allLanguages,
      }),
    ).start();

    service.onDone(resolve);
  });
}
