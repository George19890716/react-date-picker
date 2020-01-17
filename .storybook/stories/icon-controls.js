import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, color, text, number } from '@storybook/addon-knobs';
import Arrow from '../../src/Icon/Arrow';
import Calendar from '../../src/Icon/Calendar';

storiesOf('Icon Controls', module)
  .addDecorator(withKnobs)
  .add('Arrow', () =>
    <Arrow
      animation={text('animation', '0.3s')}
      rotation={select('rotation', [0, 90, 180, 270], 0)}
      width={number('width', 24)}
      color={color('color', '#333')}
      onClick={action('click')}
    />,
    { info: { inline: true, header: false } }
  )
  .add('Calendar', () => 
    <Calendar
      width={number('width', 24)}
      color={color('color', '#757575')}
      onClick={action('click')}
    />,
    { info: { inline: true, header: false } }
  )