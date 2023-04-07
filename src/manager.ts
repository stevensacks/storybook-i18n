import {addons, types} from '@storybook/manager-api';
import {ADDON_ID, TOOL_ID} from './constants';
import Tool from './Tool';

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        title: 'Storybook i18n',
        type: types.TOOL,
        match: ({viewMode}) => !!viewMode?.match(/^(story|docs)$/),
        render: Tool,
    });
});
