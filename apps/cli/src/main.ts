import { assign, createMachine, interpret } from 'xstate';

import { isLoggedIn, loginPrompt, saveUserToken } from './modules/login';
import { AppOptions, mainAppPrompt } from './modules/mainApp';
import { showAppTitle } from './modules/welcome';

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
        entry: [showAppTitle],
        after: {
          600: [
            {
              target: 'app',
              cond: isLoggedIn,
            },
            {
              target: 'login',
            },
          ],
        },
      },
      login: {
        invoke: {
          src: 'loginPrompt',
          onDone: {
            target: 'app',
            actions: [(_, event) => saveUserToken(event.data)],
          },
        },
      },
      app: {
        id: 'app',
        initial: 'options',
        states: {
          options: {
            invoke: {
              src: 'mainAppPrompt',
              onDone: {
                target: 'optionsMiddleman',
                actions: ['selectOptionFromMainMenu'],
              },
            },
          },
          optionsMiddleman: {
            always: [
              {
                target: 'selectLanguage',
                cond: 'goToSelectLanguage',
              },
            ],
          },
          selectLanguage: {
            entry: [() => console.log('MEntiroso sem vergonha vai pro inferno')],
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
    },
  },
);

interpret(subTvMachine).start();
