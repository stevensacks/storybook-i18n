import type {Preview} from '@storybook/react-vite';

const preview: Preview = {
    initialGlobals: {
        locale: 'en',
        locales: {
            en: {title: 'English', right: '🇺🇸'},
            gb: {title: 'English', right: 'GB'},
            fr: {title: 'Français', icon: '🇫🇷'},
            ja: {icon: '🇯🇵'},
            de: {title: 'Deutsche', icon: '🇩🇪', right: 'DE'},
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
