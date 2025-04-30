import {useEffect, useGlobals} from 'storybook/preview-api';
import type {
    PartialStoryFn as StoryFunction,
    Renderer,
    StoryContext,
} from 'storybook/internal/types';

export const withLocale = (
    story: StoryFunction<Renderer>,
    context: StoryContext,
) => {
    const [_, updateGlobals] = useGlobals();

    useEffect(() => {
        const {
            parameters: {locale},
        } = context;

        if (locale) {
            updateGlobals({locale});
        }
    }, []);

    return story(context);
};
