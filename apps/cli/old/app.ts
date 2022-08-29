// require("pretty-error").start();

// import { SeasonPrompt, EpisodesPrompt, SubtitlesPrompt, NamePrompt, LanguagePrompt } from "./prompts";
// import { downloadSubtitles, obtainDataByMovieKind, obtainMovieDetails } from "./service";
// import { showAppTitle, errorHandling, successMessage } from "./helpers";

// showAppTitle()
//   .then(NamePrompt)
//   .then(obtainMovieDetails);
// .then(SeasonPrompt) /* This wont run if isn't series */
// .then(EpisodesPrompt) /* This wont run if isn't series */
// .then(obtainDataByMovieKind)
// .then(LanguagePrompt)
// .then(SubtitlesPrompt)
// .then(downloadSubtitles)
// .then(successMessage)
// .catch(errorHandling);

import { createMachine, interpret, assign } from "xstate";
import { showAppTitle } from "./helpers";
import { inquirer } from "./config/inquirer";
import { featureNamePrompt } from "./new-prompts/featureName";

const subtitlesMachine = createMachine(
  {
    predictableActionArguments: true,
    initial: "initial",
    context: {
      name: null
    },
    states: {
      initial: {
        entry: [showAppTitle],
        after: {
          300: "getName"
        }
      },
      getName: {
        invoke: {
          src: featureNamePrompt,
          onDone: {
            target: "getFeature",
            actions: ["setName"]
          }
        }
      },
      getFeature: {
        invoke: {
          src: async () => {
            const nameModule = inquirer.createPromptModule();
            return await nameModule([
              {
                type: "input",
                name: "name",
                message: "What's the media name?"
              }
            ]);
          }
        }
      }
    }
  },
  {
    actions: {
      setName: assign({
        name: (_, { data }) => {
          return data.name;
        }
      })
    }
  }
);

interpret(subtitlesMachine).start();
