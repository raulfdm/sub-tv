import type { OpenSubtitleLanguagesApiResponse } from '@sub-tv/open-subtitle';
import prompts from 'prompts';
import { assign, createMachine, interpret } from 'xstate';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';

type LanguagesContext = {
  allLanguages: OpenSubtitleLanguagesApiResponse['data'];
  selectedLanguage: string[];
  initialLanguages: string[];
};

type LanguageServices = {
  getLanguages: {
    data: {
      languages: string[];
    };
  };
  confirmLanguages: {
    data: {
      confirm: boolean;
    };
  };
};

const languagesMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    id: 'languages',
    initial: 'languages',
    schema: {
      context: {} as LanguagesContext,
      services: {} as LanguageServices,
    },
    tsTypes: {} as import('./languages.typegen').Typegen0,
    states: {
      languages: {
        invoke: {
          src: 'getLanguages',
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
          src: 'confirmLanguages',
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
    services: {
      getLanguages: async function (context) {
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
      confirmLanguages: async function (context) {
        return prompts({
          type: 'confirm',
          name: 'confirm',
          initial: true,
          message: `You selected the following languages: "${context.selectedLanguage.join(', ')}". Is this correct?`,
        });
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
