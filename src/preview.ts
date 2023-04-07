import type {Renderer, ProjectAnnotations} from '@storybook/types';
import {withLocale} from './withLocale';

const preview: ProjectAnnotations<Renderer> = {
    decorators: [withLocale],
    globals: {
        locale: '',
        locales: {},
    },
};

export default preview;
