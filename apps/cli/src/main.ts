import { FeatureType } from '@sub-tv/open-subtitle';
import { assign, createMachine, interpret } from 'xstate';

import { featuresPrompt } from './modules/features';
import { languagesPrompt } from './modules/languages';
import { hasPersistedCredentials, loginPrompt, refreshSection } from './modules/login';
import { AppOptions, mainAppPrompt } from './modules/mainApp';
import { subtitlesPrompt } from './modules/subtitles';
import { tvShowPrompt } from './modules/tvShows';
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
            },
          },
          download: {},
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
        featureIdsToSearchFor: (context, event) => [...context.subtitlesIdToDownload, ...event.data],
      }),
      saveFeaturesToSearchFor: assign({
        featureIdsToSearchFor: ({ subtitlesIdToDownload }, event) => {
          return [...subtitlesIdToDownload, event.data.id];
        },
      }),
    },
    services: {
      loginPrompt,
      mainAppPrompt,
      featuresPrompt,
      subtitlesPrompt,
      tvShowPrompt,
    },
    guards: {
      goToSelectLanguage: (context) => context.selectedOption === AppOptions.SelectLanguage,
      goToSelectFeature: (context) => context.selectedOption === AppOptions.SearchMovies,
      isTvShow: (_, event) => event.data.attributes.feature_type === FeatureType.Tvshow,
    },
  },
);

interpret(subTvMachine).start();
