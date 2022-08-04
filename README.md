# Storybook-i18n

A library for best-practice i18n addons in Storybook:

- Easy-to-use locale configuration
- Simple drop-down menu
- URL-linkable state for sharing

Requires storybook `>=6.5.x`

## Addon authors

As an addon author, you can use this library by adding it as a dependency and adding the following to your `/preset.js` file:

```js
function config(entry = []) {
    return [
        ...entry,
        require.resolve('storybook-i18n/preview'), // <-- library's preview preset
        require.resolve('./dist/esm/preset/preview'), // <-- your addon's preview preset (if present)
    ];
}

function managerEntries(entry = []) {
    return [
        ...entry,
        require.resolve('storybook-i18n/manager'),
        require.resolve('./dist/esm/preset/manager'), // <-- your addon's manager (if present)
    ];
}

module.exports = {config, managerEntries};
```

The currently selected locale is available in the `locale` global, so you can access it in a decorator using the following snippet:

```js
import { MyProvider } from 'your-i18n-library';
import { useGlobals } from '@storybook/client-api';

const myDecorator = (story, context) => {
  const [{locale}] = useGlobals();
  
  return <MyProvider locale={locale}>;
}
```

## End users

End users configure the `locales` and `locale` parameters in `.storybook/preview.js`.

`locales` is an object where the keys are the "ids" of the locale/language and the values are the plain text name of that locale you want to use. This is what will appear in the dropdown in the toolbar.

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

The `locales` object can also have values as an object with keys of `title`, `left`, or `right`. 

This is useful if you want to include an emoji flag or some other string to the left or right side.

For example:
```javascript
export const parameters = {
    locale: "en",
    locales: {
        en: {title: "English", left: '🇺🇸'},
        fr: {title: "Français", left: '🇫🇷'},
        ja: {title: "日本語", left: '🇯🇵'},
    },
};
```

Or something like this:
```javascript
export const parameters = {
  locale: "en_US",
  locales: {
    en_US: {title: "English", right: 'US'},
    en_GB: {title: "English", right: 'GB'},
    fr_FR: {title: "Français", right: 'FR'},
    ja_JP: {title: "日本語", right: 'JP'},
  },
};
```

When the locale has been changed, an `event is emitted on the addons-channel`.

You can `subscribe to this event in your preview.js`, to configure global environment settings yourself, related to your i18n-config.

The event is emmited with the `selected locale as a parameter`.

Your implementation could look like this:
```javascript
import {addons} from '@storybook/addons'

addons.getChannel().on('LOCALE_CHANGED', (newLocale) => {
   changeMyI18nConfig(newLocale)
});
```


Addons should instruct them to use whichever format your i18n implementation expects.
