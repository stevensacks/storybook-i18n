import React from 'react';
import addons, {types} from '@storybook/addons';
import {ADDON_ID} from "../constants";
import Tool from '../Tool';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'storybook locale',
    type: types.TOOL,
    match: ({viewMode}) => viewMode === 'story',
    render: () => <Tool />,
  });
});

