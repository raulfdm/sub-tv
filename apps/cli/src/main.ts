import { FeatureType } from '@sub-tv/open-subtitle';
import { assign, createMachine, interpret } from 'xstate';

import { inquirerUi } from './config/inquirer';
import { downloadSubtitles } from './modules/download';
import { featuresPrompt } from './modules/features';
import { languagesPrompt } from './modules/languages';
import { hasPersistedCredentials, loginPrompt, refreshSection } from './modules/login';
import { AppOptions, mainAppPrompt } from './modules/mainApp';
import { subtitlesPrompt } from './modules/subtitles';
import { tvShowPrompt } from './modules/tvShows';
import { getUserInfo } from './modules/userInfo';
import { clearConsoleWithAppTitle } from './modules/welcome';
import type { SubTvMachineContext, SubTvMachineServices } from './types/main';

const subTvMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    id: 'sub-tv',
    initial: 'welcome',
    context: {
      featureIdsToSearchFor: [],
      subtitlesIdToDownload: [],
      selectedOption: null,
      feature: null,
      userInfo: null,
    },
    schema: {
      context: {} as SubTvMachineContext,
      services: {} as SubTvMachineServices,
    },
    tsTypes: {} as import('./main.typegen').Typegen0,
    states: {
      welcome: {
        entry: [clearConsoleWithAppTitle],
        always: [
          {
            target: 'refreshSection',
            cond: hasPersistedCredentials,
          },
          {
            target: 'login',
          },
        ],
      },
      refreshSection: {
        invoke: {
          target: 'app',
          src: 'refreshSection',
          onDone: {
            target: 'app',
          },
          onError: {
            target: 'login',
          },
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
        initial: 'refreshUserInfo',
        states: {
          refreshUserInfo: {
            invoke: {
              src: 'getUserInfo',
              onDone: {
                target: 'options',
                actions: ['printUserInfo', 'updateUserInfo'],
              },
            },
          },
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
              {
                target: 'downloadAllSubtitles',
                cond: 'goToTest',
              },
              {
                target: 'exit',
                cond: 'goToExit',
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
              src: 'featuresPrompt',
              onDone: [
                {
                  target: 'selectTvShow',
                  cond: 'isTvShow',
                },
                {
                  target: 'selectSubtitle',
                },
              ],
            },
            exit: ['saveFeature', 'saveFeaturesToSearchFor'],
          },
          selectTvShow: {
            invoke: {
              src: 'tvShowPrompt',
              onDone: {
                target: 'selectSubtitle',
                actions: ['saveTvShowsToSearch'],
              },
            },
          },
          selectSubtitle: {
            invoke: {
              src: 'subtitlesPrompt',
              onDone: {
                target: 'downloadAllSubtitles',
                actions: ['saveSubtitlesIdToDownload'],
              },
            },
          },
          downloadAllSubtitles: {
            invoke: {
              src: 'downloadSubtitles',
              onDone: {
                target: 'options',
              },
            },
          },
          exit: {
            type: 'final',
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
      saveFeature: assign({
        feature: (_, event) => {
          if ('data' in event) {
            return event.data;
          }
          return null;
        },
      }),
      saveTvShowsToSearch: assign({
        featureIdsToSearchFor: (context, event) => [...context.featureIdsToSearchFor, ...event.data],
      }),
      saveFeaturesToSearchFor: assign({
        featureIdsToSearchFor: ({ featureIdsToSearchFor }, event) => {
          if ('data' in event) {
            return [...featureIdsToSearchFor, event.data.id];
          }
          return featureIdsToSearchFor;
        },
      }),
      saveSubtitlesIdToDownload: assign({
        subtitlesIdToDownload: (_, event) => event.data,
      }),
      updateUserInfo: assign({
        userInfo: (_, event) => event.data,
      }),
      printUserInfo: (_, event) => {
        if ('data' in event) {
          inquirerUi.updateBottomBar(`You can still download ${event.data.remaining_downloads} subtitles\n\n`);
        }
      },
    },
    services: {
      downloadSubtitles,
      featuresPrompt,
      getUserInfo,
      loginPrompt,
      mainAppPrompt,
      refreshSection,
      subtitlesPrompt,
      tvShowPrompt,
    },
    guards: {
      goToSelectLanguage: (context) => context.selectedOption === AppOptions.SelectLanguage,
      goToSelectFeature: (context) => context.selectedOption === AppOptions.SearchMovies,
      goToTest: (context) => context.selectedOption === AppOptions.TestDownload,
      goToExit: (context) => context.selectedOption === AppOptions.Exit,
      isTvShow: (_, event) => event.data.attributes.feature_type === FeatureType.Tvshow,
    },
  },
);

const service = interpret(subTvMachine).start();

// service.subscribe(({ event, nextEvents }) => {
//   console.log('EVENT', nextEvents.join(','));
// });
