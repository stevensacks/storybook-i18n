import {
    AnyFramework,
    PartialStoryFn as StoryFunction,
    StoryContext,
} from '@storybook/csf';
import {useEffect, useGlobals} from '@storybook/client-api';

export const withLocale = (
    story: StoryFunction<AnyFramework>,
    context: StoryContext
) => {
    const [globals, updateGlobals] = useGlobals();
    useEffect(() => {
        const {
            parameters: {locale, locales},
        } = context;
        if (locales && !globals.locales) {
            if (locale && !globals.locale) {
                updateGlobals({locale, locales});
            } else {
                updateGlobals({locales});
            }
        }
    }, []);
    return story(context);
};
