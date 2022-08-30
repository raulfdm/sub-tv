import { assign, createMachine, interpret } from 'xstate';

import { featuresPrompt } from './modules/features';
import { languagesPrompt } from './modules/languages';
import { hasPersistedCredentials, loginPrompt, refreshSection } from './modules/login';
import { AppOptions, mainAppPrompt } from './modules/mainApp';
import { clearConsoleWithAppTitle } from './modules/welcome';

type SubTvMachineContext = {
  selectedOption: AppOptions | null;
};

type SubTvMachineServices = {
  mainAppPrompt: {
    data: AppOptions;
  };
};

const subTvMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'sub-tv',
    initial: 'welcome',
    context: {
      selectedOption: null,
    },
    schema: {
      context: {} as SubTvMachineContext,
      services: {} as SubTvMachineServices,
    },
    tsTypes: {} as import('./main.typegen').Typegen0,
    states: {
      welcome: {
        entry: [clearConsoleWithAppTitle],
        after: {
          600: [
            {
              target: 'refreshSection',
              cond: hasPersistedCredentials,
            },
            {
              target: 'login',
            },
          ],
        },
      },
      refreshSection: {
        always: {
          target: 'app',
          actions: [refreshSection],
        },
      },
      login: {
        invoke: {
          src: 'loginPrompt',
          onDone: {
            target: 'app',
          },
          onError: {
            target: 'login',
            actions: [() => console.error('Invalid Credentials')],
          },
        },
      },
      app: {
        id: 'app',
        initial: 'options',
        states: {
          options: {
            entry: [clearConsoleWithAppTitle],
            invoke: {
              src: 'mainAppPrompt',
              onDone: {
                target: 'optionsMiddleman',
                actions: ['selectOptionFromMainMenu'],
              },
            },
          },
          optionsMiddleman: {
            entry: [clearConsoleWithAppTitle],
            always: [
              {
                target: 'selectLanguage',
                cond: 'goToSelectLanguage',
              },
              {
                target: 'selectFeature',
                cond: 'goToSelectFeature',
              },
            ],
          },
          selectLanguage: {
            invoke: {
              src: languagesPrompt,
              onDone: {
                target: 'options',
              },
            },
          },
          selectFeature: {
            invoke: {
              src: featuresPrompt,
            },
          },
        },
      },
    },
  },
  {
    actions: {
      selectOptionFromMainMenu: assign({
        selectedOption: (_, event) => event.data,
      }),
    },
    services: {
      loginPrompt,
      mainAppPrompt,
    },
    guards: {
      goToSelectLanguage: (context) => context.selectedOption === AppOptions.SelectLanguage,
      goToSelectFeature: (context) => context.selectedOption === AppOptions.SearchMovies,
    },
  },
);

interpret(subTvMachine).start();
