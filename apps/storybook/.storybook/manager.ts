import {addons} from 'storybook/manager-api';
import {create} from 'storybook/theming';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'Delhivery',
        brandUrl: 'https://delhivery.com',
        brandImage:'./delhiveryLogo.gif',
        brandTarget: '_self',
        colorPrimary: 'white', 
        colorSecondary: '#E34D31', 
        appBg: '#000000', 
    }),
})