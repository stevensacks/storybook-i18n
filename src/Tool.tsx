import React from 'react';
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from '@storybook/components';
import {useGlobals} from '@storybook/api';

export interface Link {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
}

const getLocales = (
  locales: string[],
  locale: string,
  onSelect: (selected: string) => void
): Link[] =>
  locales
    ? Object.entries(locales).map(([key, name]) => ({
      id: key,
      title: name,
      active: key === locale,
      onClick: () => onSelect(key),
    }))
    : [
      {
        id: 'none',
        title: 'No locales in parameters',
        active: true,
        onClick: () => {},
      },
    ];

const Tool = () => {
  const [globals, updateGlobals] = useGlobals();
  const {locale, locales} = globals;

  return (
    <WithTooltip
      closeOnClick={true}
      placement="top"
      tooltip={({onHide}) => (
        <TooltipLinkList
          links={getLocales(locales, locale, (selected) => {
            if (selected !== locale) {
              updateGlobals({locale: selected});
            }
            onHide();
          })}
        />
      )}
      trigger="click"
    >
      <IconButton key="i18n-locale" title="Locale Selector">
        <Icons icon="globe" />
      </IconButton>
    </WithTooltip>
  );
};

export default Tool;
