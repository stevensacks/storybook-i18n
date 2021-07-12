import {useEffect} from 'react';
import {StoryContext, StoryGetter} from "@storybook/addons/dist/ts3.9/types";
import {useGlobals} from '@storybook/client-api';
import {addDecorator} from '@storybook/react';

const withLocale = (story: StoryGetter, context: StoryContext) => {
  const [globals, updateGlobals] = useGlobals();
  useEffect(() => {
    const {
      parameters: {locale, locales},
    } = context;
    if (locales && !globals.locales) {
      updateGlobals({locale, locales});
    }
  }, []);
  return story(context);
};

addDecorator(withLocale);

