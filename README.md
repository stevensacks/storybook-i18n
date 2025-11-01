# Storybook-i18n

A library for best-practice i18n addons in Storybook:

- Easy-to-use locale configuration
- Simple drop-down menu
- URL-linkable state for sharing

## Versions

- 2.x is for Storybook `>=7.0.0`
- 3.x is for Storybook `>=8.0.0`
- 3.1.x is for Storybook `>=8.2.0`
- 4.x is for Storybook `>=9.0.0`
- 10.x is for Storybook `>=10.0.0`

## Addon authors

As an addon author, you can use this library by adding it as a dependency and adding the following to your `src/manager.ts` and `src/preview.ts` files:

*src/manager.ts*
```typescript
export * from 'storybook-i18n/manager';
```

*src/preview.ts*
```typescript
import type { Renderer, ProjectAnnotations } from '@storybook/types';
import i18n from 'storybook-i18n/preview';
import { withYourI18nDecorator } from './withYourDecorator';

// @ts-ignore
const i18nDecorators = i18n?.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    decorators: [...i18nDecorators, withYourI18nDecorator],
}

export default preview;
```

Due to an issue with Storybook (pending resolution), you will need that `@ts-ignore` above the decorators line.

The currently selected locale is available in the `locale` global, so you can access it in a decorator using the following snippet:

```typscript
import { MyProvider } from 'your-i18n-library';
import { useGlobals } from '@storybook/manager-api';

const myDecorator = (story, context) => {
  const [{locale}] = useGlobals();
  
  return <MyProvider locale={locale}>;
}
```

## End users

End users configure the `locales` and `locale` globals in `.storybook/preview.ts`.

As of Storybook 8.2, you should use `initialGlobals` instead of `globals`.

`locales` is an object where the keys are the "ids" of the locale/language and the values are the plain text name of that locale you want to use. This is what will appear in the dropdown in the toolbar.

```typescript
const preview: Preview = {
    initialGlobals: {
        locale: "en",
        locales: {
            en: "English",
            fr: "Français",
            ja: "日本語",
        },
    },
};
```

Users can also use full locale strings.

```typescript
const preview: Preview = {
    initialGlobals: {
        locale: "en_US",
        locales: {
            en_US: "English (US)",
            en_GB: "English (GB)",
            fr_FR: "Français",
            ja_JP: "日本語",
        },
    },
};
```

The `locales` object can also have values as an object with keys of `title`, `icon`, and/or `right`. 

This is useful if you want to include an emoji flag or some other string to the left and/or right side.

For example:
```typescript
const preview: Preview = {
    initialGlobals: {
        locale: 'en',
        locales: {
            en: {icon: '🇺🇸', title: 'English', right: 'US'},
            fr: {icon: '🇫🇷', title: 'Français', right: 'FR'},
            ja: {icon: '🇯🇵', title: '日本語', right: 'JP'},
        },
    },
};
```

Or something like this:
```typescript
const preview: Preview = {
    initialGlobals: {
        locale: 'en_US',
        locales: {
            en_US: {title: 'English', right: 'US'},
            en_GB: {title: 'English', right: 'GB'},
            fr_FR: {title: 'Français', right: 'FR'},
            ja_JP: {title: '日本語', right: 'JP'},
        },
    },
};
```

When the locale has been changed, an `event is emitted on the addons-channel`.

You can `subscribe to this event in your preview.ts`, to configure global environment settings yourself, related to your i18n-config.

The event is emitted with the `selected locale as a parameter`.

Your implementation could look like this:
```javascript
import { addons } from '@storybook/preview-api'

addons.getChannel().on('LOCALE_CHANGED', (newLocale) => {
   changeMyI18nConfig(newLocale)
});
```

Addons should instruct them to use whichever format your i18n implementation expects.
