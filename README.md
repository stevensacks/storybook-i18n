# Storybook-i18n

A library for best-practice i18n addons in Storybook:

- Easy-to-use locale configuration
- Simple drop-down menu
- URL-linkable state for sharing

## Addon authors

As an addon author, you can use this library by adding it as a dependency and adding the following to your `/preset.js` file:

```js
function config(entry = []) {
  return [
    ...entry,
    require.resolve("storybook-i18n/preview"), // <-- library's preview preset
    require.resolve("./dist/esm/preset/preview"), // <-- your addon's preview preset
  ];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("storybook-i18n/manager")];
}

module.exports = { managerEntries, config };
```

The currently selected locale is available in the `locale` global, so you can access it in a decorator using the following snippet:

```js
import { MyProvider } from 'my-i18n-library';
import { useGlobals } from '@storybook/client-api';

const myDecorator = (story, context) => {
  const [{locale}] = useGlobals();
  return <MyProvider locale={locale}>;
}
```

## End users

End users configure the `locales` and `locale` parameters in `.storybook/preview.js`.

`Locales` is an object where the keys are the "ids" of the locale/language and the values are the plain text name of that locale you want to use. This is what will appear in the dropdown in the toolbar.

```javascript
export const parameters = {
  locale: "en",
  locales: {
    en: "English",
    fr: "Français",
    ja: "日本語",
  },
};
```

Users can also use full locale strings.

```javascript
export const parameters = {
  locale: "en_US",
  locales: {
    en_US: "English (US)",
    en_GB: "English (GB)",
    fr_FR: "Français",
    ja_JP: "日本語",
  },
};
```

Addons should instruct them to use whichever format your i18n implementation expects.
