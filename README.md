# Storybook Locale Addon

A Storybook addon for defining and changing locales/languages for use with i18n libraries, etc. 

## Installation

Install with npm

```bash
npm i -D storybook-locale-addon
```

Or yarn
```bash
yarn add -D storybook-locale-addon
```

## Usage

Insert this addon into your storybook main.js addons array.
```javascript
{
  addons: [
    'storybook-locale-addon',
  ]
}
```

In your preview.js, add the locales and the default locale to the parameters.

`Locales` is an object where the keys are the "ids" of the locale/language and the values are the plain text name of that locale you want to use. This is what will appear in the dropdown in the toolbar.

```javascript
export const parameters = {
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
    ja: '日本語',    
  },
};
```

You can also use full locale strings.

```javascript
export const parameters = {
  locale: 'en_US',
  locales: {
    en_US: 'English (US)',
    en_GB: 'English (GB)',
    fr_FR: 'Français',
    ja_JP: '日本語',    
  },
};
```

You should use whichever format your i18n implementation expects. 

## Supported i18n Libraries

Placeholder for the moment

* storybook-addon-i18next
* storybook-addon-react-intl
