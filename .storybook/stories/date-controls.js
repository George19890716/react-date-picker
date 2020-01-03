import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Calendar from '../../src/Date/Calendar';

storiesOf('Date Controls', module)
  .addDecorator(withKnobs)
  .add('Calendar', () =>
    <div style={{width: '400px'}}>
      <Calendar />
    </div>,
    { info: { inline: true, header: false } }
  )