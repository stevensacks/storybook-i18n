import React from 'react';
import {
    Icons,
    IconButton,
    WithTooltip,
    TooltipLinkList,
} from '@storybook/components';
import {useGlobals} from '@storybook/api';
import {addons} from '@storybook/addons'

export interface Link {
    id: string;
    title: string;
    active: boolean;
    onClick: () => void;
    left?: string;
    right?: string;
}

export type LocaleValue =
    | string
    | {title: string; left?: string; right?: string};

const getValue = (value: LocaleValue) => {
    if (typeof value === 'string') {
        return {title: value};
    }
    return {
        title: value.title || '',
        left: value.left,
        right: value.right,
    };
};

const getLocales = (
    locales: Record<string, LocaleValue>,
    locale: string,
    onSelect: (selected: string) => void
): Link[] =>
    locales
        ? Object.entries(locales).map(([key, value]) => ({
              ...getValue(value),
              id: key,
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
                            addons.getChannel().emit('CHANGED_LOCALE', selected)
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
