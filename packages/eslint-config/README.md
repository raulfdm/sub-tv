# `@sub-tv/eslint-config`

> Sub TV Sharable eslint

## Usage

> Keep in mind this is a sharable config for TS.

First you need to install all peerDependencies and this config:

```bash
yarn add -D @sub-tv/eslint-config @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-jest eslint
```

Then, creates a `.eslintrc.js` and extends from it:

```js
// .eslintrc.js
module.exports = {
  extends: "@sub-tv/eslint-config"
};
```

If you prefer use `json` syntax (`.eslintrc`):

```json
{
  "extends": "@sub-tv/eslint-config"
}
```
