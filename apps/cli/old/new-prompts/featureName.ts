import { createPromptModule } from "../config/inquirer";
import debouncePromise from "debounce-promise";
import { API } from "../service/Api";

export async function featureNamePrompt() {
  const prompt = createPromptModule();

  return prompt([
    {
      // filter,
      source: debouncePromise(fetchFeature, 400),
      name: "movie_name",
      type: "autocomplete",
      message: `What's the tv-series or movie name you're looking for? (The result can take a while, be patient)`
    }
  ]);
}

async function fetchFeature(_: unknown, input: string) {
  const aa = await API.fetchFeatures(input);
  console.log(aa);
  return aa;
}
