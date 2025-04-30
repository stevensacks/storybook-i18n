import React from 'react';
import {
    IconButton,
    WithTooltip,
    TooltipLinkList,
} from 'storybook/internal/components';
import {GlobeIcon} from '@storybook/icons';
import {useChannel, useGlobals} from 'storybook/manager-api';
import {EVENT_NAME} from './constants';

export interface Link {
    id: string;
    title: string;
    active: boolean;
    onClick: () => void;
    icon?: string;
    right?: string;
}

export type LocaleValue =
    | string
    | {title: string; icon?: string; right?: string};

const getValue = (value: LocaleValue) => {
    if (typeof value === 'string') {
        return {title: value};
    }
    return {
        title: value.title || '',
        icon: value.icon,
        right: value.right,
    };
};

const getLocales = (
    locales: Record<string, LocaleValue>,
    locale: string,
    onSelect: (selected: string) => void,
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
    const emit = useChannel({});

    return (
        <WithTooltip
            closeOnOutsideClick={true}
            placement="top"
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={getLocales(locales, locale, (selected) => {
                        if (selected !== locale) {
                            updateGlobals({locale: selected});
                            emit(EVENT_NAME, selected);
                        }
                        onHide();
                    })}
                />
            )}
            trigger="click"
        >
            <IconButton key="i18n-locale" title="Locale Selector">
                <GlobeIcon />
            </IconButton>
        </WithTooltip>
    );
};

export default Tool;
