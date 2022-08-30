import { createMachine, interpret } from 'xstate';

import { showAppTitle } from './modules/welcome';

type SubTvContext = {};

const subTvMachine = createMachine({
  predictableActionArguments: true,
  id: 'sub-tv',
  initial: 'welcome',
  context: {
    loggedIn: false,
  },
  schema: {
    context: {} as SubTvContext,
  },
  states: {
    welcome: {
      entry: [showAppTitle],
      after: {
        600: 'login',
      },
    },
    login: {},
  },
});

interpret(subTvMachine).start();
