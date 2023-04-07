import type {Preview} from '@storybook/react';

const preview: Preview = {
    globals: {
        locale: 'en',
        locales: {
            en: {title: 'English', right: '🇺🇸'},
            gb: {title: 'English', right: 'GB'},
            fr: {title: 'Français', left: '🇫🇷'},
            ja: {left: '🇯🇵'},
            de: {right: '🇩🇪'},
            es: 'Spain',
            it: '🇮🇹 Italiano',
        },
    },
    parameters: {
        backgrounds: {
            default: 'light',
        },
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
