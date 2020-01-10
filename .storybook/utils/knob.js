import { date } from '@storybook/addon-knobs';

export function myDateKnob(name, defaultValue) {
  const timeStamp = date(name, defaultValue);
  return new Date(timeStamp);
}