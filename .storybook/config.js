import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

const messages = {
  en: {
    'button.label': 'Click Me'
  },
  zh: {
    'button.label': '点击我'
  }
};

const getMessages = locale => messages[locale];

setIntlConfig({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  getMessages
});

addDecorator(withInfo);
addDecorator(withIntl);


function loadStories() {
  require('./stories/icon-controls');
  require('./stories/date-controls');
  require('./stories/form-controls');
}

configure(loadStories, module);