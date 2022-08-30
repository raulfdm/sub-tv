import { assign, createMachine, interpret } from 'xstate';

import { isLoggedIn, loginPrompt, saveUserToken } from './modules/login';
import { showAppTitle } from './modules/welcome';

const subTvMachine = createMachine({
  predictableActionArguments: true,
  id: 'sub-tv',
  initial: 'welcome',
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
        src: loginPrompt,
        onDone: {
          target: 'app',
          actions: [(_, event) => saveUserToken(event.data)],
        },
      },
    },
    app: {
      entry: [() => console.log('App')],
    },
  },
});

interpret(subTvMachine).start();
