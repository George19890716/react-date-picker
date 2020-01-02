import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { FormattedMessage } from 'react-intl';
import Button from '../../src/Button/Button';

storiesOf('Form Controls', module)
  .addDecorator(withKnobs)
  .add('Button', () =>
    <Button
      type={select('type', ['button', 'submit'], 'button')}
      onClick={action('click')}
      black={boolean('black')}
    >
      <FormattedMessage id='button.label' />
    </Button>,
    { info: { inline: true, header: false } }
  )