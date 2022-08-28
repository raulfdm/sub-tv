# `@sub-tv/prettier-config`

> Sub-tv sharable prettier config

## Usage

First of all you need to have installed `prettier`.

Then, install this package in you project:

```bash
yarn add -D @sub-tv/prettier-config
```

Then, there are few ways to set it up:

### package.json

Just add "prettier" field into you package.json referring to this package:

```json
{
  "name": "my-cool-library",
  "version": "1.0.0",
  "description": "This is a library which will run prettier",
  "prettier": "@sub-tv/prettier-config"
}
```

### .prettierrc.json

If you want, you can create a `.prettierrc.json` and just add the following content:

```json
"@sub-tv/prettier-config"
```

### extending

If you want to extend + override some config, then you need to create a `.prettierrc.js` file and then, require this config there, following the rule you want to override:

```js
module.exports = {
  ...require('@sub-tv/prettier-config'),
  semi: false,
};
```
