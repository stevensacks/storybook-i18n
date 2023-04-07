import {useEffect, useGlobals} from '@storybook/preview-api';
import {
    PartialStoryFn as StoryFunction,
    Renderer,
    StoryContext,
} from '@storybook/types';

export const withLocale = (
    story: StoryFunction<Renderer>,
    context: StoryContext
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
