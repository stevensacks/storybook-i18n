import {useEffect} from 'react';
import {StoryContext, StoryGetter} from "@storybook/addons";
import {useGlobals} from '@storybook/client-api';
import {addDecorator} from '@storybook/react';

const withLocale = (story: StoryGetter, context: StoryContext) => {
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

addDecorator(withLocale);

