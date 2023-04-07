import type {Renderer, ProjectAnnotations} from '@storybook/types';
import {withLocale} from './withLocale';

const preview = {
    decorators: [withLocale],
    globals: {
        locale: '',
        locales: {},
    },
} satisfies ProjectAnnotations<Renderer>;

export default preview;
