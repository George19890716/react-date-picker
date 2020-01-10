import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, date } from '@storybook/addon-knobs';
import Calendar from '../../src/Date/Calendar';
import { myDateKnob } from '../utils/knob';

storiesOf('Date Controls', module)
  .addDecorator(withKnobs)
  .add('Calendar', () =>
    <div style={{width: '400px'}}>
      <Calendar
        calenderDate={myDateKnob('Calender Date', new Date('2019-10-2'))}
        clickDay={action('click')}
      />
    </div>,
    { info: { inline: true, header: false } }
  )