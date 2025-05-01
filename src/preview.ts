import type {Renderer, ProjectAnnotations} from 'storybook/internal/types';
import {withLocale} from './withLocale';

const preview: ProjectAnnotations<Renderer> = {
    decorators: [withLocale],
    initialGlobals: {
        locale: '',
        locales: {},
    },
};

export default preview;
