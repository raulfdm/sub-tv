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

import inquirer, { Question } from "inquirer";
import { createMachine, interpret, assign } from "xstate";

const subtitlesMachine = createMachine(
  {
    predictableActionArguments: true,
    initial: "getName",
    context: {
      name: null
    },
    states: {
      getName: {
        invoke: {
          src: () => {
            const nameModule = inquirer.createPromptModule();
            return nameModule([
              {
                type: "input",
                name: "name",
                message: "What's the media name?"
              }
            ]);
          },
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

// const prompt = inquirer.createPromptModule();

// const questions: Question[] = [
//   {
//     type: "input",
//     name: "first_name",
//     message: "What's your first name"
//   },
//   {
//     type: "input",
//     name: "last_name",
//     message: "What's your last name",
//     default() {
//       return "Doe";
//     },
//     when: answers => {
//       console.log(answers);
//       return false;
//     }
//   },
//   {
//     type: "input",
//     name: "phone",
//     message: "What's your phone number"
//   }
// ];

// inquirer.prompt(questions).then(answers => {
//   console.log(JSON.stringify(answers, null, "  "));
//   return prompt([
//     {
//       type: "input",
//       name: "first_name",
//       message: "Chupa um cu?"
//     }
//   ]).then(answers => {
//     console.log(JSON.stringify(answers, null, "  "));
//   });
// });
