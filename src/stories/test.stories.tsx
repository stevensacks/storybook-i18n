import React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';

const meta: Meta = {
    title: 'Test',
    component: () => <div />,
};

export default meta;

export const Default: StoryObj = {
    render: () => <div />,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: () => <div />,
};
